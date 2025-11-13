import nodemailer from "nodemailer";
import { config } from "../config/index.js"

export const generateOTP = () => Math.floor(100000 + Math.random() * 900000)

export const sendOTP = async (to, username, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
  })

  await transporter.sendMail({
    from: `"Abrorbek Soatmurotov" <${process.env.GOOGLE_EMAIL}>`,
    to,
    subject: "Tasdiqlash kodi",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Salom, ${username}!</h2>
        <p>Sizning tasdiqlash kodingiz quyidagicha:</p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="
            font-size: 32px;
            font-weight: bold;
            color: #2b7de9;
            letter-spacing: 4px;
          ">${otp}</span>
        </div>
        <p style="color: #555;">Kod 5 daqiqadan so'ng muddati tugaydi.</p>
      </div>
    `,
  })
}
