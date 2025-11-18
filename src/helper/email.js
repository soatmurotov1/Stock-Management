import nodemailer from "nodemailer";

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); 
}

export const sendOTP = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `Abrorbek Soatmurotov ${process.env.EMAIL_USER}`,
    to,
    subject: "Your Verification Code",
    html: `<h3>Sizning OTP kodingiz: <b>${otp}</b></h3>`,
  });
}
