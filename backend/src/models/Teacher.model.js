import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const TeacherSchema = new Schema(
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
        course: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        stream: {
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
        AllStudent: [
            {
                type: Schema.Types.Mixed,
                ref: "Student"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        message: [
            {
                type: String,
                date: { type: Date, default: Date.now }   // store timestamp for filtering
            }
        ],
        refreshToken: {
            type: String
        },
    },
    {
        timestamps: true
    }
)

TeacherSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

TeacherSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

TeacherSchema.methods.generateAccessToken = function () {
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
TeacherSchema.methods.generateRefreshToken = function () {
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

export const Teacher = mongoose.model("Teacher", TeacherSchema)