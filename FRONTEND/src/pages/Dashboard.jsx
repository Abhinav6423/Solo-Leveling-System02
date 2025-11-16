import React from "react";
import Sidebar from "../components/Sidebar";
import DashboardGrids from "../components/DashboardStatsCard/DashboardGrids";
import PlayerStats from "../components/DashboardStatsCard/PlayerStats";

const Dashboard = () => {
    return (
        <div
            className="relative h-screen w-full text-white  select-none "
            



        >

            {/* 🔹 Content Layer */}
            <div className="relative flex z-10 h-screen ">

                {/* Main Dashboard Area */}
                <main className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-transparent">
                    <div className="max-w-7xl mx-auto">
                        {/* Dashboard Stats Section */}
                        <DashboardGrids />

                        {/* Player Stats Section */}
                        <PlayerStats />

                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
