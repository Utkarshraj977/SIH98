import { Router } from "express";
import {
    registerStudent,loginStudent,logoutStudent,getCurrentUser,getlatestmess,changeCurrentPassword,updateStudentAvatar,
    allAdmittedStudent,allUnAdmittedStudent,allStudentBysem,allStudentBycourse,allDeptStudent
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
router.route("/change-password").post(verifyJWTStudent, changeCurrentPassword)

router.route("/current-user").get(verifyJWTStudent, getCurrentUser)
router.route("/getlatestmess").get(verifyJWTStudent, getlatestmess)
router.route("/allAdmittedStudent").get(verifyJWTStudent, allAdmittedStudent)
router.route("/allUnAdmittedStudent").get(verifyJWTStudent, allUnAdmittedStudent)
router.route("/allUnAdmittedStudent").get(verifyJWTStudent, allUnAdmittedStudent)

router.route("/allStudentBysem/:sem").get(verifyJWTStudent, allStudentBysem)
router.route("/allStudentBycourse/:course").get(verifyJWTStudent, allStudentBycourse)
router.route("/allDeptStudent/:dept").get(verifyJWTStudent, allDeptStudent)

router.route("/update-avatar").patch(verifyJWTStudent, upload.single("avatar"), updateStudentAvatar)


export default router


