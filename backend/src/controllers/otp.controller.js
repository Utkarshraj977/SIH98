import Otp from "../models/Otp.model.js";
import { sendMail } from "../utils/mailer.js";

// ✅ Send OTP
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ msg: "Email required" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Delete old OTPs for this email
    await Otp.deleteMany({ email });

    // Save new OTP
    await Otp.create({ email, otp });
    console.log("Generated OTP:", otp);

    // Send email
    const sent = await sendMail(email, "Your OTP Code", `Your OTP is ${otp}`);

    if (!sent) {
      return res.status(500).json({ msg: "Failed to send OTP email" });
    }

    res.json({ msg: "OTP sent successfully!" });
  } catch (err) {
    console.error("Send OTP Error:", err);
    res.status(500).json({ msg: "Error sending OTP" });
  }
};


// ✅ Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await Otp.findOne({ email, otp });
    if (!record) {
      return res.status(400).json({ success: false, msg: "Invalid or expired OTP" });
    }

    await Otp.deleteMany({ email });

    res.json({ success: true, msg: "OTP verified!" });
  } catch (err) {
    console.error("Verify OTP Error:", err);
    res.status(500).json({ msg: "Error verifying OTP" });
  }
};
