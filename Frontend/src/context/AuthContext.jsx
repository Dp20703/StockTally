import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import api from "services/apiClient";

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
        api.get("/users/profile")
            .then((res) => {
                setUser(res.data);
            }).catch((err) => {
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