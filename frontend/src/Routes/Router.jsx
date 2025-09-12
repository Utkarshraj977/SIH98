import { createBrowserRouter } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import Home from "../pages/Home";
import Layout from "../Layout/Layout";
import About from "../pages/About/About";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact/Contact";

import Register from "../pages/register/Register";
import Login from "../pages/register/Login";

import AdministratorLogin from "../pages/Adminstrator/AdministrtorLogin";

import Registration from "../pages/Adminstrator/Registration";
import AdminDashboard from "../pages/AdminDashBoard/AdminDashBoard";
import StudentDashboard from "../pages/StudentDashboard/StudentDashboard";
import StudentRegister from "../pages/StudentDashboard/StudentRegister";
import StudentLogin from "../pages/StudentDashboard/StudentLogin";
import Staff from "../pages/Staff/Staff";

import TeacherDashboard from "../pages/Teacher/TeacherDashboard";
import TeacherLogin from "../pages/Teacher/TeacherLogin";
import TeacherRegister from "../pages/Teacher/TeacherRegister";

import FeeDashboard from "../pages/fee_section/FeeDashboard";





const Router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                path: "/",
                element: <Home />
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "contact",
                element: <Contact />
            },
            // {
            //     path: "signup",
            //     element: <Signup/>
            // },
            {
                path: "admin-register",
                element: <Register />
            },
            {
                path: "admin-login",
                element: <Login />
            },
            {
                path: "admin-dash",
                element: (
                   
                        <AdminDashboard />
                   
                )
            },

            {
                path: "student-register",
                element: <StudentRegister />,
            },

             {
                path: "student-login",
                element: <StudentLogin />,
            },

            {
                path: "student-dash",
                element: <StudentDashboard />
            },
            {
                path: "staff",
                element: <Staff />
            },
            {
                path: "teacher-dash",
                element: <TeacherDashboard />
            },

            {
                path: "teacher-reg",
                element: <TeacherRegister />
            },
            {
                path: "teacher-login",
                element: <TeacherLogin />
            },


            {
                path: "administrator-reg",
                element: <Registration />
            },
            {
                path: "administrator-login",
                element: <AdministratorLogin />
            },
            
            {
                path: "fee-dash",
                element: <FeeDashboard />
            }

        ]
    }
])


export default Router;