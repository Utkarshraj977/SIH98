import { createBrowserRouter } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import Home from "../pages/Home";
import Layout from "../Layout/Layout";
import About from "../pages/About/About";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact/Contact";

import Register from "../pages/register/Register";
import Login from "../pages/register/Login";

import AdminDashboard from "../pages/AdminDashBoard/AdminDashBoard";
const Router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {   index:true,
                path: "/",
                element: <Home/>
            },
            {
                path: "about",
                element: <About/>
            },
            {
                path: "contact",
                element: <Contact/>
            },
            // {
            //     path: "signup",
            //     element: <Signup/>
            // },
            {
                path: "admin-register",
                element: <Register/>
            },
             {
                path: "admin-login",
                element: <Login/>
            },
            {
                path: "admin-dash",
                element: (
                      <AdminRoute>
                         <AdminDashboard/>
                      </AdminRoute>
                )
            },
        ]
    }
])


export default Router;