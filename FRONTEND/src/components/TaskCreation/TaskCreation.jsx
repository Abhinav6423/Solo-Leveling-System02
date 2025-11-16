import React, { useState } from "react";
import NotificationModal from "../NotificationModal";
// import notifybg from "../"
const TaskCreation = () => {
    const [isSubtask, setIsSubtask] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // ✅ When user clicks "Create Task"
    const handleCreateClick = () => {
        setShowModal(true);
    };

    // ✅ When user confirms inside modal
    const handleConfirm = () => {
        setShowModal(false);
        // 🧠 Add your task creation logic here
        console.log("Task created successfully ✅");
    };

    // ✅ When user cancels modal
    const handleCancel = () => {
        setShowModal(false);
    };

    return (
        <div className="relative h-screen w-full text-white select-none">
            {/* 🔹 Content Layer */}
            <div className="relative flex z-10 h-screen">
                {/* 🔹 Main Area */}
                <main className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="flex items-center w-full mb-8">
                            <h2 className="text-3xl font-semibold bg-gradient-to-r from-cyan-300 to-blue-500 text-transparent bg-clip-text whitespace-nowrap">
                                Task Creation
                            </h2>
                            <div className="flex-1 ml-4 h-[2px] bg-gradient-to-r from-[#1e3a8a] via-[#3b82f6] to-transparent shadow-[0_0_8px_#3b82f6]" />
                        </div>

                        {/* Main Form Container */}
                        <div className="w-full flex flex-col md:flex-row bg-transparent backdrop-blur-sm shadow-[0_0_25px_rgba(0,255,255,0.2)] border border-cyan-500/20 p-10 gap-10 rounded-2xl overflow-hidden">
                            {/* Left Section */}
                            <div className="flex-1 space-y-6">
                                {/* Title */}
                                <div>
                                    <label className="block text-gray-300 mb-2">Title</label>
                                    <textarea
                                        placeholder="Enter task title..."
                                        className="w-full px-4 py-3 rounded-lg bg-[#0b1220]/80 border border-cyan-500/30 focus:border-cyan-400 outline-none resize-none text-white placeholder-gray-400 transition"
                                        rows={1}
                                    ></textarea>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-gray-300 mb-2">Description</label>
                                    <textarea
                                        placeholder="Enter task description..."
                                        className="w-full px-4 py-3 rounded-lg bg-[#0b1220]/80 border border-cyan-500/30 focus:border-cyan-400 outline-none resize-none text-white placeholder-gray-400 transition"
                                        rows={3}
                                    ></textarea>
                                </div>

                                {/* Impact on goal */}
                                <div>
                                    <label className="block text-gray-300 mb-3">Impact on goal</label>
                                    <div className="flex gap-6">
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <label key={num} className="flex flex-col items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="impact"
                                                    value={num}
                                                    className="accent-cyan-400 scale-110 cursor-pointer"
                                                />
                                                <span className="text-gray-400 mt-1">{num}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Urgency */}
                                <div>
                                    <label className="block text-gray-300 mb-3">Urgency</label>
                                    <div className="flex gap-6">
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <label key={num} className="flex flex-col items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="urgency"
                                                    value={num}
                                                    className="accent-cyan-400 scale-110 cursor-pointer"
                                                />
                                                <span className="text-gray-400 mt-1">{num}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Difficulty */}
                                <div>
                                    <label className="block text-gray-300 mb-3">Difficulty</label>
                                    <div className="flex gap-6">
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <label key={num} className="flex flex-col items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="difficulty"
                                                    value={num}
                                                    className="accent-cyan-400 scale-110 cursor-pointer"
                                                />
                                                <span className="text-gray-400 mt-1">{num}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Sub Task */}
                                <div>
                                    <label className="block text-gray-300 mb-2">Sub Task</label>
                                    <div className="flex items-center gap-8">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="subtask"
                                                checked={isSubtask}
                                                onChange={() => setIsSubtask(true)}
                                                className="accent-cyan-400 scale-110"
                                            />
                                            Yes
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="subtask"
                                                checked={!isSubtask}
                                                onChange={() => setIsSubtask(false)}
                                                className="accent-cyan-400 scale-110"
                                            />
                                            No
                                        </label>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="space-y-4 pt-6">
                                    <button
                                        onClick={handleCreateClick}
                                        className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 transition font-semibold shadow-[0_0_20px_rgba(0,255,255,0.3)]"
                                    >
                                        Create Task
                                    </button>
                                    <button className="w-full py-2 rounded-lg border border-cyan-500/40 hover:border-cyan-300/80 text-cyan-300 transition">
                                        Cancel
                                    </button>
                                </div>

                                {/* ✅ Notification Modal */}
                                <NotificationModal
                                    isOpen={showModal}
                                    onConfirm={handleConfirm}
                                    onCancel={handleCancel}
                                />
                            </div>

                            {/* Right Section - Info Box */}
                            <div className="md:w-[40%] bg-[#0b1220]/70 rounded-2xl p-6 shadow-[0_0_20px_rgba(0,255,255,0.15)] h-fit border-t-4 border-b-4 border-cyan-400">
                                <ul className="space-y-6 text-sm leading-relaxed">
                                    <li className="flex gap-3">
                                        {/* <img src={warning} alt="warning" className="w-2.5" />
                                        */}
                                        <span className="text-cyan-400 mt-1">●</span>
                                        Write short, clear titles and descriptions so you’ll know exactly what needs to be done later.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-cyan-400 mt-1">●</span>
                                        Select Low, Medium, or High based on how urgent or important the task is — this helps prioritize effectively.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-cyan-400 mt-1">●</span>
                                        Rate the impact, urgency, and difficulty carefully to balance your workload and maximize focus.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-cyan-400 mt-1">●</span>
                                        Double-check all details before creating the task to avoid confusion or misclassification.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TaskCreation;
