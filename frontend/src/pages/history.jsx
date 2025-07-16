import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);

    const [meetings, setMeetings] = useState([]);

    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);

            } catch (e) {
                //Implement Snack Bar
            }
        }
        fetchHistory();
    })
    let formatDate = (dataString) => {
        const date = new Date(dataString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        return `${day}/${month}/${year}`
    }
    return (
        <div>
            <IconButton onClick={() => {
                routeTo("/home");
            }}>
                <HomeIcon />
            </IconButton>

            {
                
                    meetings.length !== 0 ?
                        meetings.map((e, idx) => {
                            return (
                                <>

                                    <Card key={idx} variant="outlined"></Card>

                                    <CardContent>
                                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                            Meeting Code : {e.meetingCode}
                                        </Typography>

                                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                                            Date : {formatDate(e.date)}
                                        </Typography>

                                    </CardContent>

                                </>
                            )
                        })
                        :
                        <div>
                        </div>
                }
            
        </div>
    )
}