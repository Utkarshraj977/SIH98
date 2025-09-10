import { Router } from "express";
import {preReg_hostel ,hostelReg,loginHostel,logoutHostel,changeCurrentPassword,getCurrentUser,getCurrentUserPara
} from "../controllers/hostel.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT4 } from "../middlewares/auth.middleware.js";

const router = Router()
router.route("/preregistor").post(preReg_hostel);
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "aadhar_card",
            maxCount: 1
        }
    ]),
    hostelReg
)

router.route("/login").post(loginHostel)
router.route("/logout").post(verifyJWT4, logoutHostel)
router.route("/change-password").post(verifyJWT4, changeCurrentPassword)
// router.route("/update-account").patch(verifyJWT4, updateAccountDetails)
// router.route("/update-avatar").patch(verifyJWT3, upload.single("avatar"), updateAdminAvatar)
// router.route("/getlatestmess").get(verifyJWT4, getlatestmess)
router.route("/getteacherByID").get(verifyJWT4, getCurrentUser)
router.route("/getteacherByParms/:id").get(verifyJWT4, getCurrentUserPara)
export default router

