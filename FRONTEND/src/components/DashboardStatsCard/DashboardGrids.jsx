import React from "react";
import ProfileCard from "./ProfileCards.jsx";
import DailyQuoteCard from "./DailyQuoteCards.jsx";
import StreakCard from "./StreakCards.jsx";
import LevelTrackerCard from "./LevelTrackerCards.jsx";

const DashboardGrids = () => {
    return (
        <div className="w-full max-w-7xl  p-3 select-none">
            {/* Top row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <StreakCard />
                <DailyQuoteCard />
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProfileCard />
                <LevelTrackerCard />
            </div>
        </div>
    );
};

export default DashboardGrids;
