import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const administrativeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        bloodgroup: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            url: {
                type: String,
                required: true,
            },
            public_id: {
                type: String,
                required: true,
            }
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        experience: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        certificate: {
            url: {
                type: String,
                required: true,
            },
            public_id: {
                type: String,
                required: true,
            }
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        },
        college_code: {
            type: String,
            required: true,
        },
        message: [
            {
                type: String,
                date: { type: Date, default: Date.now }   // store timestamp for filtering
            }
        ],
        AllStudent: [
            {
                type: Schema.Types.Mixed,
                ref: "Student"
            }
        ],
    },
    {
        timestamps: true
    }
)

administrativeSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

administrativeSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

administrativeSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            college_code: this.college_code,
            phone: this.phone,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
administrativeSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const Administrative = mongoose.model("Administrative", administrativeSchema)