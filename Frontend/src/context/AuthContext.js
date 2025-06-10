import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setUser(res.data);
        }).catch((err) => {
            // console.log("Error while fetching user from AuthContext:", err);
            localStorage.removeItem("token");
            setUser(null);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return <AuthContext.Provider value={{ user, setUser, loading }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);