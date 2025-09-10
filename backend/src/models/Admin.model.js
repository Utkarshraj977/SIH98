import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const adminSchema = new Schema(
  {
    collegeName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    collegeCode: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    venue: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    collegeImage: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
    collegeRegnum: {
      type: String,
      required: true,
      trim: true,
    },
    AICTE: {
      public_id: { type: String },
      url: { type: String },
    },
    NAAC: {
      public_id: { type: String },
      url: { type: String },
    },
    NBA: {
      public_id: { type: String },
      url: { type: String },
    },

    Institute_Type: {
      type: String,
      required: [true, "field is required"],
    },
    refreshToken: {
      type: String,
    },

    // personal details
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    age: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    blood_group: {
      type: String,
    },
    aadhar_card: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },

    staff_selection_id: {
    administrativecode: { type: String, default: "726800" },
    Teacher: { type: String, default: "726800" },
    student: { type: String, default: "234567" },
    fee_section: { type: String, default: "5684525" },
    hostel: { type: String, default: "5684525" },
  },

  },
  {
    timestamps: true,
  }
);

// ✅ Fix: use adminSchema instead of userSchema
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

adminSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

adminSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      collegeCode: this.collegeCode,
      collegeRegnum: this.collegeRegnum,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

adminSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
export const Admin = mongoose.model("Admin", adminSchema);


