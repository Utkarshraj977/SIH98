import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const fee_sectionSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
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
        collegeCode: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        experience: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
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
        certificate: {
            public_id: {
                type: String,
                required: false     // ✅ make optional
            },
            url: {
                type: String,
                required: false     // ✅ make optional
            }
        },
        AllStudent:[
            {
                type: Schema.Types.Mixed,
                ref: "Student"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        },
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            phone: this.phone,
            collegeCode: this.collegeCode
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
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

export const Fee_section = mongoose.model("Fee_section", fee_sectionSchema)