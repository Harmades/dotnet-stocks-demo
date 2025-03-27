import React from 'react';
import { TextField, PrimaryButton, Stack, Link, FontSizes } from '@fluentui/react';
import { UserContext } from '../utils/UserContext';
import { getConfig } from '../utils/Config';
import { useNavigate } from 'react-router-dom';
import { IdentityApiClient } from '../clients/IdentityApiClient';

export interface LoginComponentProps {
    setUserContext: (userContext: UserContext) => void;
};

export const LoginComponent: React.FC<LoginComponentProps> = ({ setUserContext }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState<string | null>(null);
    const navigate = useNavigate();

    const config = getConfig();

    const handleLogin = async () => {
        setError(null);
        try {
            const client = new IdentityApiClient(config.STOCKSDEMOAPI_URL);
            await client.login({ email, password });
            setUserContext({
                email: email,
                name: email
            });
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Login failed. Please check your credentials.');
        }
    };

    const navigateToRegister = (ev: React.MouseEvent) => {
        ev?.preventDefault();
        navigate('/register');
    };

    return (
        <Stack tokens={{ childrenGap: 15 }} styles={{ root: { width: 300, margin: 'auto' } }}>
            <div style={{ textAlign: "center", fontSize: FontSizes.large }}>Login</div>
            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e, newValue) => setEmail(newValue || '')}
                required
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e, newValue) => setPassword(newValue || '')}
                canRevealPassword
                required
            />
            {error && <span style={{ color: 'red' }}>{error}</span>}
            <PrimaryButton text="Login" onClick={handleLogin} />
            <Link href="/register" styles={{ root: { textAlign: 'center', marginTop: 10 } }} onClick={navigateToRegister}>
                Don't have an account? Register here
            </Link>
        </Stack>
    );
};