import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";

import { Navigate } from "react-router-dom";
axios.defaults.withCredentials = true;

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(undefined);
    // undefined = loading
    // null = not logged in
    // object = logged in

    const getMe = async () => {
        try {
            const res = await axios.get("http://localhost:9000/api/auth/me", {
                withCredentials: true,
            });
            setUserData(res.data.user);
        } catch (err) {
            setUserData(null);
        }
    };

    useEffect(() => {
        getMe();
    }, []);

    // debug: see WHEN userData updates
    useEffect(() => {
        console.log("UPDATED userData:", userData);
    }, [userData]);



    return (
        <AuthContext.Provider value={{ userData, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
