import React from "react";

export interface UserContext {
    name: string;
    email: string;
}

export const UserContext = React.createContext<UserContext | null>(null);