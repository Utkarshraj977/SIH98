import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false, // port 587 ke liye false
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendMail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: `"ERP student mannagement" <${process.env.MAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log("✅ Mail sent:", info.messageId);
    return true;
  } catch (err) {
    console.error("❌ Mail send error:", err);
    return false;
  }
};
