import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import CreatePost from "../pages/CreatePost.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../pages/Home.jsx";
import PostById from "../pages/PostById.jsx";
import NotFound from "../components/NotFound.jsx";

export default createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: "/posts/create",
                element: <CreatePost/>
            },
            {
                path: "/posts/:id",
                element: <PostById/>,
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "*",
        element: <NotFound/>
    },
])