import React from "react";
import { useAuth } from "../../context/AuthContext";

const ProfileCard = () => {
    const { userData } = useAuth();
    return (
        <div className="h-full max-h-[200px] bg-transparent border-2 border-blue-400 rounded-lg  rounded-r-2xl p-5 max-w-full shadow-[0_4px_30px_rgba(0,0,0,0.5)] text-white backdrop-blur-xl hover:scale-[1.02] transition-all duration-300">
            {/* Top section */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 ">
                    <img
                        src={userData?.profilePic}
                        alt="avatar"
                        className="w-17 h-17 p-1 rounded-full border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)] object-cover"
                    />
                    <div>
                        <h2 className="font-semibold text-xl tracking-wide drop-shadow-md">{userData?.username}</h2>
                        <p className="text-red-400 font-semibold text-lg drop-shadow-sm">{userData?.rank}</p>
                    </div>
                </div>
                <p className="text-lg text-gray-300 font-semibold drop-shadow-sm">
                    Level <span className="text-blue-400 font-extrabold">{userData?.level}</span>
                </p>
            </div>

            {/* XP Bar */}
            {/* XP Bar */}
            <div className="mt-10">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>{userData?.xp} XP</span>
                    <span>{userData?.totalXp} XP</span>
                </div>

                <div className="relative w-full h-3 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden backdrop-blur-sm">
                    <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#3b82f6] via-[#06b6d4] to-[#67e8f9] rounded-full shadow-[0_0_20px_6px_rgba(59,130,246,0.6)] animate-glow"
                        style={{
                            width: `${Math.min(
                                Math.round((userData?.xp / userData?.totalXp) * 100),
                                100
                            )}%`
                        }}
                    ></div>
                </div>

                <p className="text-center text-xs text-gray-400 mt-1">
                    {userData?.xp} / {userData?.totalXp} XP
                </p>
            </div>

        </div>
    );
};

export default ProfileCard;
