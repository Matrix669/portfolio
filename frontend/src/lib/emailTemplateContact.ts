function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
}

export function generateEmailTemplateContact(name: string, email: string, message: string): string {
	const safeName = escapeHtml(name.trim())
	const safeEmail = escapeHtml(email.trim())
	const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br />')

	const host = process.env.NEXT_PUBLIC_HOST_URL ?? 'twoje-portfolio.pl'
	const currentYear = new Date().getFullYear()
	const sentAt = new Date().toLocaleString('pl-PL')

	return `
<!doctype html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nowa wiadomość z formularza kontaktowego</title>
  </head>
  <body style="margin:0; padding:0; background:#232526; font-family:Arial, Helvetica, sans-serif; color:#DFDFDF;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
      Nowa wiadomość z formularza kontaktowego portfolio.
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#232526; padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px; border-collapse:separate; background:#232526; border:1px solid rgba(223,223,223,0.35); border-radius:16px; overflow:hidden; box-shadow:0 14px 34px rgba(0,0,0,0.35);">
            <tr>
              <td style="padding:0; background:linear-gradient(125deg, #232526 0%, rgba(223,223,223,0.13) 100%); border-bottom:1px solid rgba(223,223,223,0.35);">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding:22px 24px 8px;">
                      <span style="display:inline-block; padding:5px 10px; border-radius:999px; border:1px solid rgba(223,223,223,0.45); background:rgba(223,223,223,0.1); font-size:11px; letter-spacing:1px; text-transform:uppercase; font-weight:700; color:#DFDFDF;">
                        Portfolio / Kontakt
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 24px 20px;">
                      <h1 style="margin:0; font-size:30px; line-height:1.2; color:#DFDFDF; font-weight:800;">
                        Nowa wiadomość<br />
                        z formularza
                      </h1>
                      <p style="margin:10px 0 0; font-size:14px; color:rgba(223,223,223,0.88);">
                        Ktoś właśnie skontaktował się przez stronę.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:22px 24px 8px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate; border-spacing:0 8px;">
                  <tr>
                    <td style="font-size:14px; color:rgba(223,223,223,0.85); text-transform:uppercase; letter-spacing:.6px; width:90px;">Imię</td>
                    <td style="font-size:16px; color:#DFDFDF; font-weight:700;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="font-size:14px; color:rgba(223,223,223,0.85); text-transform:uppercase; letter-spacing:.6px;">E-mail</td>
                    <td style="font-size:16px;">
                      <a href="mailto:${safeEmail}" style="color:#DFDFDF; text-decoration:underline; text-decoration-thickness:2px; text-underline-offset:2px; font-weight:700;">
                        ${safeEmail}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:4px 24px 0;">
                <p style="margin:0 0 10px; font-size:13px; color:rgba(223,223,223,0.85); text-transform:uppercase; letter-spacing:.6px;">
                  Wiadomość
                </p>
                <div style="padding:16px 18px; border-radius:12px; background:#DFDFDF; color:#232526; font-size:15px; line-height:1.7; border:1px solid rgba(35,37,38,0.28); box-shadow:inset 0 1px 0 rgba(255,255,255,0.6);">
                  ${safeMessage || '<em>Brak treści</em>'}
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:16px 24px 0;">
                <p style="margin:0; font-size:12px; color:rgba(223,223,223,0.78);">
                  Czas wysłania: <strong style="color:#DFDFDF;">${sentAt}</strong>
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 24px 24px;">
                <a
                  href="mailto:${safeEmail}"
                  style="display:inline-block; padding:12px 18px; border-radius:10px; background:#DFDFDF; color:#232526; text-decoration:none; font-size:14px; font-weight:800; border:1px solid #DFDFDF; box-shadow:0 6px 16px rgba(223,223,223,0.24);"
                >
                  Odpowiedz nadawcy
                </a>
              </td>
            </tr>

            <tr>
              <td style="padding:14px 24px; border-top:1px solid rgba(223,223,223,0.3); text-align:center; background:rgba(223,223,223,0.05);">
                <p style="margin:0; font-size:12px; color:rgba(223,223,223,0.9);">
                  Wysłano z <span style="font-weight:700;">${host}/kontakt</span> &copy; ${currentYear}
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
}