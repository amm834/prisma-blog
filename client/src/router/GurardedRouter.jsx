import React from 'react';
import {Navigate,} from "react-router-dom";
import {useAtom} from "jotai";
import {userAtomWithPersistence} from "../store/userAtom.js";

const GuardedRouter = ({children}) => {
    const [user] = useAtom(userAtomWithPersistence)

    if (!user?.id) {
        return <Navigate to="/login"/>
    }

    return children;
}

export default GuardedRouter;