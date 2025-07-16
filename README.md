📹 Real-Time Video Calling App
A full-stack real-time video calling application built with modern web technologies, enabling seamless peer-to-peer (P2P) video communication over the internet using WebRTC and WebSockets. Designed with responsiveness, real-time feedback, and user experience in mind.

💡 Think of it as your own secure, scalable video meet platform — built from scratch.

🚀 Features
🔴 Real-time video and audio streaming using WebRTC

📡 Peer-to-peer connection (P2P) for low-latency communication

🌐 Live socket communication using Socket.IO

🖼️ Material UI-based responsive frontend

🔐 Auth-ready backend setup using Express and MongoDB

💻 Optimized for desktop and mobile views

✅ Add authentication (JWT or Firebase)

🎥 Screen sharing


🛠️ Tech Stack
Layer	Technology Used	Why It Matters
Frontend	React, Vite, Material UI	Ultra-fast dev environment, modern UI components
Backend	Node.js, Express, Socket.IO	Scalable server logic, real-time bi-directional communication
Database	MongoDB with Mongoose	NoSQL DB ideal for fast schema updates and horizontal scaling
P2P Engine	WebRTC	Direct media streaming between clients — core of modern video platforms
Realtime	Socket.IO	Event-based communication layer for call negotiation & signaling
Security	bcrypt, crypto	Password hashing, secure token generation

⚙️ Core Concepts Used
Concept	Description
WebRTC (Peer-to-Peer)	Enables direct video/audio/data exchange between clients without routing through a server.
WebSockets with Socket.IO	Real-time signaling between clients for connection setup and negotiation.
Window Object Handling	Accessing camera, microphone, and media devices dynamically using navigator.mediaDevices.
React Component Architecture	Functional hooks-based design for managing state, streams, and UI.

🧩 Folder Structure (Simplified)
bash
Copy
Edit
/front           # React + Vite frontend
  └── components
  └── pages
  └── socketClient.js
  └── App.jsx

/backend         # Node.js + Express backend
  └── src
      └── app.js
      └── socketHandlers.js
      └── models/
🧠 Why This Stack?
WebRTC & Socket.IO are industry standards for building Zoom-like, WhatsApp Call, or Discord-style real-time apps.

Vite + React 19 provides a lightning-fast developer experience.

Node + Express powers a performant and scalable server backend.

MongoDB lets you scale horizontally and store flexible user/session/call data.

🧪 Future Ideas / Improvements

💬 Real-time chat with emojis and file sharing

📱 Mobile app using React Native + WebRTC

📊 Call analytics dashboard for admins

🛠️ Scripts
Frontend:
bash
Copy
Edit
npm install       # install frontend deps
npm run dev       # start Vite dev server
Backend:
bash
Copy
Edit
npm install       # install backend deps
npm run dev       # run Express server with nodemon
📖 Learning Outcomes
Built a full real-time app from scratch using cutting-edge protocols.

Understood media handling via navigator.mediaDevices API.

Implemented socket-based negotiation for P2P connections.

Designed frontend with Material UI and React best practices.

🧩 Used Libraries (Key Versions)
socket.io: ^4.8.1

react: ^19.1.0

express: ^5.1.0

vite: ^6.3.5

@mui/material: ^7.1.2

mongoose: ^8.16.0

🙌 Author
Built with 💻 and ☕ by Sakhil Sharma