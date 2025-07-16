const IS_PROD = false;
const server = IS_PROD ?
    "https://video-call-meetingbackend.onrender.com" //production url
    :
    "http://localhost:8000"//development url

export default server;