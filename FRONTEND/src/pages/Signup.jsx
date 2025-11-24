import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [errorMsg, setErrorMsg] = useState(""); // 🔥 popup message

    const navigate = useNavigate();

    const signup = async () => {
        try {
            const res = await axios.post(
                "http://localhost:9000/api/auth/register",
                { username, email, password, profilePic },
                { withCredentials: true }
            );

            if (res.data.success) {
                navigate("/home/dashboard");
            }

        } catch (err) {
            console.log("Axios error:", err);

            // Extract backend message
            const msg = err.response?.data?.message || errorData?.errors?.[0]?.msg || "Something went wrong";
            setErrorMsg(msg);

            // Auto-hide popup after 3 sec
            setTimeout(() => setErrorMsg(""), 3000);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signup();
    };

    return (
        <div
            className="flex h-screen text-white font-inter"
            style={{
                backgroundImage: `url('https://i.pinimg.com/1200x/23/20/89/23208915151ff56011e7bce46bb30f62.jpg')`,
                backgroundPosition: "right",
                backgroundSize: "cover",
            }}
        >
            {/* Left Side Image */}
            <div className="hidden md:flex w-1/2 bg-cover bg-center">
                <div className="bg-black/50 w-full h-full flex items-center justify-center"></div>
            </div>

            {/* Right Side Form */}
            <div className="w-full md:w-1/2 bg-slate-900/90 backdrop-blur-2xl flex flex-col justify-center px-8 md:px-20">

                {/* 🔥 Error Popup */}
                {errorMsg && (
                    <div className="mb-4 bg-red-500 text-white px-4 py-2 rounded-md text-center shadow-lg animate-pulse">
                        {errorMsg}
                    </div>
                )}

                <div className="flex justify-end mb-4">
                    <Link to={"/"}>
                        <button className="px-4 py-2 text-sm rounded-md bg-transparent text-gray-400 hover:text-white border border-gray-300">
                            Log in
                        </button>
                    </Link>
                    <Link to="/register">
                        <button className="px-4 py-2 text-sm rounded-md bg-white text-black font-semibold ml-2">
                            Sign up
                        </button>
                    </Link>
                </div>

                <div>
                    <h2 className="text-3xl font-semibold mb-2">Create Account</h2>
                    <p className="text-gray-400 mb-6">
                        Please enter details to create an account
                    </p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="User name*"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 bg-[#111C2E] border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                        />

                        <input
                            type="email"
                            placeholder="Email*"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-[#111C2E] border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                        />

                        <input
                            type="password"
                            placeholder="Password*"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-[#111C2E] border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                        />

                        <input
                            type="text"
                            placeholder="Enter Image Url"
                            value={profilePic}
                            onChange={(e) => setProfilePic(e.target.value)}
                            className="w-full p-3 bg-[#111C2E] border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                        />

                        <button
                            type="submit"
                            className="w-full bg-white text-black py-3 rounded-md font-semibold hover:bg-gray-200 transition"
                        >
                            Create account
                        </button>
                    </form>

                    <div className="my-4 text-center text-gray-400">OR</div>

                    <button className="w-full flex items-center justify-center space-x-2 border border-gray-600 py-3 rounded-md hover:bg-[#111C2E] transition">
                        <img
                            src="https://www.svgrepo.com/show/355037/google.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        <span>Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
