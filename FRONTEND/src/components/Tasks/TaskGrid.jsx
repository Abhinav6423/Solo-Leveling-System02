import React from "react";
import TaskCard from "./TaskCard";

const ViewTasks = () => {
    return (
        <div className="p-6 sm:p-1">
            <h2 className="text-3xl font-semibold text-white mb-8 bg-gradient-to-r from-cyan-300 to-blue-500  bg-clip-text">
                View Tasks
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 ">
                {Array.from({ length: 8 }).map((_, idx) => (
                    <TaskCard key={idx} />
                ))}
            </div>
        </div>
    );
};

export default ViewTasks;
