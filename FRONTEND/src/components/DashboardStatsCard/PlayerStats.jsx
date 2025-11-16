import React from "react";

const PlayerStats = () => {
  const stats = [
    { label: "Total XP Earned", value: "2471XP" },
    { label: "Leaderboard Position", value: "157th" },
    { label: "Rank Tier", value: "S Rank", color: "text-red-400" },
    { label: "Completed Tasks", value: "192" },
  ];

  return (
    <div className="bg-transparent border-2 border-cyan-500 rounded-2xl p-10 backdrop-blur-md shadow-[0_0_15px_rgba(0,255,255,0.2)] mt-8">
      <h3 className="text-lg font-semibold text-cyan-300 mb-6">Player Stats</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {stats.map((stat, idx) => (
            // stats single  card ui 
          <div
            key={idx}
            className="p-4 border border-cyan-400 rounded-sm bg-[#0C1C34]/50 hover:border-cyan-400/50 transition-all duration-300"
          >
            <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
            <p
              className={`text-sm tracking-wide font-medium ${
                stat.color ? stat.color : "text-gray-400"
              }`}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerStats;
