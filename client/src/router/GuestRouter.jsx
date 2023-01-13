import React from 'react';
import {Navigate,} from "react-router-dom";
import {useAtom} from "jotai";
import {userAtomWithPersistence} from "../store/userAtom.js";

// allow guest to access to the login and register page
//  redirect to home if user is logged in
const GuestRouter = ({children}) => {
    const [user] = useAtom(userAtomWithPersistence)

    if (!user?.id) {
        return children
    }

    return <Navigate to="/"/>
}

export default GuestRouter;