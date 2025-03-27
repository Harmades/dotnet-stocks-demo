import React from "react";
import { LoginComponent } from "./Login";
import { UserContext } from "../utils/UserContext";

export const ProtectedRoutes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userContext, setUserContext] = React.useState<UserContext | null>(null);

    return (
        <UserContext.Provider value={userContext}>
            {userContext
                ? <>{children}</> :<LoginComponent setUserContext={setUserContext} />}
        </UserContext.Provider>
    );
};