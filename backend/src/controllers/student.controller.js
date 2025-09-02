import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Student } from "../models/Student.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Administrative } from "../models/Administrative.models.js";

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await Student.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerStudent = asyncHandler(async (req, res) => {
    const { name, email, DOB, sex, bloodgroup, fathername, mothername, student_phone, father_phone,
        father_email, curr_address, permanent_address, password, isverified, id, course, stream, collegeCode,
        prev_School_name, school_address, prev_equivalent_class, prev_equivalent_board, prev_equivalent_marks,
        prev_equivalent_marks_percent, appearIn, rankIn_comp, marksIn_comp,
    } = req.body;


    if (
        [name, email, DOB, sex, bloodgroup, fathername, mothername, student_phone, father_phone,
            father_email, curr_address, permanent_address, password, course, stream, collegeCode,
            prev_School_name, school_address, prev_equivalent_class, prev_equivalent_board, prev_equivalent_marks,
            prev_equivalent_marks_percent, appearIn, rankIn_comp, marksIn_comp,].some(
                (field) => typeof field !== "string" || field.trim() === ""
            )
    ) {
        throw new ApiError(400, "All fields must be non-empty strings");
    }

    const existedstudent = await Student.findOne({
        $or: [{ email }, { student_phone }],
    });
    if (existedstudent) {
        throw new ApiError(409, "Student with email or phone already exists");
    }

    // ✅ File path extraction and upload on cloudinary

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const pre_equi_certPath = req.files?.pre_equi_cert?.[0]?.path;
    const prev_equi_rank_cardPath = req.files?.prev_equi_rank_card?.[0]?.path;
    const aadhar_cardPath = req.files?.aadhar_card?.[0]?.path;
    const father_aadhar_cardPath = req.files?.father_aadhar_card?.[0]?.path;
    const sign_studentPath = req.files?.sign_student?.[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }
    if (!pre_equi_certPath) {
        throw new ApiError(400, "pre Equivalent certificate is required");
    }
    if (!prev_equi_rank_cardPath) {
        throw new ApiError(400, "pre Equivalent Rank certificate is required");
    }
    if (!father_aadhar_cardPath) {
        throw new ApiError(400, "father aadhar card certificate is required");
    }
    if (!aadhar_cardPath) {
        throw new ApiError(400, "aadhar_card file is required");
    }
    if (!sign_studentPath) {
        throw new ApiError(400, "Student sign certificate is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar) {
        throw new ApiError(400, "Avatar upload failed");
    }
    const pre_equi_cert = await uploadOnCloudinary(pre_equi_certPath);
    console.log(pre_equi_cert)
    if (!pre_equi_cert) {
        throw new ApiError(400, "pre Equivalent certificate upload failed");
    }
    const prev_equi_rank_card = await uploadOnCloudinary(prev_equi_rank_cardPath);
    if (!prev_equi_rank_card) {
        throw new ApiError(400, "pre Equivalent Rank certificate upload failed");
    }
    const father_aadhar_card = await uploadOnCloudinary(father_aadhar_cardPath);
    if (!father_aadhar_card) {
        throw new ApiError(400, "father aadhar card certificate upload failed");
    }
    const sign_student = await uploadOnCloudinary(sign_studentPath);
    if (!sign_student) {
        throw new ApiError(400, "Student sign certificate upload failed");
    }
    const aadhar_card = await uploadOnCloudinary(aadhar_cardPath);
    if (!aadhar_card) {
        throw new ApiError(400, "aadhar_card certificate upload failed");
    }


    const created = await Student.create({
        name, email, DOB, sex, bloodgroup, fathername, mothername, student_phone, father_phone, isverified,
        father_email, curr_address, permanent_address, password, course, stream, collegeCode,
        prev_School_name, school_address, prev_equivalent_class, prev_equivalent_board, prev_equivalent_marks,
        prev_equivalent_marks_percent, appearIn, rankIn_comp, marksIn_comp,
        avatar: {
            url: avatar?.url || "",
            public_id: avatar?.public_id || "",
        },
        pre_equi_cert: {
            url: pre_equi_cert?.url || "",
            public_id: pre_equi_cert?.public_id || "",
        },
        prev_equi_rank_card: {
            url: prev_equi_rank_card?.url || "",
            public_id: prev_equi_rank_card?.public_id || "",
        },
        father_aadhar_card: {
            url: father_aadhar_card?.url || "",
            public_id: father_aadhar_card?.public_id || "",
        },
        sign_student: {
            url: sign_student?.url || "",
            public_id: sign_student?.public_id || "",
        },
        aadhar_card: {
            url: aadhar_card?.url || "",
            public_id: aadhar_card?.public_id || "",
        },
    });


    // Remove password & refreshToken
    const createdstudent = await Student.findById(created._id)
        .select("-password")
    if (!createdstudent) {
        throw new ApiError(500, "Something went wrong while registering the Student");
    }

    const administrativeUser = await Administrative.findOneAndUpdate(
        { "college_code": createdstudent.collegeCode },
        { $addToSet: { AllStudent: createdstudent } },
        { new: true }
    );


    if (!administrativeUser) throw new ApiError(400, "student is not set into administrative ooficer")

    return res
        .status(201)
        .json(
            new ApiResponse(
                200,
                createdstudent,
                "Student data submitted for Admission. "
            )
        );
});

const loginStudent = asyncHandler(async (req, res) => {
    let { email, student_phone, password } = req.body;

    // Validate required fields
    if ((!email && !student_phone) || !password) {
        throw new ApiError(400, "Email or student phone AND password are required");
    }

    // Find student by email or phone
    const studentuser = await Student.findOne({
        $or: [{ student_phone }, { email }]
    });

    if (!studentuser) {
        throw new ApiError(404, "Student does not exist");
    }

    const isPasswordValid = await studentuser.isPasswordCorrect(password);
    console.log("isPasswordValid:", isPasswordValid);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid student credentials");
    }

    // Generate tokens
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(studentuser._id);

    // Return user without sensitive fields
    const loggedInstudentuser = await Student.findById(studentuser._id)
        .select("-password -refreshToken -accessToken");

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInstudentuser,
                    accessToken,
                    refreshToken
                },
                "Student logged in successfully"
            )
        );
});

