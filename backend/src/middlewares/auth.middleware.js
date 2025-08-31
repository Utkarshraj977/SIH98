import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { Admin } from "../models/Admin.model.js";
import { Student } from "../models/Student.model.js";

import { Administrative } from "../models/Administrative.models.js";
import { Fee_section } from "../models/feeSection.model.js";
// import { Fee_section } from "../models/feeSection.model.js";
export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const Adminn = await Admin.findById(decodedToken?._id).select("-password -refreshToken")

        if (!Adminn) {

            throw new ApiError(401, "Invalid Access Token")
        }

        req.Admin = Adminn;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }

})

export const verifyJWTStudent = asyncHandler(async (req, _, next) => {
    try {
        // Get token from cookie or Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        // Verify token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Check if student exists
        const student = await Student.findById(decodedToken?._id).select("-password -refreshToken");

        if (!student) {
            // Optionally check for administrative user
            const admin = await Administrative.findById(decodedToken?._id).select("-password -refreshToken");

            if (!admin) {
                throw new ApiError(401, "Invalid Access Token");
            }

            req.Administrative = admin;
        } else {
            req.Student = student;
        }

        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

export const verifyJWT2 = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const Adminn = await Fee_section.findById(decodedToken?._id).select("-password -refreshToken")

        if (!Adminn) {

            throw new ApiError(401, "Invalid Access Token")
        }

        req.Fee_section = Adminn;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }

})
