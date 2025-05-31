import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useWatchlists } from '../../context/WatchlistContext';


const CreateWatchlist = ({ setModal }) => {
    const navigate = useNavigate();
    const [watchlist, setWatchlist] = useState('');
    const { fetchWatchlist } = useWatchlists();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedName = watchlist.trim();
        if (!trimmedName) {
            toast.warn("Watchlist name cannot be empty", { autoClose: 1000 });
            return;
        }
        try {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/watchlist/create`,
                { watchlistName: trimmedName },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            fetchWatchlist?.();
            setWatchlist('');
            setModal(false);
            toast.success("Watchlist created successfully", {
                autoClose: 1000,
                onClose: () => navigate('/trade/watchlist'),
                position: "top-right",
            });
        } catch (err) {
            console.error('Error creating watchlist:', err);
            const status = err?.response?.status;
            const message =
                status === 409
                    ? "Watchlist already exists"
                    : "Failed to create watchlist";
            toast.error(message, {
                position: "top-right",
                autoClose: 1000,
            });
        }
    };

    return (
        <>
            <h1 className='text-center fs-2'>CreateWatchlist</h1>
            <div>
                <Form >
                    <Form.Group className="mb-3" controlId="formBasicInput">
                        <Form.Label>Enter Watchlist</Form.Label>
                        <Form.Control type="text" placeholder="Enter watchlist" onChange={(e) => setWatchlist(e.target.value)} value={watchlist} />
                    </Form.Group>

                    <Button type='sumbit' variant="primary" className='d-block m-auto' onClick={handleSubmit}>
                        Add Watchlist
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default CreateWatchlist