import { Router } from "express";
import {
    registerStudent,loginStudent,logoutStudent
} from "../controllers/student.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWTStudent } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "pre_equi_cert",
            maxCount: 1
        },
        {
            name: "prev_equi_rank_card",
            maxCount: 1
        },
        {
            name: "father_aadhar_card",
            maxCount: 1
        },
        {
            name: "sign_student",
            maxCount: 1
        },
        {
            name: "aadhar_card",
            maxCount: 1
        }
    ]),
    registerStudent
)

router.route("/login").post(loginStudent)
router.route("/logout").post(verifyJWTStudent, logoutStudent)
// router.route("/change-password").post(verifyJWT, changeCurrentPassword)
// router.route("/current-user").get(verifyJWT, getCurrentUser)
// router.route("/update-account").patch(verifyJWT, updateAccountDetails)
// router.route("/update-avatar").patch(verifyJWT, upload.single("avatar"), updateAdminAvatar)
// router.route("/update-college-certificate").patch(verifyJWT, upload.fields([
//     { name: "AICTE", maxCount: 1 },
//     { name: "NAAC", maxCount: 1 },
//     { name: "NBA", maxCount: 1 },
// ])
//     , updateCollegeCertificate)


export default router

