import React, { useEffect, useState } from "react";
import { UserContext } from "../utils/UserContext";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { IdentityApiClient } from "../clients/IdentityApiClient";
import { getConfig } from "../utils/Config";
import { Spinner, SpinnerSize } from "@fluentui/react";

export interface ProtectedRouteProps {
    userContext: UserContext | null;
    setUserContext: (userContext: UserContext) => void;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ userContext, setUserContext }) => {
    const config = getConfig();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        new IdentityApiClient(config.STOCKSDEMOAPI_URL)
            .getInfo()
            .then((email: string) => {
                setUserContext({ email, name: email });
                navigate('/');
            })
            .finally(() => setIsLoading(false));
    }, []);
    return (
        isLoading
            ? <Spinner label="Loading..." styles={{ root: { marginTop: '20px' } }} size={SpinnerSize.large} />
            : userContext
            ?
                <UserContext.Provider value={userContext}>
                    <Outlet />
                </UserContext.Provider>
            : <Navigate to="/login" replace />
    );
};