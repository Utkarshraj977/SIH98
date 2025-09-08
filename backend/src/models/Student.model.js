import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const StudentSchema = new Schema(
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
        DOB: {
            type: String,
            required: true,
        },
        sex: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        bloodgroup: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        fathername: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        mothername: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        student_phone: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        father_phone: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        father_email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        curr_address: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        permanent_address: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },

        id: {
            type: String,
            lowercase: true,
            trim: true,
        },
        //college Details
        course: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        stream: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        collegeCode: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },


        //Acedmic Details
        prev_School_name: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        school_address: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        prev_equivalent_class: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        prev_equivalent_board: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        prev_equivalent_marks: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        prev_equivalent_marks_percent: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        appearIn: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        rankIn_comp: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        marksIn_comp: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        //All Documents
        pre_equi_cert: {
            url: {
                type: String,
                required: true,
            },
            public_id: {
                type: String,
                required: true,
            }
        },
        prev_equi_rank_card: {
            url: {
                type: String,
                required: true,
            },
            public_id: {
                type: String,
                required: true,
            }
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
        father_aadhar_card: {
            url: {
                type: String,
                required: true,
            },
            public_id: {
                type: String,
                required: true,
            }
        },
        sign_student: {
            url: {
                type: String,
                required: true,
            },
            public_id: {
                type: String,
                required: true,
            }
        },
        //After Admission
 //Attendence and Hostel Details is also created in future
        result:[
            {
                sem:{type:"String",required:true},
                marks:{type:Number,default:0}
            }
        ],
        message: [
            {
                type: String,
                date: { type: Date, default: Date.now }   // store timestamp for filtering
            }
        ],
        sem_fee: [
            {
                sem: { type: String, required: true },     // e.g., "1st", "2nd"
                paid: { type: Boolean, default: false },   // paid/unpaid
                amountPaid: { type: Number, default: 0 },  // how much paid
                dueAmount: { type: Number, default: 0 },   // optional: how much still due
                dateOfPayment: { type: Date }              // when payment done
            }
        ],
        certificate: [
            {
                type: String,
                lowercase: true,
                trim: true,
            }
        ],
        isverified: {
            type: Boolean,
            default: false,
        },
        sem:{
            type:Number,
            required:false,
            default:"1"
        },
        refreshToken: {
            type: String
        },
    },
    {
        timestamps: true
    }
)

StudentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

StudentSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

StudentSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            student_phone: this.student_phone,
            collegeCode: this.collegeCode
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
StudentSchema.methods.generateRefreshToken = function () {
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
export const Student = mongoose.model("Student", StudentSchema)

