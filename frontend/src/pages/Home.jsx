import React, { useContext } from 'react';
import withAuth from '../../utils/withauth';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Button, IconButton, TextField } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import { useState } from 'react'
import { AuthContext } from '../context/AuthContext';
function Home() {
    let navigate = useNavigate();
    const { addToUserHistory } = useContext(AuthContext);
    const [meetingCode, setMeetingCode] = useState("");
    let handleJoinVideoCall = async () => {
        //we need to await addToHistory
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    }
    return (
        <>
            <div className="navbar">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h3>Video Call</h3>

                </div >
                <div style={{ display: "flex", alignItems: "center" }} >
                    <IconButton onClick={() => {
                        navigate("/history");
                    }}>
                        <HistoryIcon />
                        <p>History</p>
                    </IconButton>
                    {
                        localStorage.getItem("token") ?
                            <Button onClick={() => {
                                localStorage.removeItem("token");
                                navigate("/auth");
                            }}>
                                Log-Out
                            </Button>
                            :
                            <Button onClick={() => {
                                
                                navigate("/auth");
                            }}>
                                Log-In
                            </Button>

                    }
                </div>

            </div>
            <div className="meetContianer">
                <div className="leftPanel">

                    <h2 className="Heading">
                        Providing Vedio Call To Call Your Loved Ones.</h2>
                    <h3>Enter Meeting Code Or Create:</h3>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined"></TextField>
                        <Button onClick={handleJoinVideoCall} variant="contained"> JOIN </Button>
                    </div>

                </div>
                <div className='rightPanel'>
                    <img srcSet='./logo3.png' alt=''></img>
                </div>
            </div>
        </>
    )
}

export default withAuth(Home); //authenticate the home component