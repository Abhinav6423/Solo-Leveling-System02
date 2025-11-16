import React from "react";
import { Flame } from "lucide-react"; // flame icon (you can install lucide-react if not already)

const DailyStreakCard = () => {
    return (
        <div className="bg-transparent  border-2 border-blue-400 rounded-lg  rounded-r-2xl p-5 h-full max-h-[250px] max-w-full shadow-xl text-white backdrop-blur-lg hover:scale-[1.02] transition-all duration-300">
            {/* Header */}
            <div className="border-b border-[#1e2b45] pb-2 mb-4 flex justify-between items-center">
                <h2 className="text-sm inter sm:text-xl font-semibold tracking-wide text-gray-200">
                    Daily Streak
                </h2>
            </div>

            {/* Main Streak Info */}
            <div className="flex items-center justify-between px-2">
                {/* Circle Streak Count */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-dashed border-blue-500 flex flex-col items-center justify-center text-center shadow-[0_0_10px_#3b82f6]">
                    <span className="text-2xl sm:text-4xl font-bold text-white">42</span>
                    <span className="text-xs sm:text-sm text-gray-400">Days</span>
                </div>

                {/* Weekday Flames */}
                <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => (
                            <div key={day} className="flex flex-col items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${idx < 5
                                            ? "bg-blue-500/20 text-blue-400 border border-blue-500 shadow-[0_0_10px_#3b82f6]"
                                            : "bg-transparent text-gray-600 border border-gray-700"
                                        }`}
                                >
                                    <Flame
                                        className={`w-4 h-4 ${idx < 5 ? "text-blue-400" : "text-gray-500"
                                            }`}
                                    />
                                </div>
                                <p
                                    className={`text-[10px] mt-1 ${idx < 5 ? "text-gray-300" : "text-gray-600"
                                        }`}
                                >
                                    {day}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Info */}
            <div className="flex justify-between text-xs sm:text-sm text-gray-400 mt-4 border-t border-[#1e2b45] pt-2">
                <p>
                    Longest streak:{" "}
                    <span className="text-gray-200 font-bold text-lg">64 Days</span>
                </p>
                <p>
                    Last login:{" "}
                    <span className="text-gray-200 font-bold text-lg">
                        12th October, 2025
                    </span>
                </p>
            </div>
        </div>
    );
};

export default DailyStreakCard;