const logoutStudent = asyncHandler(async (req, res) => {
    await Student.findByIdAndUpdate(
        req.Student._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "Student logged Out"))
})

const getCurrentUser = asyncHandler(async (req, res) => {

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.Student,
            "Student User fetched successfully"
        ))
})

const getlatestmess = asyncHandler(async (req, res) => {
    const studentId = req.Student._id;

    const result = await Student.aggregate([
        { $match: { _id: studentId } },
        { $unwind: { path: "$message", preserveNullAndEmptyArrays: true } }, // in case no messages
        { $sort: { "message.date": -1 } },
        { $group: { _id: "$_id", messages: { $push: "$message" } } }
    ]);

    const messages = result[0]?.messages || []; // avoid undefined

    return res
        .status(200)
        .json(new ApiResponse(200, messages, "Latest messages fetched successfully."));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body



    const user = await Student.findById(req.Student?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const updateStudentAvatar = asyncHandler(async (req, res) => {

    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing");
    }

    const user = await Student.findById(req.Student._id);

    // ✅ Step 2: Upload new avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar?.url) {
        throw new ApiError(400, "Error while uploading avatar");
    }

    // ✅ Step 3: Update DB with new avatar info
    user.avatar = {
        url: avatar.url,
        public_id: avatar.public_id,
    };
    await user.save();

    const updatedUser = await Student.findById(req.Student._id).select("-password");

    return res
        .status(200)
        .json(new ApiResponse(200, updatedUser, "Avatar image updated successfully"));

})

const allAdmittedStudent = asyncHandler(async (req, res) => {
    const findstudent = await Student.find({ isverified: true }).select("-password");
    const studentNum = findstudent.length;

    return res
        .status(200)
        .json(new ApiResponse(200, { students: findstudent, studentNum }, "Total admitted students fetched successfully"));
});

const allUnAdmittedStudent = asyncHandler(async (req, res) => {
    const findstudent = await Student.find({ isverified: false }).select("-password");
    const studentNum = findstudent.length;

    return res
        .status(200)
        .json(new ApiResponse(200, { students: findstudent, studentNum }, "Total admitted students fetched successfully"));
});

const allDeptStudent = asyncHandler(async (req, res) => {
    const dept = req.params.dept;
    if (!dept) throw new ApiError(400, "Dept must be provided for filter");

    const students = await Student.aggregate([
        { $match: { isverified: true, stream: dept } }
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, students, "All students with this department fetched successfully"));
});

//filter by course
const allStudentBycourse = asyncHandler(async (req, res) => {
    const course = req.params.course;
    if (!course) throw new ApiError(400, "course must be provided for filter");

    const students = await Student.aggregate([
        { $match: { isverified: true, course: course } }
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, students, "All students with this course fetched successfully"));
});

//filter by sem
const allStudentBysem = asyncHandler(async (req, res) => {
    const sem = req.params.sem;
    if (!sem) throw new ApiError(400, "sem must be provided for filter");

    const students = await Student.aggregate([
        { $match: { isverified: true, sem: sem } }
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, students, "All students with this sem fetched successfully"));
});


export {
    registerStudent, loginStudent, logoutStudent, getCurrentUser, getlatestmess, changeCurrentPassword,
    allAdmittedStudent, allUnAdmittedStudent, updateStudentAvatar, allStudentBysem, allStudentBycourse, allDeptStudent
}

