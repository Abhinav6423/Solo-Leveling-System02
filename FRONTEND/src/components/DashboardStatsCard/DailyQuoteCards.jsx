import React from "react";

const DailyQuoteCard = () => {
    const today = new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    return (
        <div className="bg-transparent border-2 border-blue-400 rounded-lg rounded-l-2xl p-5 w-full max-w-full shadow-xl text-white backdrop-blur-lg hover:scale-[1.02] transition-all duration-300">

            {/* Header */}
            <div className="flex justify-between items-center border-b border-[#1e2b45] pb-2 mb-3">
                <h2 className="text-sm sm:text-xl font-semibold tracking-wide text-gray-200">
                    Daily Quote
                </h2>
                <p className="text-xs sm:text-lg font-semibold text-gray-400">
                    {today}
                </p>
            </div>

            {/* Quote */}
            <div className="bg-[#1e3055] border border-[#1e2b45] rounded-lg p-3 sm:p-4 mt-8">
                <p className="text-gray-300 text-sm sm:text-lg font-medium italic leading-relaxed">
                    “The surest way to achieve your vision is to work on it, one dedicated step at a time.”
                </p>
            </div>
        </div>
    );
};

export default DailyQuoteCard;
