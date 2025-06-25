const server_url = "http://localhost:8000"; //web socket server
import "../styles/videoComponent.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRef, useState, useEffect } from 'react';
import io from "socket.io-client";
var connections = {};

const peerConfigConnections = { //stun servers
    "iceServers": [
        { "urls": "stun:stun.l.google.com:19302" }
    ]
}

export default function VideoMeetComponent() {
    //{window.location.href  /*this tells us where are we our address of frontend like:http://localhost:5173/4262 */}

    var socketRef = useRef();
    let socketIdRef = useRef();


    //access or control the real DOM ::useRef
    let localVideoRef = useRef(); //our video gets displayed on this refernce ::creates a ref object.........  ref:{ null }

    let [videoAvailable, setVideoAvailable] = useState(true);
    let [audioAvailable, setAudioAvailable] = useState(true);

    let [video, setVideo] = useState();

    let [audio, setAudio] = useState();

    let [screen, setScreen] = useState();

    let [showModal, setShowModel] = useState(); //popup and all
    let [screenAvailable, setScreenAvailable] = useState(); //need to check screen is Available or not

    let [messages, setMessages] = useState([]); //array

    let [message, setMessage] = useState("");
    let [newMessages, setNewMessages] = useState(0); //title popup

    let [askForUsername, setAskForUsername] = useState(true);
    let [username, setUsername] = useState("");

    let [videos, setVideos] = useState([]);
    const videoRef = useRef([]); //list o f video  ref 

    //if (isChrome() === false) {
    //    //webRTC works on chromium based browser : basically all browser
    //}

    const getPermissions = async () => {
        try {
            //navigator have all acces harware and all
            const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
            // The Promise resolves with a MediaStream object and if denied The Promise rejects and throws an error
            if (videoPermission) {
                //if permission is given from the window then we can set videoAvailablity : true
                setVideoAvailable(true);

            }
            else {
                setVideoAvailable(false);
            }

            //for audio similiar
            const audioPermissions = await navigator.mediaDevices.getUserMedia({ audio: true });

            if (audioPermissions) {
                //if permission is given from the window
                setAudioAvailable(true);

            }
            else {
                setAudioAvailable(false);
            }

            if (navigator.mediaDevices.getDisplayMedia) {
                //used to on the screen sharing
                setScreenAvailable(true);
            }
            else {
                setScreenAvailable(false);

            }

            if (videoAvailable || audioAvailable) {
                // If at least video or audio is available (true)\
                //here:navigator.mediaDevices.getUserMedia({video: videoAvailable , audio : audioAvailable})
                //  This asks the user for permission to access their camera and/or microphone.
                const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });

                if (userMediaStream) {
                    //If the user allows access, getUserMedia() gives you a MediaStream object
                    //You save the stream globally (attached to the window):This is simply a convenient way to store the MediaStream globally,
                    //  so it can be accessed later from anywhere in your code
                    window.localStream = userMediaStream;
                    if (localVideoRef.current) {
                        //localVideoRef.current was null until the <video> DOM element is rendered and mounted in the DOM.
                        // //This part displays the live stream in a <video> element (using a React ref).
                        //localVideoRef.current is a reference to the video DOM element. and we set it equal to videoStream form navigator
                        localVideoRef.current.srcObject = userMediaStream;
                    }

                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        //as we enter into the intial lobby of joining state we need to have permissions for audio and video
        getPermissions();
    }, [])

    // let getUserMediaSuccess = (stream) = {
    //
    // }

    let getUserMedia = () => {
        //this is main video call feature and not the lobby one
        if ((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
                .then(
                //getUserMediaSuccess() //if  one audio/video off/on then it updates everu other devices with that update 
            )
                .then((stream) => { })
                .catch((e) => console.log(e));

        }
        else {
            try {
                let tracks = localVideoRef.current.srcObj.getTracks();//returns an array of all media tracks (video + audio) in that stream.
                tracksforEach(track => track.stop());
                //this turns off the webcam and mic — very important for cleanup!

            }
            catch (e) {

            }
        }
    }
    useEffect(() => {
        if (video !== undefined && audio !== undefined) {
            getUserMedia();
        }
    }, [audio, video]);

    //TODO
    let gotMessagefromServer = () => {

    }

    let connectToSocketServer = () => {
        socketRef.current = io.connect(server_url, { secure: false });
        //now scoket is connected 

        socketRef.current.on('signal', gotMessagefromServer);

        socketRef.current.on('connect', () => {
            //we got an id on connecting
            socketRef.current.emit("join-call" , window.location.href);//it is the url of frontend where are we now

            socketIdRef.current = socketRef.current.id;

            socketRef.current.on("chat-message" , addMessage)
        })
    }
    let getMedia = () => {
        //now after taking all the permissions we set audio and video
        setVideo(videoAvailable);
        setAudio(audioAvailable);


        connectToSocketServer(); //conncetion to the socket ... handled by backend as io.on("connection", ()=>{})
    }
    let connect = () => {
        setAskForUsername(false);
        getMedia();
    }
    return (
        <>
            <div>
                {askForUsername === true ?
                    <div>

                        <h2>Enter Into Lobby</h2>
                        <TextField id="outlined-basic" label="Outlined" val={username} onChange={(e) => { setUsername(e.target.value) }} variant="outlined" />
                        <Button variant="contained" onClick={connect}>Connect</Button>

                        <div>{/* video div*/}
                            <video ref={localVideoRef} autoPlay muted></video>



                        </div>


                    </div> : <div>

                    </div>

                }
            </div>
        </>
    )
}