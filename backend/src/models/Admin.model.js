import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const adminSchema = new Schema(
    {
        collegeName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        collegeCode: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
        },


        venue: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        state: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        collegeImage: {
            url: {
                type: String,
                required: true,
            },
            public_id: {
                type: String,
                required: true,
            }
        },
        collegeRegnum:{
            type: String,
            required: true,
            trim: true,
        },
        AICTE: {
            public_id: {
                type: String,
                required: false     // ✅ make optional
            },
            url: {
                type: String,
                required: false     // ✅ make optional
            }
        },
        NAAC: {
            public_id: {
                type: String,
                required: false     // ✅ make optional
            },
            url: {
                type: String,
                required: false     // ✅ make optional
            }
        },
        NBA: {
            public_id: {
                type: String,
                required: false     // ✅ make optional
            },
            url: {
                type: String,
                required: false     // ✅ make optional
            }
        },

        Institute_Type: {
            type: String,
            required: [true, 'field is required']
        },
        refreshToken: {
            type: String
        },

        //personal details
        name: {
            type: String,
            required: true,
            unique: true,
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

        age: {
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
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        blood_group: {
            type: String
        },
        aadhar_card: {
            url: {
                type: String,
                required: true,
            },
            public_id: {
                type: String,
                required: true,
            }
        },
        staff_selection_id:[{"administrative":10297145},{"Teacher":726800},{"student":234567},{"fee_section":5684525}]
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
            collegeCode: this.collegeCode,
            collegeRegnum: this.collegeRegnum
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

export const Admin = mongoose.model("Admin", adminSchema)