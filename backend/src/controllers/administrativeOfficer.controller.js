import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Administrative } from "../models/Administrative.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Admin } from "../models/Admin.model.js";
import { Fee_section } from "../models/feeSection.model.js"
// import { Student } from "../models/Student.model.js";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await Administrative.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }


  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating referesh and access token")
  }
}

const administrativeOfficer = asyncHandler(async (req, res) => {
  const { name, email, phone, bloodgroup, address, experience, password, college_code } = req.body;


  if (
    [name, email, phone, bloodgroup, address, experience, password, college_code].some(
      (field) => typeof field !== "string" || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields must be non-empty strings");
  }

  const existedAdmin = await Administrative.findOne({
    $or: [{ email }, { phone }],
  });
  if (existedAdmin) {
    throw new ApiError(409, "AdministrativeOfficer with email or collegeCode already exists");
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
  const created = await Administrative.create({
    name, email, phone, bloodgroup, address, experience, password, college_code,
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
  const createdAdministorOfficer = await Administrative.findById(created._id)
    .select("-password")
  if (!createdAdministorOfficer) {
    throw new ApiError(500, "Something went wrong while registering the Admin");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        createdAdministorOfficer,
        "AdministrativeOfficer registered successfully"
      )
    );
});

const loginAdministrativeofficer = asyncHandler(async (req, res) => {

  const { email, password } = req.body

  if (!email && !password) {
    throw new ApiError(400, "username or email is required")
  }

  const user = await Administrative.findOne({
    $or: [{ password }, { email }]
  })

  if (!user) {
    throw new ApiError(404, "Administrativeofficer does not exist")
  }

  const isPasswordValid = await user.isPasswordCorrect(password)

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

  const loggedInUser = await Administrative.findById(user._id).select("-password -refreshToken -accessToken")

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
        "Admin logged In Successfully"
      )
    )

})

const logoutAdministrativeofficer = asyncHandler(async (req, res) => {
  await Administrative.findByIdAndUpdate(
    req.Administrative._id,
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
    .json(new ApiResponse(200, {}, "Administrativeofficer logged Out"))
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body



  const user = await Administrative.findById(req.Administrative?._id)
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
  const { name, email, phone, bloodgroup, address, experience } = req.body

  if (!name && !email && !phone && !experience && !address && !bloodgroup) {
    throw new ApiError(400, "atleast one fields is required")
  }

  const user = await Administrative.findByIdAndUpdate(
    req.Administrative?._id,
    {
      $set: {
        name, email, phone, bloodgroup, address, experience
      }
    },
    { new: true }

  ).select("-password")

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Administrative Account details updated successfully"))
});

const updateAdminAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  const user = await Administrative.findById(req.Administrative._id);


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

  const updatedUser = await Administrative.findById(req.Administrative._id).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Avatar image updated successfully"));
});

const preReg_Administrativeofficer = asyncHandler(async (req, res) => {
  let { administrativecode,collegeCode } = req.body;



  const allAdmins = await Admin.find({"collegeCode":collegeCode});
  console.log("All Admin Records:", JSON.stringify(allAdmins, null, 2));

  const findAdministorOfficer = await Admin.findOne({
    "staff_selection_id.administrativecode": administrativecode
  }).select("-password -refreshToken");

  console.log("Matched Officer:", findAdministorOfficer);

  if (!findAdministorOfficer) {
    throw new ApiError(404, "No Administrative Officer found with this code");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "Administrativecode is fetched successfully"
    )
  );
});

<<<<<<< HEAD
const verifyStudent = asyncHandler(async (req, res) => {
  
  const administrative_officer = await Administrative.findById(req.Administrative?._id);
  if(!administrative_officer) throw new ApiError(404,"Administrative Officer not found");

  const feeadmin = await Fee_section.findOneAndUpdate(
    { "collegeCode": administrative_officer.college_code},
    { $addToSet: { AllStudent: administrative_officer } },
    { new: true }
  );
  if(!feeadmin) throw new ApiError(400,"Data is not send to the feeadmin Officer.");
  return res
       .status(200)
       .json(new ApiResponse(200,{},"student is verify and send to fee_section."))
})

export {
  administrativeOfficer, loginAdministrativeofficer, logoutAdministrativeofficer, changeCurrentPassword,
  updateAccountDetails, updateAdminAvatar, preReg_Administrativeofficer,verifyStudent
=======
export {administrativeOfficer,loginAdministrativeofficer,logoutAdministrativeofficer,changeCurrentPassword,
    updateAccountDetails,updateAdminAvatar,preReg_Administrativeofficer
>>>>>>> origin/hostlib
}