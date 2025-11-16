// components/DashboardLayout.jsx
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import bgimage from "../assets/bg.jpg";



const Layout = () => {
    return (
        <div className="flex h-full text-white rounded-2xl border-t-2 border-b-2 border-cyan-400 "
            style={{
                backgroundImage: `url(${bgimage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>


            <Sidebar />
            <main className="flex-1 overflow-y-auto scroll-smooth">
                <Outlet /> {/* This changes based on route */}
            </main>
        </div>
    );
};

export default Layout;
