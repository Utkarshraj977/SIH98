import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const hostalSchema = new Schema(
    {
        collegeName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        gender:{
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

        state: {
            type: String,
            required: true,
            trim: true,
            index: true,
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

        address: {
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

         AllStudent: [
        {
            type: Schema.Types.Mixed,
            ref: "Student",
        },
        ],

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
        total_room :{
        type : String,
        required : true
        },
        total_vacent :{
            type : String,
            required : true 
        },
    },
    {
        timestamps: true,
    }
);

// Fix: use HostelSchema instead of userSchema

hostalSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

hostalSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

hostalSchema.methods.generateAccessToken = function () {
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

hostalSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};
export const Hostel = mongoose.model("Hostel", hostalSchema);


