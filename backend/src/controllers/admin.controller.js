import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/Admin.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await Admin.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }


  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating referesh and access token")
  }
}

const registerAdmin = asyncHandler(async (req, res) => {
  const { collegeName, collegeCode, venue, state, collegeRegnum, Institute_Type, name, email, phone, age, password, blood_group } = req.body;


  if (
    [collegeName, collegeCode, venue, state, collegeRegnum, Institute_Type, name, email, phone, age, password, blood_group].some(
      (field) => typeof field !== "string" || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields must be non-empty strings");
  }

  const existedAdmin = await Admin.findOne({
    $or: [{ collegeCode }, { email }, { phone }],
  });
  if (existedAdmin) {
    throw new ApiError(409, "Admin with email or collegeCode already exists");
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

  const acollegeImagePath = req.files?.collegeImage?.[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "collegeImage file is required");
  }
  const collegeImage = await uploadOnCloudinary(acollegeImagePath);
  if (!collegeImage) {
    throw new ApiError(400, "collegeImage upload failed");
  }
  let AICTE, NAAC, NBA;
  if (req.files?.AICTE?.[0]?.path) {
    const AICTEPath = req.files?.AICTE?.[0]?.path;
    if (!AICTEPath) {
      throw new ApiError(400, "AICTE file is required");
    }

    AICTE = await uploadOnCloudinary(AICTEPath);
    if (!AICTE) {
      throw new ApiError(400, "AICTE upload failed");
    }
  }
  if (req.files?.NAAC?.[0]?.path) {
    const NAACPath = req.files?.NAAC?.[0]?.path;
    if (!NAACPath) {
      throw new ApiError(400, "NAAC file is required");
    }
    NAAC = await uploadOnCloudinary(NAACPath);
    if (!NAAC) {
      throw new ApiError(400, "NAAC upload failed");
    }
  }

  if (req.files?.NBA?.[0]?.path) {
    const NBAPath = req.files?.NBA?.[0]?.path;
    if (!NBAPath) {
      throw new ApiError(400, "NBA file is required");
    }
    NBA = await uploadOnCloudinary(NBAPath);
    if (!NBA) {
      throw new ApiError(400, "NBA upload failed");
    }
  }


  const aadhar_cardPath = req.files?.aadhar_card?.[0]?.path;
  if (!aadhar_cardPath) {
    throw new ApiError(400, "aadhar_card file is required");
  }
  const aadhar_card = await uploadOnCloudinary(aadhar_cardPath);
  if (!aadhar_card) {
    throw new ApiError(400, "aadhar_card upload failed");
  }



  //   const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  //   const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min


  //     // Send OTP to Email
  //   await sendVerificationEmail(email, otpCode);


  // Admin create
  const created = await Admin.create({
    collegeName,
    collegeCode,
    venue,
    state,
    collegeRegnum,
    Institute_Type,
    name,
    email,
    phone,
    age,
    password,
    blood_group,
    avatar: {
      url: avatar?.url || "",
      public_id: avatar?.public_id || "",
    },
    collegeImage: {
      url: collegeImage?.url || "",
      public_id: collegeImage?.public_id || "",
    },
    AICTE: {
      url: AICTE?.url || "",
      public_id: AICTE?.public_id || "",
    },
    NAAC: {
      url: NAAC?.url || "",
      public_id: NAAC?.public_id || "",
    },
    NBA: {
      url: NBA?.url || "",
      public_id: NBA?.public_id || "",
    },
    aadhar_card: {
      url: aadhar_card?.url || "",
      public_id: aadhar_card?.public_id || "",
    },
  });



  // Remove password & refreshToken
  const createdAdmin = await Admin.findById(created._id)
    .select("-password")
  if (!createdAdmin) {
    throw new ApiError(500, "Something went wrong while registering the Admin");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        createdAdmin,
        "Admin registered successfully"
      )
    );
});

const loginAdmin = asyncHandler(async (req, res) => {

  const { email, phone, password } = req.body


  if (!phone && !email && !password) {
    throw new ApiError(400, "username or email is required")
  }

  const user = await Admin.findOne({
    $or: [{ password }, { email }]
  })

  if (!user) {
    throw new ApiError(404, "User does not exist")
  }

  const isPasswordValid = await user.isPasswordCorrect(password)

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

  const loggedInUser = await Admin.findById(user._id).select("-password -refreshToken -accessToken")

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

const logoutAdmin = asyncHandler(async (req, res) => {
  await Admin.findByIdAndUpdate(
    req.Admin._id,
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
    .json(new ApiResponse(200, {}, "Admin logged Out"))
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body



  const user = await Admin.findById(req.Admin?._id)
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

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(
      200,
      req.Admin,
      "Admin User fetched successfully"
    ))
})


const updateAccountDetails = asyncHandler(async (req, res) => {
  const { name, email, phone, age, password, blood_group } = req.body

  if (!name && !email && !phone && !age && !password && !blood_group) {
    throw new ApiError(400, "atleast one fields is required")
  }

  const user = await Admin.findByIdAndUpdate(
    req.Admin?._id,
    {
      $set: {
        name,
        email: email,
        age,
        password,
        blood_group,
        phone
      }
    },
    { new: true }

  ).select("-password")

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Admin Account details updated successfully"))
});

const updateAdminAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  const user = await Admin.findById(req.Admin._id);


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

  const updatedUser = await Admin.findById(req.Admin._id).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Avatar image updated successfully"));
});

const updateCollegeCertificate = asyncHandler(async (req, res) => {
  const AICTEPath = req.files?.AICTE?.[0]?.path;
  const NAACPath = req.files?.NAAC?.[0]?.path;
  const NBAPath = req.files?.NBA?.[0]?.path;

  if (!AICTEPath && !NAACPath && !NBAPath) {
    throw new ApiError(400, "At least one certificate (AICTE, NAAC, NBA) is required");
  }

  const user = await Admin.findById(req.Admin._id);


  // if (user?.avatar?.public_id) {
  //   await cloudinary.uploader.destroy(user.avatar.public_id);
  //   console.log("old file delete");

  // }

  // ✅ Step 2: Upload new AICTE
  if (AICTEPath) {
    const AICTE = await uploadOnCloudinary(AICTEPath);
    if (!AICTE?.url) {
      throw new ApiError(400, "Error while uploading avatar");
    }
    // ✅ Step 3: Update DB with new AICTE info
    user.AICTE = {
      url: AICTE.url,
      public_id: AICTE.public_id,
    }
  }
  // ✅ Step 2: Upload new NAAC
  if (NAACPath) {
    const NAAC = await uploadOnCloudinary(NAACPath);
    if (!NAAC?.url) {
      throw new ApiError(400, "Error while uploading avatar");
    }
    // ✅ Step 3: Update DB with new NAAC info
    user.NAAC = {
      url: NAAC.url,
      public_id: NAAC.public_id,
    }
  }
  // ✅ Step 2: Upload new NBA
  if (NBAPath) {
    const NBA = await uploadOnCloudinary(NBAPath);
    if (!NBA?.url) {
      throw new ApiError(400, "Error while uploading avatar");
    }
    // ✅ Step 3: Update DB with new NBA info
    user.NBA = {
      url: NBA.url,
      public_id: NBA.public_id,
    }
  }

  await user.save();
  const updatedUser = await Admin.findById(req.Admin._id).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Certificates updated successfully"));

});



export {
  registerAdmin, loginAdmin, logoutAdmin, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateAdminAvatar
  , updateCollegeCertificate
}