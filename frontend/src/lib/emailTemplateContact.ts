function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
}

function getInitials(name: string): string {
	const initials = name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map(part => part.charAt(0))
		.join('')
		.toUpperCase()
	return initials || '?'
}

// Kolory z src/app/styles/_colors.scss
const DARK = '#232526'
const LIGHT = '#DFDFDF'
const MUTED = '#9A9B9C'
const BORDER = '#3A3C3D'

const FONT_SANS = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
const FONT_MONO = "'JetBrains Mono', 'SFMono-Regular', Menlo, Consolas, 'Liberation Mono', monospace"

const LABEL_STYLE = `font-family:${FONT_MONO}; font-size:11px; line-height:16px; letter-spacing:2px; text-transform:uppercase; color:${MUTED};`

export function generateEmailTemplateContact(name: string, email: string, message: string): string {
	const safeName = escapeHtml(name.trim())
	const safeEmail = escapeHtml(email.trim())
	const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br />')
	const safeInitials = escapeHtml(getInitials(name))
	const preheader = escapeHtml(message.trim().replace(/\s+/g, ' ').slice(0, 120))

	const siteUrl = (process.env.NEXT_PUBLIC_HOST_URL ?? 'https://maxtkaczyk.pl').replace(/\/$/, '')
	const siteHost = siteUrl.replace(/^https?:\/\//, '')
	const sourceUrl = `${siteUrl}/pl#contact`
	const sourceLabel = `${siteHost}/pl#contact`

	const now = new Date()
	const currentYear = now.getFullYear()
	// Vercel działa w UTC – wymuszamy polską strefę czasową
	const sentAt = now.toLocaleString('pl-PL', {
		timeZone: 'Europe/Warsaw',
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})

	const replyHref = `mailto:${encodeURIComponent(email.trim())}?subject=${encodeURIComponent('Re: Twoja wiadomość z maxtkaczyk.pl')}`

	return `
<!doctype html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title>Nowa wiadomość z formularza kontaktowego</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet" />
    <style>
      @media only screen and (max-width: 620px) {
        .card-pad { padding-left: 24px !important; padding-right: 24px !important; }
        .title { font-size: 32px !important; line-height: 38px !important; }
        .tile { display: block !important; width: 100% !important; padding: 0 0 12px 0 !important; }
      }
    </style>
  </head>
  <body style="margin:0; padding:0; background:${LIGHT}; font-family:${FONT_SANS}; -webkit-font-smoothing:antialiased;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">
      ${safeName}: ${preheader}
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${LIGHT};">
      <tr>
        <td align="center" style="padding:40px 12px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;">

            <!-- Górny pasek -->
            <tr>
              <td style="padding:0 8px 20px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="vertical-align:middle;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td width="32" height="32" align="center" style="width:32px; height:32px; background:${DARK}; border-radius:8px; color:${LIGHT}; font-size:13px; font-weight:700; font-family:${FONT_SANS};">MT</td>
                          <td style="padding-left:10px; font-size:16px; font-weight:600; color:${DARK}; font-family:${FONT_SANS};">${escapeHtml(siteHost)}</td>
                        </tr>
                      </table>
                    </td>
                    <td align="right" style="vertical-align:middle; ${LABEL_STYLE} color:#5A5C5D;">Formularz kontaktowy</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Karta -->
            <tr>
              <td style="background:${DARK}; border-radius:24px; overflow:hidden;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">

                  <!-- Nagłówek -->
                  <tr>
                    <td class="card-pad" style="padding:44px 44px 36px; border-bottom:1px solid ${BORDER};">
                      <p style="margin:0 0 20px; ${LABEL_STYLE}">
                        <span style="color:${LIGHT}; font-size:14px; letter-spacing:0;">&#9679;</span>&nbsp;&nbsp;Nowa wiadomość
                      </p>
                      <h1 class="title" style="margin:0; font-size:40px; line-height:46px; font-weight:700; letter-spacing:-1px; color:${LIGHT}; font-family:${FONT_SANS};">
                        Ktoś chce z&nbsp;Tobą porozmawiać.
                      </h1>
                      <p style="margin:16px 0 0; font-size:16px; line-height:26px; color:${MUTED};">
                        Właśnie przyszła wiadomość przez formularz na Twojej stronie. Szczegóły poniżej.
                      </p>
                    </td>
                  </tr>

                  <!-- Nadawca -->
                  <tr>
                    <td class="card-pad" style="padding:32px 44px; border-bottom:1px solid ${BORDER};">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td width="52" height="52" align="center" style="width:52px; height:52px; background:${LIGHT}; border-radius:50%; color:${DARK}; font-size:18px; font-weight:700; font-family:${FONT_SANS};">${safeInitials}</td>
                          <td style="padding-left:16px; vertical-align:middle;">
                            <p style="margin:0; font-size:18px; line-height:24px; font-weight:600; color:${LIGHT};">${safeName}</p>
                            <a href="mailto:${safeEmail}" style="font-size:15px; line-height:22px; color:${MUTED}; text-decoration:underline; text-underline-offset:2px;">${safeEmail}</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Wiadomość -->
                  <tr>
                    <td class="card-pad" style="padding:32px 44px 0;">
                      <p style="margin:0 0 14px; ${LABEL_STYLE}">Wiadomość</p>
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="background:${LIGHT}; border-radius:16px; padding:24px 28px 28px;">
                            <p style="margin:0 0 6px; font-family:Georgia, 'Times New Roman', serif; font-size:44px; line-height:32px; font-weight:700; font-style:italic; color:${DARK};">&ldquo;</p>
                            <p style="margin:0; font-size:16px; line-height:28px; color:${DARK};">
                              ${safeMessage || '<em>Brak treści</em>'}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Kafelki -->
                  <tr>
                    <td class="card-pad" style="padding:24px 44px 0;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td class="tile" width="50%" style="width:50%; padding-right:6px; vertical-align:top;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                              <tr>
                                <td style="border:1px solid ${BORDER}; border-radius:14px; padding:16px 18px;">
                                  <p style="margin:0 0 6px; ${LABEL_STYLE} font-size:10px;">Wysłano</p>
                                  <p style="margin:0; font-size:15px; line-height:22px; font-weight:600; color:${LIGHT};">${sentAt}</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td class="tile" width="50%" style="width:50%; padding-left:6px; vertical-align:top;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                              <tr>
                                <td style="border:1px solid ${BORDER}; border-radius:14px; padding:16px 18px;">
                                  <p style="margin:0 0 6px; ${LABEL_STYLE} font-size:10px;">Źródło</p>
                                  <a href="${escapeHtml(sourceUrl)}" style="margin:0; font-size:15px; line-height:22px; font-weight:600; color:${LIGHT}; text-decoration:none;">${escapeHtml(sourceLabel)}</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- CTA -->
                  <tr>
                    <td class="card-pad" style="padding:28px 44px 40px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="background:${LIGHT}; border-radius:12px;">
                            <a href="${escapeHtml(replyHref)}" style="display:inline-block; padding:15px 26px; font-size:16px; line-height:20px; font-weight:600; color:${DARK}; text-decoration:none; font-family:${FONT_SANS};">
                              Odpowiedz nadawcy&nbsp;&nbsp;&rarr;
                            </a>
                          </td>
                        </tr>
                      </table>
                      <p style="margin:16px 0 0; font-size:14px; line-height:20px; color:${MUTED};">
                        lub po prostu kliknij &bdquo;Odpowiedz&rdquo; w&nbsp;skrzynce
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Stopka -->
            <tr>
              <td align="center" style="padding:28px 16px 0; font-size:13px; line-height:22px; color:#6B6D6E;">
                Ta wiadomość została wysłana automatycznie z formularza kontaktowego na
                <a href="${escapeHtml(siteUrl)}" style="color:${DARK}; font-weight:600; text-decoration:underline;">${escapeHtml(siteHost)}</a>.<br />
                &copy; ${currentYear} Maksymilian Tkaczyk
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
