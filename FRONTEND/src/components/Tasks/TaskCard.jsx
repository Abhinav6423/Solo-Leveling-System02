import React from "react";
import { MoreVertical } from "lucide-react";

const TaskCard = ({ onViewSubTasks }) => {
    return (
        <div className="relative w-full max-w-sm sm:max-w-md bg-transparent  hover:border-cyan-400/70  p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] backdrop-blur-sm overflow-hidden min-h-[320px]">

            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <div className="flex flex-col">
                    <span className="text-[0.8rem] tracking-widest font-semibold text-white mb-5 bg-blue-950 w-fit px-2 py-1">
                        TASK 1
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                        Revise DBMS Unit 3
                    </h3>
                </div>

                <button className="text-gray-400 hover:text-cyan-400 transition">
                    <MoreVertical size={18} />
                </button>
            </div>

            <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                Complete a hands-on exercise in SQL or NoSQL database queries.
            </p>

            <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                    <span className="font-medium">Priority:</span>
                    <span className="text-red-600 text-xs font-semibold px-2 py-0.5 rounded-md shadow-[0_0_10px_rgba(239,68,68,0.9)]">
                        High
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="font-medium">XP:</span>
                    <span className="text-cyan-300 font-semibold">30 XP</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="font-medium">Sub Task:</span>
                    <span className="text-gray-200">Yes</span>
                </div>
            </div>

            {/* View Subtasks Button */}
            <div className="mt-4">
                <button
                    onClick={onViewSubTasks}
                    className="w-full text-sm font-semibold border border-cyan-400/50 text-cyan-300 rounded-md py-1.5 hover:bg-cyan-400/10 transition"
                >
                    View Subtasks
                </button>
            </div>

            <p className="text-xs text-gray-400 mt-2 text-right">
                Time remaining: <span className="text-red-400">00:36:18</span>
            </p>
        </div>
    );
};

export default TaskCard;
