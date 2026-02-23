import nodemailer from 'nodemailer'
import { baseUrlFront } from './getBaseUrlFront'

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: parseInt(process.env.SMTP_PORT || '587'),
	secure: process.env.SMTP_SECURE === 'true',
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
})

interface EmailParams {
	to: string
	status: 'success' | 'failed' //| 'expired'
	amount?: number
	currency?: string
	group?: string
	isMonthly?: boolean
	sessionId?: string
	errorMessage?: string
	portalUrl?: string
}

export async function sendPaymentEmail(params: EmailParams) {
	const { to, status, amount, currency, group, isMonthly, sessionId, errorMessage, portalUrl } = params

	let subject: string
	let html: string

	switch (status) {
		case 'success':
			subject = isMonthly ? '✅ Dziękujemy za miesięczne wsparcie!' : '✅ Dziękujemy za darowiznę!'

			html = `
				<!DOCTYPE html>
				<html>
				<head>
					<meta charset="utf-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
				</head>
				<body style="margin: 0; padding: 0; background-color: #FAF9F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
					<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAF9F5; padding: 40px 20px;">
						<tr>
							<td align="center">
								<table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(58, 58, 58, 0.1);">
									
									<!-- Header z logo -->
									<tr>
										<td style="background-color: #FAD05E; padding: 40px 30px; text-align: center;">
											<img src="${
												baseUrlFront
											}/logoDrachma.png" alt="Logo" style="max-width: 180px; height: auto; margin-bottom: 20px;" />
											<h1 style="color: #3A3A3A; margin: 0; font-size: 28px; font-weight: 600; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
												${isMonthly ? 'Dziękujemy za regularne wsparcie!' : 'Dziękujemy za wsparcie!'}
											</h1>
										</td>
									</tr>
									
									<!-- Treść -->
									<tr>
										<td style="padding: 40px 30px;">
											<div style="background-color: #FAF9F5; border-left: 4px solid #FAD05E; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
												<p style="margin: 0 0 10px 0; color: #3A3A3A; font-size: 16px; line-height: 1.6;">
													<strong style="color: #499652;">✓ Płatność potwierdzona</strong>
												</p>
												<p style="margin: 0; color: #3A3A3A; font-size: 15px; line-height: 1.6;">
													${
														isMonthly
															? 'Twoje miesięczne wsparcie zostało aktywowane. Jesteś niesamowity/a!'
															: 'Twoja darowizna została pomyślnie przetworzona. Dziękujemy z całego serca!'
													}
												</p>
											</div>
											
											<!-- Szczegóły płatności -->
											<div style="background-color: #fff; border: 2px solid #FAF9F5; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
												<h2 style="color: #3A3A3A; margin: 0 0 20px 0; font-size: 18px; font-weight: 600; border-bottom: 2px solid #FAD05E; padding-bottom: 10px;">
													📋 Szczegóły płatności
												</h2>
												<table width="100%" cellpadding="8" cellspacing="0">
													<tr>
														<td style="color: #3A3A3A; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #FAF9F5;">
															<strong>💰 Kwota:</strong>
														</td>
														<td align="right" style="color: #499652; font-size: 16px; font-weight: 600; padding: 8px 0; border-bottom: 1px solid #FAF9F5;">
															${amount} ${currency}
														</td>
													</tr>
													<tr>
														<td style="color: #3A3A3A; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #FAF9F5;">
															<strong>🎯 Grupa:</strong>
														</td>
														<td align="right" style="color: #3A3A3A; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #FAF9F5;">
															${group}
														</td>
													</tr>
													<tr>
														<td style="color: #3A3A3A; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #FAF9F5;">
															<strong>📅 Typ płatności:</strong>
														</td>
														<td align="right" style="color: #3A3A3A; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #FAF9F5;">
															${isMonthly ? '🔄 Subskrypcja miesięczna' : '⚡ Jednorazowa'}
														</td>
													</tr>
													<tr>
														<td style="color: #3A3A3A; font-size: 12px; padding: 8px 0;">
															<strong>🔖 ID transakcji:</strong>
														</td>
														<td align="right" style="color: #999; font-size: 11px; padding: 8px 0; font-family: monospace;">
															${sessionId}
														</td>
													</tr>
												</table>
											</div>
											
											<!-- Wiadomość -->
											<div style="text-align: center; margin: 30px 0;">
												<p style="color: #45ABD8; font-size: 18px; font-weight: 500; margin: 0; line-height: 1.6;">
													💙 Twoje wsparcie ma ogromne znaczenie!
												</p>
												<p style="color: #3A3A3A; font-size: 14px; margin: 10px 0 0 0; line-height: 1.6;">
													Dzięki Tobie możemy realizować nasze cele i pomagać społeczności.
												</p>
											</div>
											
											${
												isMonthly
													? `
												<!-- Info o subskrypcji -->
												<div style="background: linear-gradient(135deg, #FAD05E 0%, #FAD05E 100%); padding: 20px; border-radius: 8px; margin-top: 30px;">
													<table width="100%" cellpadding="0" cellspacing="0">
														<tr>
															<td style="vertical-align: top;">
																<h3 style="color: #3A3A3A; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">
																	Informacja o subskrypcji ℹ️
																</h3>
																<p style="color: #3A3A3A; margin: 0 0 15px 0; font-size: 14px; line-height: 1.5;">
																	Płatność będzie automatycznie pobierana co miesiąc. Możesz w każdej chwili anulować subskrypcję lub zmienić metodę płatności.
																</p>
																<a href="${portalUrl}" 
																   style="display: inline-block; background-color: #499652; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px; transition: all 0.3s;">
																	🔧 Zarządzaj subskrypcją
																</a>
															</td>
														</tr>
													</table>
												</div>
											`
													: ''
											}
										</td>
									</tr>
									
									<!-- Footer -->
									<tr>
										<td style="background-color: #3A3A3A; padding: 30px; text-align: center;">
											<p style="color: #FAF9F5; margin: 0 0 10px 0; font-size: 14px;">
												Masz pytania? Skontaktuj się z nami!
											</p>
											<p style="color: #999; margin: 0; font-size: 12px; line-height: 1.6;">
												© ${new Date().getFullYear()} Fundacja Drachma<br>
												Wszystkie prawa zastrzeżone
											</p>
										</td>
									</tr>
									
								</table>
							</td>
						</tr>
					</table>
				</body>
				</html>
			`
			break

		case 'failed':
			subject = '❌ Płatność nie powiodła się'

			html = `
				<!DOCTYPE html>
				<html>
				<head>
					<meta charset="utf-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
				</head>
				<body style="margin: 0; padding: 0; background-color: #FAF9F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
					<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAF9F5; padding: 40px 20px;">
						<tr>
							<td align="center">
								<table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(58, 58, 58, 0.1);">
									
									<!-- Header -->
									<tr>
										<td style="background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); padding: 40px 30px; text-align: center;">
											<div style="display: flex; justify-content: center; background-color: rgba(255,255,255,0.2); border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 20px; ">
												<span style="font-size: 48px; margin-left: 10px;">❌</span>
											</div>
											<h1 style="color: #fff; margin: 0; font-size: 26px; font-weight: 600;">
												Płatność nie powiodła się
											</h1>
										</td>
									</tr>
									
									<!-- Treść -->
									<tr>
										<td style="padding: 40px 30px;">
											<p style="color: #3A3A3A; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
												Niestety, wystąpił problem z przetworzeniem Twojej płatności.
											</p>
											
											${
												errorMessage
													? `
												<div style="background-color: #FAF9F5; border-left: 4px solid #dc3545; padding: 15px; border-radius: 6px; margin-bottom: 25px;">
													<p style="margin: 0; color: #3A3A3A; font-size: 14px;">
														<strong style="color: #dc3545;">Powód:</strong><br>
														${errorMessage}
													</p>
												</div>
											`
													: ''
											}
											
											<p style="color: #3A3A3A; font-size: 15px; line-height: 1.6; margin: 0 0 25px 0;">
												Możesz spróbować ponownie lub skontaktować się z nami, jeśli problem będzie się powtarzał.
											</p>
											
											<div style="text-align: center; margin-top: 30px;">
												<a href="${baseUrlFront}/wesprzyj-nas" 
												   style="display: inline-block; background-color: #499652; color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
													Spróbuj ponownie
												</a>
											</div>
										</td>
									</tr>
									
									<!-- Footer -->
									<tr>
										<td style="background-color: #3A3A3A; padding: 30px; text-align: center;">
											<p style="color: #FAF9F5; margin: 0 0 10px 0; font-size: 14px;">
												Potrzebujesz pomocy? Jesteśmy tu dla Ciebie!
											</p>
											<p style="color: #999; margin: 0; font-size: 12px;">
												© ${new Date().getFullYear()} Fundacja Drachma
												<br>
												Wszystkie prawa zastrzeżone
											</p>
										</td>
									</tr>
									
								</table>
							</td>
						</tr>
					</table>
				</body>
				</html>
			`
			break

		// case 'expired':
		// 	subject = '⏱️ Sesja płatności wygasła'

		// 	html = `
		// 		<!DOCTYPE html>
		// 		<html>
		// 		<head>
		// 			<meta charset="utf-8">
		// 			<meta name="viewport" content="width=device-width, initial-scale=1.0">
		// 		</head>
		// 		<body style="margin: 0; padding: 0; background-color: #FAF9F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
		// 			<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAF9F5; padding: 40px 20px;">
		// 				<tr>
		// 					<td align="center">
		// 						<table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(58, 58, 58, 0.1);">
									
		// 							<!-- Header -->
		// 							<tr>
		// 								<td style="background: linear-gradient(135deg, #FAD05E 0%, #f0c040 100%); padding: 40px 30px; text-align: center;">
		// 									<div style="background-color: rgba(255,255,255,0.3); border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
		// 										<span style="font-size: 48px; margin-left: 10px;">⏱️</span>
		// 									</div>
		// 									<h1 style="color: #3A3A3A; margin: 0; font-size: 26px; font-weight: 600;">
		// 										Sesja płatności wygasła
		// 									</h1>
		// 								</td>
		// 							</tr>
									
		// 							<!-- Treść -->
		// 							<tr>
		// 								<td style="padding: 40px 30px;">
		// 									<div style="background-color: #FAF9F5; border-left: 4px solid #FAD05E; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
		// 										<p style="margin: 0; color: #3A3A3A; font-size: 15px; line-height: 1.6;">
		// 											Twoja sesja płatności wygasła przed zakończeniem transakcji.
		// 										</p>
		// 									</div>
											
		// 									<p style="color: #3A3A3A; font-size: 15px; line-height: 1.6; margin: 0 0 25px 0;">
		// 										Jeśli nadal chcesz nas wesprzeć, możesz rozpocząć nową płatność. Jesteśmy wdzięczni za każdą formę wsparcia!
		// 									</p>
											
		// 									<div style="text-align: center; margin-top: 30px;">
		// 										<a href="${baseUrlFront}/wesprzyj-nas" 
		// 										   style="display: inline-block; background-color: #45ABD8; color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
		// 											Wesprzyj nas
		// 										</a>
		// 									</div>
		// 								</td>
		// 							</tr>
									
		// 							<!-- Footer -->
		// 							<tr>
		// 								<td style="background-color: #3A3A3A; padding: 30px; text-align: center;">
		// 									<p style="color: #FAF9F5; margin: 0 0 10px 0; font-size: 14px;">
		// 										Dziękujemy za zainteresowanie wsparciem!
		// 									</p>
		// 									<p style="color: #999; margin: 0; font-size: 12px;">
		// 										© ${new Date().getFullYear()} Fundacja Drachma
		// 										<br>
		// 										Wszystkie prawa zastrzeżone
		// 									</p>
		// 								</td>
		// 							</tr>
									
		// 						</table>
		// 					</td>
		// 				</tr>
		// 			</table>
		// 		</body>
		// 		</html>
		// 	`
		// 	break
	}

	try {
		const fromName = 'Fundacja Drachma'
		const fromEmail = process.env.SMTP_FROM || 'biuro@drachma.org.pl'
		await transporter.sendMail({
			from: `"${fromName}" <${fromEmail}>`,
			to,
			subject,
			html,
		})

		console.log(`Email (${status}) wysłany do: ${to}`)
	} catch (error) {
		console.error('Błąd wysyłania emaila:', error)
		throw error
	}
}

