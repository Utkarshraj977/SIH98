import { Router } from "express";
import {preReg_feeAdmin,feeAdmin,loginfeeAdmin,logoutFeeAdmin,changeCurrentPassword,updateAccountDetails,updateAdminAvatar
} from "../controllers/feeadmin.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT2 } from "../middlewares/auth.middleware.js";

const router = Router()
router.route("/preregistor").post(preReg_feeAdmin);
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
    feeAdmin
)

router.route("/login").post(loginfeeAdmin)
router.route("/logout").post(verifyJWT2, logoutFeeAdmin)
router.route("/change-password").post(verifyJWT2, changeCurrentPassword)
router.route("/update-account").patch(verifyJWT2, updateAccountDetails)
router.route("/update-avatar").patch(verifyJWT2, upload.single("avatar"), updateAdminAvatar)
export default router

