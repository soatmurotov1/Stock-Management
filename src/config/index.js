import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT,
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
  },
  email: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  }
}
