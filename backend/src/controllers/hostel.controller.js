import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Admin } from "../models/Admin.model.js";
import { Hostel } from "../models/hostel.model.js";


const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await Hostel.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }


  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating referesh and access token")
  }
}

const preReg_hostel = asyncHandler(async (req, res) => {
  let { hostel } = req.body;

  console.log("Incoming Code:", hostel);

  const allAdmins = await Admin.find();
  console.log("All Admin Records:", JSON.stringify(allAdmins, null, 2));

  const findAdministorOfficer = await Admin.findOne({
    "staff_selection_id.hostel": hostel
  }).select("-password -refreshToken");

  console.log("Matched Officer:", findAdministorOfficer);

  if (!findAdministorOfficer) {
    throw new ApiError(404, "No hostel Officer found with this code");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "hostel is fetched successfully"
    )
  );
});

const hostelReg = asyncHandler(async (req, res) => {
  const { name, email, phone, collegeCode, address, password,total_vacent,total_room,age,state,gender,collegeName} = req.body;


  if (
    [name, email, phone, collegeCode, address, password,total_vacent,total_room,age,state,gender,collegeName].some(
      (field) => typeof field !== "string" || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields must be non-empty strings");
  }

  const existedAdmin = await Hostel.findOne({
    $or: [ { email }, { phone }],
  });
  if (existedAdmin) {
    throw new ApiError(409, "Hostel with email or phone already exists");
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

  const aadhar_cardImagePath = req.files?.aadhar_card?.[0]?.path;
  if (!aadhar_cardImagePath) {
    throw new ApiError(400, "aadhar_card file is required");
  }
  const aadhar_card = await uploadOnCloudinary(aadhar_cardImagePath);
  if (!aadhar_card) {
    throw new ApiError(400, "aadhar_card upload failed");
  }

  // Admin create
  const created = await Hostel.create({
  name, email, phone, collegeCode, address, password,total_vacent,total_room,age,state,gender,collegeName,
    avatar: {
      url: avatar?.url || "",
      public_id: avatar?.public_id || "",
    },
    aadhar_card: {
      url: aadhar_card?.url || "",
      public_id: aadhar_card?.public_id || "",
    }
  });

  // Remove password & refreshToken
  const ccreatHostel = await Hostel.findById(created._id)
    .select("-password")
  if (!ccreatHostel) {
    throw new ApiError(500, "Something went wrong while registering the Hostel");
  }
  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        ccreatHostel,
        "Hostel registered successfully"
      )
    );
});

const loginHostel = asyncHandler(async (req, res) => {

  const { email, password } = req.body

  if ( !email && !password) {
    throw new ApiError(400, "password or email is required")
  }

  const user = await Hostel.findOne({
    $or: [{ password }, { email }]
  })

  if (!user) {
    throw new ApiError(404, "Hostelofficer does not exist")
  }

  const isPasswordValid = await user.isPasswordCorrect(password)

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Hostel credentials")
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

  const loggedInUser = await Hostel.findById(user._id).select("-password -refreshToken -accessToken")

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
        "Hostel logged In Successfully"
      )
    )

})

const logoutHostel = asyncHandler(async (req, res) => {
  await Hostel.findByIdAndUpdate(
    req.Hostel._id,
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
    .json(new ApiResponse(200, {}, "Hostel logged Out"))
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body

  const user = await Hostel.findById(req.Hostel?._id)
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
            req.Hostel,
            "Hostel User fetched successfully"
        ))
})

const getCurrentUserPara = asyncHandler(async (req, res) => {
    const id =req.params.id;
    if(!id){
        throw new ApiError(400, "id is not found");
    }
    const currentTeacher = await Hostel.find({_id : id })
    if(!currentHostel) {
        throw new ApiError(400, "currentHostel is not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            currentHostel,
            "Hostel User fetched successfully"
        ))
})

export{preReg_hostel,hostelReg,loginHostel,logoutHostel,changeCurrentPassword,getCurrentUser,getCurrentUserPara}