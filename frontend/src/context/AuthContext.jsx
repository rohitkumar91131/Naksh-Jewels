import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                const res = await axios.get(`${backendUrl}/auth/verify`, {
                    withCredentials: true 
                });
                setUser(res.data.user);
                console.log("VITE_BACKEND_URL =", import.meta.env.VITE_BACKEND_URL);

            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkUserLoggedIn();
    }, []);

    const signup = async (email, password) => {
        setError(null);
        try {
            await axios.post(`${backendUrl}/auth/register`, { email, password });
            return { success: true };
        } catch (err) {
            setError(err.response?.data?.error || 'Signup failed');
            return { success: false, error: err.response?.data?.error };
        }
    };

    const login = async (email, password) => {
        setError(null);
        try {
            const res = await axios.post(`${backendUrl}/auth/login`, { email, password }, {
                withCredentials: true 
            });
            setUser(res.data.user);
            return { success: true };
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
            return { success: false, error: err.response?.data?.error };
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${backendUrl}/auth/logout`, {}, { withCredentials: true });
            setUser(null);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};
