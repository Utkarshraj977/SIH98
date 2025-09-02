import { Router } from "express";
import {preReg_Administrativeofficer,administrativeOfficer,loginAdministrativeofficer,logoutAdministrativeofficer,
    changeCurrentPassword,updateAccountDetails,updateAdminAvatar,verifyStudent
} from "../controllers/administrativeOfficer.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT,verifyJWT1 } from "../middlewares/auth.middleware.js";


const router = Router()
router.route("/preregistor").post(preReg_Administrativeofficer)
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
    administrativeOfficer
)

router.route("/login").post(loginAdministrativeofficer)
router.route("/logout").post(verifyJWT1, logoutAdministrativeofficer)
router.route("/change-password").post(verifyJWT1, changeCurrentPassword)
router.route("/update-account").patch(verifyJWT1, updateAccountDetails)
router.route("/update-avatar").patch(verifyJWT1, upload.single("avatar"), updateAdminAvatar)
router.route("/verifyStudent").post(verifyJWT1, verifyStudent)

export default router

