import React, { useEffect } from "react";
import { UserContext } from "../utils/UserContext";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { IdentityApiClient } from "../clients/IdentityApiClient";
import { getConfig } from "../utils/Config";

export interface ProtectedRouteProps {
    userContext: UserContext | null;
    setUserContext: (userContext: UserContext) => void;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ userContext, setUserContext }) => {
    const config = getConfig();
    const navigate = useNavigate();
    
    useEffect(() => {
        new IdentityApiClient(config.STOCKSDEMOAPI_URL)
            .getInfo()
            .then((email: string) => {
                setUserContext({ email, name: email });
                navigate('/');}
            );
    }, []);
    return (
        userContext
            ?
                <UserContext.Provider value={userContext}>
                    <Outlet />
                </UserContext.Provider>
            : <Navigate to="/login" replace />
    );
};