export async function sendMagicLinkEmail(to: string, magicUrl: string) {
	const subject = '🔐 Link do zarządzania subskrypcją'

	const html = `
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
		</head>
		<body style="margin: 0; padding: 0; background-color: #FAF9F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
			<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAF9F5; padding: 40px 20px;">
				<tr>
					<td align="center">
						<table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(58, 58, 58, 0.1);">
							
							<!-- Header -->
							<tr>
								<td style="background-color: #FAD05E; padding: 40px 30px; text-align: center;">
									<img src="${baseUrlFront}/logoDrachma.png" alt="Logo" style="max-width: 180px; height: auto; margin-bottom: 20px;" />
									<h1 style="color: #3A3A3A; margin: 0; font-size: 28px; font-weight: 600;">
										Zarządzaj subskrypcją
									</h1>
								</td>
							</tr>
							
							<!-- Content -->
							<tr>
								<td style="padding: 40px 30px;">
									<p style="color: #3A3A3A; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
										Otrzymaliśmy prośbę o dostęp do zarządzania Twoją subskrypcją. Kliknij poniższy przycisk, aby kontynuować:
									</p>
									
									<div style="text-align: center; margin: 30px 0;">
										<a href="${magicUrl}" 
										   style="display: inline-block; background-color: #499652; color: #fff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 600; font-size: 16px;">
											🔧 Otwórz panel zarządzania
										</a>
									</div>
									
									<!-- Ostrzeżenie o jednorazowym użyciu -->
									<div style="background-color: #FFF3CD; border-left: 4px solid #FFC107; padding: 15px; border-radius: 8px; margin: 25px 0;">
										<p style="margin: 0 0 8px 0; color: #856404; font-size: 14px; line-height: 1.6;">
											<strong>⚠️ Ważne informacje:</strong>
										</p>
										<ul style="margin: 0; padding-left: 20px; color: #856404; font-size: 14px; line-height: 1.6;">
											<li>Link jest <strong>jednorazowy</strong> - po kliknięciu wygasa natychmiast</li>
											<li>Link jest ważny przez <strong>15 minut</strong></li>
											<li>Jeśli potrzebujesz ponownie wejść do panelu, poproś o nowy link na naszej stronie</li>
										</ul>
									</div>
									
									<p style="color: #666; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0;">
										Jeśli to nie Ty wysłałeś to żądanie, zignoruj ten email. Link automatycznie wygaśnie.
									</p>
									
									<!-- Dodatkowa informacja -->
									<div style="background-color: #FAF9F5; padding: 15px; border-radius: 8px; margin: 25px 0 0 0; text-align: center;">
										<p style="margin: 0; color: #666; font-size: 13px; line-height: 1.5;">
											💡 <strong>Wskazówka:</strong> Po kliknięciu w link zostaniesz przekierowany na bezpieczną stronę Stripe, gdzie możesz zarządzać swoją subskrypcją.
										</p>
									</div>
								</td>
							</tr>
							
							<!-- Footer -->
							<tr>
								<td style="background-color: #3A3A3A; padding: 30px; text-align: center;">
									<p style="color: #FAF9F5; margin: 0 0 10px 0; font-size: 14px;">
										Masz pytania? Skontaktuj się z nami!
									</p>
									<p style="color: #999; margin: 0; font-size: 12px;">
										© ${new Date().getFullYear()} Fundacja Drachma<br>
										Wszystkie prawa zastrzeżone
									</p>
								</td>
							</tr>
							
						</table>
					</td>
				</tr>
			</table>
		</body>
		</html>
	`

	try {
		const fromName = 'Fundacja Drachma'
		const fromEmail = process.env.SMTP_FROM || 'biuro@drachma.org.pl'

		await transporter.sendMail({
			from: `"${fromName}" <${fromEmail}>`,
			to,
			subject,
			html,
		})

		console.log(`✉️ Magic link email wysłany do: ${to}`)
	} catch (error) {
		console.error('❌ Błąd wysyłania magic link emaila:', error)
		throw error
	}
}