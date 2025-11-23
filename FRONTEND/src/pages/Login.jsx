import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const navigate = useNavigate();

    const login = async () => {
        try {
            const res = await axios.post(
                "http://localhost:9000/api/auth/login",
                { email, password },
                { withCredentials: true }
            );

            console.log(res.data.user);
            navigate("/home/dashboard");

        } catch (err) {
            console.log("Axios error:");
            console.log(err.message);
            console.log(err.response?.status);
            console.log(err.response?.data);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault()
        login();

    }


    return (
        <div className="flex h-screen text-white"
            style={{
                backgroundImage: "url('https://i.pinimg.com/1200x/23/20/89/23208915151ff56011e7bce46bb30f62.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
            {/* Left Side - Image */}
            <div
                className="w-1/2 bg-cover bg-center"

            >
                <div className="h-full w-full bg-black/60 flex items-center justify-center">
                    <h1 className="text-3xl font-semibold tracking-widest opacity-80">
                        {/* Optional text/logo can go here */}
                    </h1>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-1/2 bg-slate-900/90 backdrop-blur-lg flex flex-col justify-center items-center px-10">
                <div className="max-w-md w-full">
                    {/* Toggle Buttons */}
                    <div className="flex justify-center mb-6 space-x-2">
                        <button className="px-6 py-2 bg-white text-black rounded-lg font-semibold shadow-md hover:bg-gray-200 transition">
                            Log in
                        </button>
                        <Link to={"/register"}>
                            <button className="px-6 py-2 border border-gray-400 rounded-lg font-semibold hover:bg-gray-800 transition">
                                Sign up
                            </button>
                        </Link>
                    </div>

                    <h2 className="text-3xl font-semibold mb-2 text-center">
                        Welcome Back
                    </h2>
                    <p className="text-gray-400 mb-8 text-center">
                        Please enter details to log into your account
                    </p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Email*</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">Password*</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-white text-black font-semibold py-2 rounded-md hover:bg-gray-200 transition">
                            Log in
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-grow h-px bg-gray-700" />
                        <span className="px-3 text-gray-400 text-sm">OR</span>
                        <div className="flex-grow h-px bg-gray-700" />
                    </div>

                    {/* Google Login */}
                    <button className="w-full flex items-center justify-center gap-2 border border-gray-600 py-2 rounded-md hover:bg-gray-800 transition">
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        <span>Google</span>
                    </button>

                </div>
            </div>
        </div>
    );
}
