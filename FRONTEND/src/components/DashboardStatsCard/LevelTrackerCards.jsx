import React from "react";

const LevelTrackerCard = () => {
    return (
        <div className=" bg-transparent h-full max-h-[200px]  border-2 border-blue-400 rounded-lg  rounded-l-2xl p-5 max-w-full shadow-xl text-white backdrop-blur-lg hover:scale-[1.02] transition-all duration-300">
            {/* Header */}
            <h2 className="text-xl sm:text-xl font-semibold text-gray-200 mb-4">
                Level Tracker
            </h2>

            {/* Level Range */}
            <div className="flex justify-between text-lg sm:text-lg text-gray-400 mb-2 font-semibold mt-7">
                <span>99 Level</span>
                <span>100 Level</span>
            </div>

            {/* Progress Bar */}
            <div className="relative w-full h-3 bg-[#1a2438] rounded-full overflow-hidden ">
                <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-[0_0_10px_#3b82f6]"
                    style={{ width: "28%" }} // Dynamic progress percentage
                ></div>
            </div>

            {/* Percentage Label */}
            <p className="text-center text-md font-medium text-gray-400 mt-1">28%</p>
        </div>
    );
};

export default LevelTrackerCard;
