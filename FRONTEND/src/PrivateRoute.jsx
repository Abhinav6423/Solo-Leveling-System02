import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import Loader from "./Loader";
const PrivateRoute = () => {
    const { userData } = useContext(AuthContext);

    if (userData === undefined) return <Loader />; // still loading
    if (userData === null) return <Navigate to="/" />; // not logged in

    return <Outlet />;
};

export default PrivateRoute;
