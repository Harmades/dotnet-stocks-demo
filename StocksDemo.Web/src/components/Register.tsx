import React, { useState } from "react";
import { TextField, PrimaryButton, Stack, MessageBar, MessageBarType, FontSizes } from "@fluentui/react";
import { getConfig } from "../utils/Config";
import { IdentityApiClient } from "../clients/IdentityApiClient";
import { useNavigate } from "react-router-dom";

export const RegisterComponent: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    const config = getConfig();

    const handleRegister = async () => {
        setErrorMessage("");
        setSuccessMessage("");

        if (password.length < 8) {
            setErrorMessage("Password must be at least 8 characters long.");
            return;
        }

        try {
            const client = new IdentityApiClient(config.STOCKSDEMOAPI_URL);
            await client.register({ email, password });
            navigate("/login");
        } catch (error) {
            setErrorMessage("An error occurred during registration.");
        }
    };

    return (
        <Stack tokens={{ childrenGap: 15 }} styles={{ root: { maxWidth: 300, margin: "0 auto" } }}>
            <div style={{ textAlign: "center", fontSize: FontSizes.large }}>Register</div>
            {errorMessage && (
                <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
                    {errorMessage}
                </MessageBar>
            )}
            {successMessage && (
                <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>
                    {successMessage}
                </MessageBar>
            )}
            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e, newValue) => setEmail(newValue || "")}
                required
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e, newValue) => setPassword(newValue || "")}
                canRevealPassword
                required
            />
            <PrimaryButton text="Register" onClick={handleRegister} />
        </Stack>
    );
};