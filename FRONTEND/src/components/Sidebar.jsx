import axios from "axios";
import { Home, PlusSquare, List, BarChart2, Trophy, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {

    const { userData, setUserData } = useAuth();
    console.log(userData);


    const navigate = useNavigate();
    const handleLogout = async () => {
        const res = await axios.get("http://localhost:9000/api/auth/logout", { withCredentials: true });
        if (res.status === 200) {
            setUserData(null);
            navigate("/");
        }
        else {
            console.log("Error while logging out !");
        }
    }
    return (
        <div className="flex flex-col justify-between h-full w-64   shadow-2xl p-2 text-gray-300 font-inter">
            <div className="absolute top-0 left-64 h-full w-[1px] 
            bg-gradient-to-b from-transparent via-cyan-500 to-transparent 
             ">
            </div>
            {/* Top Section - Profile */}
            <div>
                {/* Profile Section */}
                <div className="flex items-center gap-4 mb-10  rounded-xl  mt-4  shadow-lg">
                    <div className="h-14 w-14 rounded-full border border-cyan-400  flex items-center justify-center text-white text-xl font-bold shadow-[0_0_15px_#00bfff]">
                        <img src={userData?.profilePic} alt="" className="p-1 h-full w-full rounded-full object-cover " />
                    </div>
                    <div>
                        <h2 className="text-white font-semibold text-lg tracking-tight ">{userData?.username}</h2>
                        <div className="flex items-center gap-2 mt-1">

                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-2">
                    {[
                        { name: "Dashboard", icon: <Home size={27} />, link: "/home/dashboard" },
                        { name: "Task Creation", icon: <PlusSquare size={27} />, link: "/home/task-create" },
                        { name: "View Tasks", icon: <List size={27} />, link: "/home/task-view" },
                        { name: "Task Analysis", icon: <BarChart2 size={27} /> },
                        { name: "Leaderboard", icon: <Trophy size={27} /> },
                    ].map((item, index) => (
                        <Link to={item.link}>
                            <button
                                key={index}
                                className="flex items-center w-full gap-4 py-3 px-4 rounded-xl text-lg cursor-pointer font-medium transition-all duration-300 border border-transparent hover:border-cyan-700/50 hover:bg-gradient-to-r hover:from-cyan-900/10 hover:to-blue-900/10 hover:text-cyan-300 hover:shadow-[0_0_20px_#00bfff25] group"
                            >
                                <div className="text-cyan-400/80 group-hover:text-cyan-300 transition-colors duration-300">
                                    {item.icon}
                                </div>
                                <span className="group-hover:translate-x-1 transition-transform duration-300">
                                    {item.name}
                                </span>
                            </button>
                        </Link>
                    ))}
                </nav>

            </div>

            {/* Bottom Section */}
            <div className="space-y-4">


                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full gap-4 py-3 px-4 rounded-xl text-lg cursor-pointer font-medium transition-all duration-300 border border-transparent hover:border-cyan-700/50 hover:bg-gradient-to-r hover:from-cyan-900/10 hover:to-blue-900/10 hover:text-cyan-300 hover:shadow-[0_0_20px_#00bfff25] group">
                    <LogOut size={18} className="group-hover:scale-110 transition-transform duration-300" />
                    <span>Log out</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;