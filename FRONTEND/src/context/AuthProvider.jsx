import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const AuthProvider = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true); // important

    const getMe = async () => {
        try {
            const res = await axios.get("http://localhost:9000/api/auth/me", {
                withCredentials: true,
            });

            if (res.status === 200) {
                setUserData(res.data.user); // make sure .user exists
            }
        } catch (err) {
            setUserData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMe();
    }, []);

    if (loading) {
        return <div style={{ color: "white" }}>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ userData, setUserData }}>
            {userData ? <Outlet /> : <Navigate to="/" replace />}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
