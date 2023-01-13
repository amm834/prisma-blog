import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import CreatePost from "../pages/CreatePost.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../pages/Home.jsx";
import PostById from "../pages/PostById.jsx";
import NotFound from "../components/NotFound.jsx";
import GuardedRouter from "./GurardedRouter.jsx";
import {useAtom} from "jotai";
import {userAtomWithPersistence} from "../store/userAtom.js";
import GuestRouter from "./GuestRouter.jsx";


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
                element: <GuardedRouter><CreatePost/></GuardedRouter>
            },
            {
                path: "/posts/:id",
                element: <PostById/>,
            }
        ]
    },
    {
        path: "/login",
        element: <GuestRouter> <Login/></GuestRouter>
    },
    {
        path: "/register",
        element: <GuestRouter><Register/></GuestRouter>
    },
    {
        path: "*",
        element: <NotFound/>,
    },
])