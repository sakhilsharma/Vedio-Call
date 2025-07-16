import { useState } from 'react'
import './App.css'
import LandingPage from './pages/landing';
import Auth from './pages/authentication';
import { AuthProvider } from './context/AuthContext';
import {Routes , BrowserRouter as Router , Route} from 'react-router-dom'
import VideoMeetComponent from './pages/videoMeet'
import Home from './pages/Home.jsx'
import History from './pages/history.jsx';
function App() {
  

  return (
    <>
      <Router>
               <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/auth" element={<Auth/>} />

          {/*if path matches to the r0om code:: route to handle this */}
          <Route path="/:url" element={<VideoMeetComponent/>}></Route>
           <Route path="/home" element={<Home/>} />
           <Route path="/history" element={<History/>}/>F
        </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
