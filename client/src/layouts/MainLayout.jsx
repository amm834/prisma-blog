import React from 'react';
import {Outlet} from "react-router-dom";
import AppFooter from "../components/AppFooter.jsx";
import AppNavbar from "../components/AppNavbar.jsx";

const MainLayout = () => {
    return (
        <>
            <AppNavbar/>
            <Outlet/>
            <AppFooter/>
        </>
    );
};

export default MainLayout;