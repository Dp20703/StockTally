import axios from "axios";
import { useContext, useState } from "react";
import { createContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("No token");
                }

                const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUser(res.data);
                setAuth(true);
            } catch (error) {
                console.log("Error in authContext:", error.message);
                setAuth(false);
            } finally {
                setLoading(false);
                console.log("Auth loading complete:", { auth, user });
            }
        };
        fetchUser();
    }, []);


    return <AuthContext.Provider value={{ user, auth, loading }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);