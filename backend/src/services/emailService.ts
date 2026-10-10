import nodemailer, { type Transporter } from 'nodemailer';
import { config } from '../config/env.js';

export class EmailService {
  private static transporter: Transporter | null = null;

  private static getTransporter() {
    if (this.transporter) return this.transporter;

    if (!config.isEmailConfigured) {
      return null;
    }

    try {
      this.transporter = nodemailer.createTransport({
        host: config.email.host,
        port: config.email.port,
        secure: config.email.port === 465,
        auth: {
          user: config.email.user,
          pass: config.email.password,
        },
      });
      return this.transporter;
    } catch (err) {
      console.error('[EmailService] Failed to initialize Nodemailer transporter:', err);
      return null;
    }
  }

  static async sendContactNotification(params: {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }): Promise<boolean> {
    const { name, email, phone, message } = params;

    const transporter = this.getTransporter();
    const recipient = config.email.ownerEmail;

    if (!transporter || !recipient) {
      console.log(`[EmailService - Dev Notification] New inquiry from: ${name} (${email}, Phone: ${phone || 'N/A'})\nMessage: ${message}`);
      return true; // Not an error if SMTP not configured in preview environment
    }

    try {
      const mailOptions = {
        from: `"Civil Works Inquiry" <${config.email.user}>`,
        to: recipient,
        replyTo: email,
        subject: `New Project Inquiry from ${name} [Tectonic Precision]`,
        text: `New contact submission received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}\n\nSubmitted at: ${new Date().toISOString()}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #E2E8F0; border-radius: 6px; background-color: #FFFFFF;">
            <div style="border-bottom: 2px solid #263746; padding-bottom: 12px; margin-bottom: 16px;">
              <h2 style="color: #102230; margin: 0; font-size: 20px;">New Civil Construction Project Inquiry</h2>
              <p style="color: #66737D; margin: 4px 0 0 0; font-size: 13px;">Tectonic Precision Building Works Platform</p>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; color: #66737D; width: 100px; font-weight: bold;">Sender:</td>
                <td style="padding: 8px 0; color: #1F2933;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #66737D; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0; color: #1F2933;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #66737D; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 0; color: #1F2933;">${phone || 'Not provided'}</td>
              </tr>
            </table>
            <div style="background-color: #F7F9FF; border-left: 3px solid #B87333; padding: 14px; border-radius: 4px; margin-bottom: 20px;">
              <h4 style="margin: 0 0 8px 0; color: #102230;">Project Scope / Message:</h4>
              <p style="margin: 0; color: #1F2933; white-space: pre-wrap; line-height: 1.5;">${message}</p>
            </div>
            <p style="font-size: 12px; color: #66737D; border-top: 1px solid #E2E8F0; padding-top: 12px; margin: 0;">
              You can reply directly to this email to contact the prospective client.
            </p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`[EmailService] Notification email sent successfully to ${recipient}`);
      return true;
    } catch (err) {
      console.error('[EmailService] Error sending email notification:', err);
      return false;
    }
  }
}
