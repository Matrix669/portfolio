export function generateEmailTemplateContact(name: string, email: string, message: string): string {
	return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
        <h2 style="color: #333; text-align: center;">Nowa wiadomość z formularza kontaktowego</h2>
        <hr style="border: 1px solid #e0e0e0; margin: 20px 0;" />
        <p style="color: #555; line-height: 1.6;">
          <strong>Imię:</strong> ${name}<br />
          <strong>E-mail:</strong> <a href="mailto:${email}" style="color: #1a73e8; text-decoration: none;">${email}</a><br />
          <strong>Wiadomość:</strong>
        </p>
        <div style="background-color: #fff; padding: 15px; border-radius: 5px; border: 1px solid #ddd; margin-top: 10px;">
          ${message}
        </div>
        <footer style="text-align: center; margin-top: 20px; color: #777; font-size: 12px;">
          <p>Wysłano z ${process.env.NEXT_PUBLIC_HOST_URL}/kontakt &copy; ${new Date().getFullYear()}</p>
        </footer>
      </div>
    `
}
