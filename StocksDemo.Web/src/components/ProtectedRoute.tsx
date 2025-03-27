import React from "react";
import { UserContext } from "../utils/UserContext";
import { Navigate, Outlet } from "react-router-dom";

export interface ProtectedRouteProps {
    userContext: UserContext | null;
    setUserContext: (userContext: UserContext) => void;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ userContext, setUserContext}) => {
    return (
        userContext
            ?
                <UserContext.Provider value={userContext}>
                    <Outlet />
                </UserContext.Provider>
            : <Navigate to="/login" replace />
    );
};