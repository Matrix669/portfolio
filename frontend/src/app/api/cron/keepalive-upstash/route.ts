import { Redis } from "@upstash/redis"
import { NextRequest } from "next/server"

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL!,
	token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get("authorization")
    const cronSecret = process.env.CRON_SECRET!

    if (!cronSecret|| authHeader !== `Bearer ${cronSecret}`) {
        return new Response("Unauthorized", { status: 401 })
    }
	await redis.ping()
	return Response.json({ ok: true })
}