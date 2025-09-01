import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../Layout/Layout";
import About from "../pages/About/About";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact/Contact";

import Register from "../pages/register/Register";

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
                path: "register",
                element: <Register/>
            },
        ]
    }
])


export default Router;