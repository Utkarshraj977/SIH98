import { Router } from "express";
import {preReg_teacher ,TeacherReg,loginTeacher,logoutTeacher,changeCurrentPassword,
    updateAccountDetails,updateAdminAvatar
} from "../controllers/teacher.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT3 } from "../middlewares/auth.middleware.js";

const router = Router()
router.route("/preregistor").post(preReg_teacher);
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "certificate",
            maxCount: 1
        }
    ]),
    TeacherReg
)

router.route("/login").post(loginTeacher)
router.route("/logout").post(verifyJWT3, logoutTeacher)
router.route("/change-password").post(verifyJWT3, changeCurrentPassword)
router.route("/update-account").patch(verifyJWT3, updateAccountDetails)
router.route("/update-avatar").patch(verifyJWT3, upload.single("avatar"), updateAdminAvatar)
export default router

