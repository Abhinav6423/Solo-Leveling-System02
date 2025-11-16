import React from "react";
import ReactDOM from "react-dom";
import useScrollLock from "../hooks/useScrollLock";
import notifybg from "../assets/notifiactionbg.jpg";
import warning from "../assets/warning.png"

const NotificationModal = ({ isOpen, onConfirm, onCancel }) => {
    useScrollLock(isOpen);

    if (!isOpen) return null;

    // render modal directly into body
    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center
                bg-gray-900/50  backdrop-blur-sm select-none"
        >
            <div
                className=" w-[700px] h-[500px] max-w-[95%]  
                   bg-transparent backdrop-blur-lg  border-t-2 border-b-2  border-cyan-400 
                    text-center px-25 py-30 flex items-center justify-center"

                style={{
                    backgroundImage: `url(${notifybg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >



                <div className=" border-4 border-double border-gray-500  px-17 py-10 flex flex-col items-center ">
                    <h2 className="text-[#8FCFFF] font-bold text-2xl mb-5 tracking-wide  p-1 w-fit flex items-center justify-between gap-1  ">
                        <div className="border border-gray-500">
                            <img src={warning} alt="warning"  className="w-8" />
                        </div>
                        <div className="border border-gray-500 px-8">NOTIFICATION</div>
                    </h2>

                    <p className="text-gray-300 text-base leading-relaxed">
                        Once you create a task, you have{" "}
                        <span className="text-red-500 font-semibold">24 hours</span> to complete
                        it and earn XP.
                        <br />
                        <br />
                        After 24 hours, the task will be automatically deleted, and any
                        unclaimed XP will be lost.
                        <br />
                        <br />
                        Stay consistent and complete tasks on time to level up ⚔️.
                    </p>

                    <div className="flex justify-center gap-5 mt-8">
                        <button
                            onClick={onConfirm}
                            className="px-6 py-2  bg-transparent 
                       text-white font-semibold hover:scale-[1.03] transition border border-gray-500"
                        >
                            Okay, create task
                        </button>

                        <button
                            onClick={onCancel}
                            className="px-6 py-2  border border-gray-500 text-gray-300 
                       hover:bg-gray-700/30 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>

            </div>
        </div>,
        document.body // 👈 mounts modal to <body> instead of parent component
    );
};

export default NotificationModal;
