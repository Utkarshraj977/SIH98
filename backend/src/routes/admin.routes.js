import { Router } from "express";
import {
    registerAdmin, loginAdmin, logoutAdmin, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateAdminAvatar
    , updateCollegeCertificate
} from "../controllers/admin.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "collegeImage",
            maxCount: 1
        },
        {
            name: "AICTE",
            maxCount: 1
        },
        {
            name: "NAAC",
            maxCount: 1
        },
        {
            name: "NBA",
            maxCount: 1
        },
        {
            name: "aadhar_card",
            maxCount: 1
        }
    ]),
    registerAdmin
)

router.route("/login").post(loginAdmin)
router.route("/logout").post(verifyJWT, logoutAdmin)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)
router.route("/update-avatar").patch(verifyJWT, upload.single("avatar"), updateAdminAvatar)
router.route("/update-college-certificate").patch(verifyJWT, upload.fields([
    { name: "AICTE", maxCount: 1 },
    { name: "NAAC", maxCount: 1 },
    { name: "NBA", maxCount: 1 },
]) , updateCollegeCertificate )

export default router


