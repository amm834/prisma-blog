import React from 'react';
import {Outlet} from "react-router-dom";
import AppFooter from "../components/AppFooter.jsx";
import AppNavbar from "../components/AppNavbar.jsx";

const MainLayout = () => {
    return (
        <>
            <AppNavbar/>
            <main className="container mx-auto mt-12 px-8">
                <Outlet/>
            </main>
            <AppFooter/>
        </>
    );
};

export default MainLayout;