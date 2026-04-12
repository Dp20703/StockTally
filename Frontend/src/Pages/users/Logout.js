import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../Services/apiClient';
import { useAuth } from '../../context/AuthContext';

const Logout = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                await api.get("/users/logout");
                toast.success("User Logged out Successfully");
            } catch {
                toast.error("Error logging out");
            } finally {
                localStorage.removeItem("token");
                setUser(null);
                navigate("/login", { replace: true });
            }
        };

        logoutUser();
    }, []);

    return (
        <div className='text-center mt-5'>Logout....</div>
    )
}

export default Logout