import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/Admin.model.js";
import { Fee_section } from "../models/feeSection.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await Fee_section.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }


  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating referesh and access token")
  }
}

const preReg_feeAdmin = asyncHandler(async (req, res) => {
  let { fee_section } = req.body;

  console.log("Incoming Code:", fee_section);

  const allAdmins = await Admin.find();
  console.log("All Admin Records:", JSON.stringify(allAdmins, null, 2));

  const findAdministorOfficer = await Admin.findOne({
    "staff_selection_id.fee_section": fee_section
  }).select("-password -refreshToken");

  console.log("Matched Officer:", findAdministorOfficer);

  if (!findAdministorOfficer) {
    throw new ApiError(404, "No Administrative Officer found with this code");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "fee_section is fetched successfully"
    )
  );
});

const feeAdmin = asyncHandler(async (req, res) => {
  const { name, email, phone, collegeCode, address, experience, password } = req.body;


  if (
    [name, email, phone, collegeCode, address, experience, password].some(
      (field) => typeof field !== "string" || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields must be non-empty strings");
  }

  const existedAdmin = await Fee_section.findOne({
    $or: [ { email }, { phone }],
  });
  if (existedAdmin) {
    throw new ApiError(409, "Fee_section with email or phone already exists");
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
  const created = await Fee_section.create({
  name, email, phone, collegeCode, address, experience, password,
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
  const ccreatFee_section = await Fee_section.findById(created._id)
    .select("-password")
  if (!ccreatFee_section) {
    throw new ApiError(500, "Something went wrong while registering the Fee_section");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        ccreatFee_section,
        "AdministrativeOfficer registered successfully"
      )
    );
});

const loginfeeAdmin = asyncHandler(async (req, res) => {

  const { email, password } = req.body

  if ( !email && !password) {
    throw new ApiError(400, "username or email is required")
  }

  const user = await Fee_section.findOne({
    $or: [{ password }, { email }]
  })

  if (!user) {
    throw new ApiError(404, "Fee_section does not exist")
  }

  const isPasswordValid = await user.isPasswordCorrect(password)

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Fee_section credentials")
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

  const loggedInUser = await Fee_section.findById(user._id).select("-password -refreshToken -accessToken")

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
        "Fee_section logged In Successfully"
      )
    )

})

const logoutFeeAdmin = asyncHandler(async (req, res) => {
  await Fee_section.findByIdAndUpdate(
    req.Fee_section._id,
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



  const user = await Fee_section.findById(req.Fee_section?._id)
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
  const { name, email, phone, collegeCode, address, experience } = req.body

  if (!name && !email && !phone && !experience && !address && !collegeCode ) {
    throw new ApiError(400, "atleast one fields is required")
  }

  const user = await Fee_section.findByIdAndUpdate(
    req.Fee_section?._id,
    {
      $set: {
        name, email, phone, collegeCode, address, experience
      }
    },
    { new: true }

  ).select("-password")

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Fee_section Account details updated successfully"))
});

const updateAdminAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  const user = await Fee_section.findById(req.Fee_section._id);


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

  const updatedUser = await Fee_section.findById(req.Fee_section._id).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Avatar image updated successfully"));
});


export{preReg_feeAdmin,feeAdmin,loginfeeAdmin,logoutFeeAdmin,changeCurrentPassword,updateAccountDetails,updateAdminAvatar}