import React from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
    const router = useNavigate();

    return (
        <div className="landingPageContainer noImage">
            <nav>
                <div className="navHeader">
                    <h2>Apna Video Call</h2>
                </div>
                <div className="navlist">
                    <p onClick={() => router("/guest-join-#123D")}>Join as Guest</p>
                    <p onClick={() => router("/auth")}>Register</p>
                    <div role="button" onClick={() => router("/auth")}>
                        <p>Login</p>
                    </div>
                </div>
            </nav>

            <div className="landingMainContainer withImage">
                <div className="landingTextBlock">
                    <h1>
                        <span className="highlight">Connect</span> With Your Loved Ones
                    </h1>
                    <p>Bridge the distance through Apna Video Call.</p>
                    <div role="button">
                        <Link to="/home">Get Started</Link>
                    </div>
                </div>

                <div className="landingImage">
                    <img src="/background.png" alt="Video Call Illustration" />
                </div>
            </div>
        </div>
    );
}
