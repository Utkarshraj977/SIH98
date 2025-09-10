import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
// import { Teacher } from "../models/Teacher.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
 import { Admin } from "../models/Admin.model.js";
import { Teacher } from "../models/Teacher.model.js";

// import { Student } from "../models/Student.model.js";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await Teacher.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }


  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating referesh and access token")
  }
}

const preReg_teacher = asyncHandler(async (req, res) => {
  let { Teacher } = req.body;

  console.log("Incoming Code:", Teacher);

  const allAdmins = await Admin.find();
  console.log("All Admin Records:", JSON.stringify(allAdmins, null, 2));

  const findAdministorOfficer = await Admin.findOne({
    "staff_selection_id.Teacher": Teacher
  }).select("-password -refreshToken");

  console.log("Matched Officer:", findAdministorOfficer);

  if (!findAdministorOfficer) {
    throw new ApiError(404, "No Teacher Officer found with this code");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "Teacher is fetched successfully"
    )
  );
});

const TeacherReg = asyncHandler(async (req, res) => {
  const { name, email, phone, collegeCode, address, experience, password,course,stream} = req.body;


  if (
    [name, email, phone, collegeCode, address, experience, password,course,stream].some(
      (field) => typeof field !== "string" || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields must be non-empty strings");
  }

  const existedAdmin = await Teacher.findOne({
    $or: [ { email }, { phone }],
  });
  if (existedAdmin) {
    throw new ApiError(409, "Teacher with email or phone already exists");
  }

  // ✅ File path extraction

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar upload failed");
  }

  const certificateImagePath = req.files?.certificate?.[0]?.path;
  if (!certificateImagePath) {
    throw new ApiError(400, "certificate file is required");
  }
  const certificate = await uploadOnCloudinary(certificateImagePath);
  if (!certificate) {
    throw new ApiError(400, "certificate upload failed");
  }

  // Admin create
  const created = await Teacher.create({
  name, email, phone, collegeCode, address, experience, password,course,stream,
    avatar: {
      url: avatar?.url || "",
      public_id: avatar?.public_id || "",
    },
    certificate: {
      url: certificate?.url || "",
      public_id: certificate?.public_id || "",
    }
  });


  // Remove password & refreshToken
  const ccreatTeacher = await Teacher.findById(created._id)
    .select("-password")
  if (!ccreatTeacher) {
    throw new ApiError(500, "Something went wrong while registering the Teacher");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        ccreatTeacher,
        "Teacher registered successfully"
      )
    );
});

const loginTeacher = asyncHandler(async (req, res) => {

  const { email, password } = req.body

  if ( !email && !password) {
    throw new ApiError(400, "username or email is required")
  }

  const user = await Teacher.findOne({
    $or: [{ password }, { email }]
  })

  if (!user) {
    throw new ApiError(404, "Teacherofficer does not exist")
  }

  const isPasswordValid = await user.isPasswordCorrect(password)

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Teacher credentials")
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

  const loggedInUser = await Teacher.findById(user._id).select("-password -refreshToken -accessToken")

  const options = {
    httpOnly: true,
    secure: true
  }

  // if (!user.isVerified) {
  // return res.status(403).json({ message: "Email not verified. Please verify first." });
  // }


  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser, accessToken, refreshToken
        },
        "Teacher logged In Successfully"
      )
    )

})

const logoutTeacher = asyncHandler(async (req, res) => {
  await Teacher.findByIdAndUpdate(
    req.Teacher._id,
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
    .json(new ApiResponse(200, {}, "Teacher logged Out"))
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body



  const user = await Teacher.findById(req.Teacher?._id)
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password")
  }

  user.password = newPassword
  console.log(user.password);
  await user.save({ validateBeforeSave: false })

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const updateAccountDetails = asyncHandler(async (req, res) => {
  const {  name, email, phone, address, experience,course,streame } = req.body

  if (!name && !email && !phone && !experience && !address && !course && !streame ) {
    throw new ApiError(400, "atleast one fields is required")
  }

  const user = await Teacher.findByIdAndUpdate(
    req.Teacher?._id,
    {
      $set: {
        name, email, phone, address, experience,course,streame 
      }
    },
    { new: true }

  ).select("-password")

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Teacher Account details updated successfully"))
});

const updateAdminAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  const user = await Teacher.findById(req.Teacher._id);


  // if (user?.avatar?.public_id) {
  //   await cloudinary.uploader.destroy(user.avatar.public_id);
  //   console.log("old file delete");

  // }

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

  const updatedUser = await Teacher.findById(req.Teacher._id).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Avatar image updated successfully"));
});

const getlatestmess = asyncHandler(async (req, res) => {
    const teacherId = req.Teacher._id;

    const result = await Teacher.aggregate([
        { $match: { _id: teacherId } },
        { $unwind: { path: "$message", preserveNullAndEmptyArrays: true } }, // in case no messages
        { $sort: { "message.date": -1 } },
        { $group: { _id: "$_id", messages: { $push: "$message" } } }
    ]);

    const messages = result[0]?.messages || []; // avoid undefined

    return res
        .status(200)
        .json(new ApiResponse(200, messages, "Latest messages fetched successfully."));
});

const getCurrentUser = asyncHandler(async (req, res) => {

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.Teacher,
            "Teacher User fetched successfully"
        ))
})

const getCurrentUserPara = asyncHandler(async (req, res) => {
    const id =req.params.id;
    if(!id){
        throw new ApiError(400, "id is not found");
    }
    const currentTeacher = await Teacher.find({_id : id })
    if(!currentTeacher) {
        throw new ApiError(400, "currentTeacher is not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            currentTeacher,
            "Teacher User fetched successfully"
        ))
})


export {preReg_teacher,TeacherReg,loginTeacher,logoutTeacher,changeCurrentPassword,
    updateAccountDetails,updateAdminAvatar,getlatestmess,getCurrentUser,
    getCurrentUserPara
}