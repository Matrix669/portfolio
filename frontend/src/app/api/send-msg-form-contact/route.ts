import { NextRequest, NextResponse } from 'next/server'

import { z } from 'zod'
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import nodemailer from 'nodemailer'

import { generateEmailTemplateContact } from '@/lib/emailTemplateContact'

const contactSchema = z.object({
	name: z.string().trim().min(3).max(100),
	email: z.string().trim().email().max(254),
	message: z.string().trim().min(10).max(3000),
	agreement: z.literal(true),
})

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL!,
	token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const ratelimit = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(5, '10 m'),
	timeout: 2000,
	prefix: 'ratelimit:contact-form',
})

async function checkRateLimit(ip: string) {
	try {
		return await ratelimit.limit(ip)
	}
	catch (error) {
		console.error('[ratelimit] Redis niedostępny, przepuszczam request: ', error)
		return { success: true, limit: 0, remaining: 0, reset: 0 }
	}
}
export async function POST(req: NextRequest) {
	try {
		const body = await req.json()

		// 1) Honeypot przed zod
		const contact_reference = typeof body?.contact_reference === 'string' ? body.contact_reference.trim() : ''

		if(contact_reference.length > 0) {
			return NextResponse.json({message: "OK"}, {status: 200})
		}

		// 2) Rate limit
		const forwardedFor = req.headers.get('x-forwarded-for')
		const ip = forwardedFor?.split(',')[0]?.trim() || 'unknown'

		const { success, limit, remaining, reset } = await checkRateLimit(ip)

		if (!success) {
			return NextResponse.json(
				{ errorCode: 'RATE_LIMIT' },
				{
					status: 429,
					headers: {
						'X-RateLimit-Limit': String(limit),
						'X-RateLimit-Remaining': String(remaining),
						'X-RateLimit-Reset': String(reset),
					},
				}
			)
		}

		// 3) Walidacja danych
		const parsed = contactSchema.safeParse(body)

		if (!parsed.success) {
			return NextResponse.json(
				{
					errorCode: 'INVALID_FORM',
					error: 'Nieprawidłowe dane formularza',
				},
				{ status: 400 }
			)
		}

		const { name, email, message } = parsed.data

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			// host: process.env.EMAIL_HOST as string,
			// port: Number(process.env.EMAIL_PORT) || 587,
			// secure: process.env.EMAIL_PORT == 465,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		})
		const htmlContent = generateEmailTemplateContact(name, email, message)

		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: process.env.EMAIL_RECIPIENT,
			subject: `Nowa wiadomość od ${name}`,
			html: htmlContent,
		}

		await transporter.sendMail(mailOptions)

		return NextResponse.json({ message: 'Dane otrzymane' }, { status: 200 })
	} catch (error) {
		console.error('Błąd podczas wysyłania e-maila: ', error)
		return NextResponse.json({ errorCode: "SERVER_ERROR", error: 'Błąd podczas wysyłania wiadomości' }, { status: 500 })
	}
}
