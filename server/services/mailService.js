const nodemailer = require('nodemailer')
class MailService {
  constructor() {
    // in the post box of this service (company corporate postbox, we need IMAP protocol to be turned on (tab readdressing and POP/IMAP)
    // in details of IMAP we need to find outgoing format
    // example:
    // smtp.gmail.com
    // Requires SSL: Yes
    // Requires TLS: Yes (if available)
    // Requires Authentication: Yes
    // Port for SSL: 465
    // Port for TLS/STARTTLS: 587
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }
  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Account Activation on ${process.env.API_URL}`,
      text: '',
      html: `<div><h1>For activation go to link:</h1><a href=${link}>${link}</a></div>`
    })
  }
}

module.exports = new MailService()