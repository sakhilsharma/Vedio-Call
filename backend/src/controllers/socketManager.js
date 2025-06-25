//socker manager controller
import {Server} from 'socket.io';

let connections = {}; //for number od connected clients:: {"roomA": [socket1, socket2] "roomB": [socket3]}
let message ={};
let timeOnline ={};
export const connectToSocket = (server)=>{
    //setting connectiong with socket.io
   const io = new Server(server ,{
    //handle cors error od io
    cors:{
        origin: "*",
        methods:["GET" , "POST"],
        allowedHeaders:["*"],
        credentials: true
    }
   }); 

   //main socket.io comunication stuff: io.on()// like a event listner
   //these lines down: new client connected to socket and callback function
   io.on("connection" , (socket)=>{
    //here can put any name but on client side should be same during hearing(.emit)
    console.log("SOMETHING IS CONNECTED");
    socket.on("join-call",(path)=>{
           //join-call (from frontend:: socket.emit("join-call", roomId);) event request handler ::path is same as roomId
           // NOw :::::::::::handle the join request
        //just in case connection path is undefined
         if(connections[path] == undefined){
            connections[path] = []
         }
         connections[path].push(socket.id);//Store the socket ID of the newly connected user inside the array for that specific room (path)

         timeOnline[socket.id] = new Date();
        //response from server to individual client (emit) that user joined and with we send socket id
         connections[path].forEach((elem)=>{
            io.to(elem).emit("user-joined" , socket.id);
         })
         
        
         //When a new user joins a call room, the server re-sends previous chat messages (stored in message[path]) to that user so they can see message history.
         if (message[path] !== undefined) {
                  message[path].forEach((msgObj) => {
        // Send message to the new user who joined (socket.id)
        io.to(socket.id).emit("chat-message", msgObj.data, msgObj.sender, msgObj.socketId);
    });
}
       })


       //signal event handler is part of a WebRTC signaling mechanism::::::::::::;🔀 One-to-one communication
       //This event helps two peers (clients) exchange WebRTC signaling data (like offer, answer, ICE candidates) via the Socket.IO server.
       socket.on("signal" , (toId , message)=>{
        // io.to(toId).emit(...): Forwards it to the recipient (toId), along with the sender’s socket ID.
         io.to(toId).emit("signal" , socket.id , message);

       })


       //for chat message reciened from frontend like HI has been sent then its is handled here:::: Room-wide broadcast
       socket.on("chat-message" , (data, sender)=>{
         //using higher order functions
         //steps:
         //1) Find the room this socket is part of
         //2)store the message
         //3)BroadCast: Loop through everyone in that room and emit
         const [matchingRoom , found] = Object.entries(connections).reduce(([room , isFound] , [roomKey , roomValue])=>{
            if(!isFound && roomValue.includes(socket.id)){
                return [roomKey , true];
            }
            return [room , isFound]
         } , ['' , false]);
         //if we found the room
         if(found == true){
            if(message[matchingRoom] == undefined){
                message[matchingRoom] = []
            }
            message[matchingRoom].push({'sender':sender , "data":data , "socket-id-sender":socket.id});
            console.log("message" , key  ,":" , sender , data);

            connections[matchingRoom].forEach((elem)=>{
                io.to(elem).emit("chat-message" , data , sender , socket.id)
            })
         }
       })
       socket.on("disconnect", ()=>{ //▶️ This runs automatically when any client disconnects from the server
        //math functiom
         var diffTime = Math.abs(timeOnline[socket.id] - new Date()) ; //how much time active

         //steps:
         //✅ Find the room (key) they belonged to.(can be optimized so that every time we dont tranverse over entire room)
         //✅ Notify everyone in the room: "user-left" with the disconnected user's socket ID.
         //✅ Remove the disconnected user from the room.
         //✅Deletes the room if it's empty.
         //✅Cleans up memory tracking   
         
         
         var key //Stores the room name this socket belonged to.
          for(const [k, v] of Object.entries(connections)){ //[room name, Arrays of socket IDs ]   Loops through all rooms in connections simmiiar to above but bit differnet logic
            for(let a = 0 ; a < v.length() ; a++){
                
                if(v[a] == socket.id){
                    key =  k;
                    for(let a = 0; a < connections[key].length ; a++){
                       io.to(connections[key][a]).emit("user-left", socket.id);
                    }
    
//Find the index of the disconnected socket in the room's array

//Remove it using .splice()
                    var index  = connections[key].indexOf(socket.id);

                    connections[key].splice(index , 1);


                    if(connections[key].length == 0){
                        delete connections[key];
                    }
                }
            }
          }
       })
   })

   return io;
}


