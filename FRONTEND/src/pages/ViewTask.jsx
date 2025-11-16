import React, { useState } from "react";
import TaskCard from "../components/Tasks/TaskCard";
import { ChevronDown, X } from "lucide-react";
import { MoreVertical } from "lucide-react";

const ViewTask = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [viewType, setViewType] = useState("Task");
    const [status, setStatus] = useState("Pending");
    const [priority, setPriority] = useState("High");
    const [xp, setXp] = useState(30);

    const handleClick = (e) => e.stopPropagation();

    const btnClass = (isActive) =>
        `flex-1 rounded-md py-1 border transition text-sm ${isActive
            ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 hover:bg-cyan-500/30"
            : "bg-transparent border-gray-700 text-gray-400 hover:border-gray-500"
        }`;

    // Dummy subtasks
    const subTasks = Array.from({ length: 10 }).map((_, i) => ({
        id: i + 1,
        title: `Sub Task ${i + 1}`,
        desc: "Complete a hands-on exercise in SQL or NoSQL database queries",
        priority: "Medium",
    }));

    return (
        <div className="p-6 sm:p-4 mt-5 relative select-none">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-semibold text-white bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text ">
                    View All Tasks
                </h2>

                {/* Filter Button */}
                <div className="relative">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();  // prevents click event from bubbling up (important for dropdowns!).  
                            setFilterOpen((prev) => !prev);
                        }}
                        className="flex items-center space-x-2 px-4 py-2 bg-[#0B1426] border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:border-cyan-400 transition"
                    >
                        <span>Filter</span>
                        <ChevronDown
                            className={`w-4 h-4 transition ${filterOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {/* Filter Dropdown */}
                    {filterOpen && (
                        <div
                            onClick={handleClick}
                            className="absolute right-0 mt-2 w-64 bg-[#0F172A] border border-cyan-500/30 rounded-xl shadow-lg p-4 backdrop-blur-md z-50"
                        >
                            {/* Filter Options */}
                            <div className="mb-4">
                                <p className="text-sm text-gray-400 mb-2">Only view</p>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setViewType("Task")}
                                        className={btnClass(viewType === "Task")}
                                    >
                                        Task
                                    </button>
                                    <button
                                        onClick={() => setViewType("Sub Task")}
                                        className={btnClass(viewType === "Sub Task")}
                                    >
                                        Sub Task
                                    </button>
                                </div>
                            </div>

                            {/* Task Status */}
                            <div className="mb-4">
                                <p className="text-sm text-gray-400 mb-2">
                                    Only view tasks that are
                                </p>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setStatus("Pending")}
                                        className={btnClass(status === "Pending")}
                                    >
                                        Pending
                                    </button>
                                    <button
                                        onClick={() => setStatus("Completed")}
                                        className={btnClass(status === "Completed")}
                                    >
                                        Completed
                                    </button>
                                </div>
                            </div>

                            {/* Priority */}
                            <div className="mb-4">
                                <p className="text-sm text-gray-400 mb-2">Tasks with Priority</p>
                                <div className="flex space-x-2">
                                    {["High", "Medium", "Low"].map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => setPriority(p)}
                                            className={btnClass(priority === p)}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* XP */}
                            <div>
                                <p className="text-sm text-gray-400 mb-2">Tasks with XP</p>
                                <div className="flex space-x-2">
                                    {[30, 20, 10].map((value) => (
                                        <button
                                            key={value}
                                            onClick={() => setXp(value)}
                                            className={btnClass(xp === value)}
                                        >
                                            {value}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Task Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3">
                {Array.from({ length: 8 }).map((_, idx) => (
                    <TaskCard key={idx} onViewSubTasks={() => setShowModal(true)} />
                ))}
            </div>

            {/* 🔹 Subtask Modal */}
            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-md z-50">
                    <div className="relative w-[90%] max-w-5xl bg-[#1CB3FF]/20 p-6 ">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white  ">
                                Sub Tasks for Task 1
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-cyan-400 transition"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        {/* Subtask Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto pr-2">
                            {subTasks.map((task) => (
                                // subtask card component 
                                <div
                                    key={task.id}
                                    className=" p-4 bg-[#000000]/27 hover:border-cyan-400/70 transition"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[0.7rem] tracking-wider font-semibold text-cyan-300 bg-[#1CB3FF]/15 p-2">
                                            {task.title}
                                        </span>

                                    </div>
                                    <p className="text-gray-300 text-sm mb-3">{task.desc}</p>

                                    <p className="text-sm text-gray-400 mb-3">
                                        Priority:{" "}
                                        <span className="text-yellow-400 font-semibold">
                                            {task.priority}
                                        </span>
                                    </p>

                                    <button className="w-full border border-cyan-400/50 text-cyan-300 py-1  text-sm hover:bg-cyan-400/10 transition">
                                        Task Completed
                                    </button>

                                    <p className="text-xs text-gray-500 mt-2 text-right">
                                        Time remaining: 15:03:56
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewTask;
