import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const CreateWatchlist = ({ setModal }) => {
    const navigate = useNavigate();
    const [watchlist, setWatchlist] = useState('');
    console.log('watchlist:', watchlist);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const watchlistName = watchlist.trim();
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/watchlist/create`, { watchlistName: watchlistName }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('response:', res.data);

            toast.success("Watchlist created successfully", {
                position: "top-right",
                autoClose: 1000,
                onClose: () => {
                    navigate('/trade/watchlist');
                }
            })
            setWatchlist('');
            setModal(false);
        }
        catch (err) {
            console.error('Error creating watchlist:', err);

            if (err.response && err.response.status === 409) {
                toast.error("Watchlist already exists", {
                    position: "top-right",
                    autoClose: 1000,
                });
            } else {
                toast.error("Failed to create watchlist", {
                    position: "top-right",
                    autoClose: 1000,
                });
            }
        }
    }
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