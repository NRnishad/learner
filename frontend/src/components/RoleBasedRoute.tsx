import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

interface Props{
    allowedRoles: string[];
}

const RoleBasedRoute= ({allowedRoles}:Props) => {
    const {user,isAuthenticated}= useSelector((state:RootState)=>  state.auth)
    if(!isAuthenticated|| !user){
        return <Navigate to="/login" replace />;
    }

    if(!allowedRoles.includes(user.role)){
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}

export default RoleBasedRoute;
