import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())

import adminRouter from './routes/admin.routes.js'
import  studentRouter  from "./routes/student.routes.js"
import administrativeOfficer from './routes/administrativeOfficer.routes.js'
import feeSection from './routes/feeSection.routes.js'
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/administrativeOfficer", administrativeOfficer)
app.use("/api/v1/feeSection", feeSection)

app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/student",studentRouter)
export {app}
