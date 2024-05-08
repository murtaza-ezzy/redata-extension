/* global chrome */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignUpPage() {
    // State variables for handling Google sign-in and form values
    const [isGoogleSignIn, setIsGoogleSignIn] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [token, setToken] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email, isGoogleSignIn, name, token);
    };

    const [userInfo, setUserInfo] = useState(null);

    const handleSignIn = () => {
        chrome.runtime.sendMessage({ action: 'signIn' }, (response) => {
            if (response.error) {
                console.error('Google sign-in error:', response.error);
                return;
            }
            setToken(response.token); // Store the token
        });
    };

    const fetchUserInfo = (token) => {
        fetch(`https://www.googleapis.com/oauth2/v2/userinfo`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setUserInfo(data); // Store user info
                setEmail(data.email)
                setIsGoogleSignIn(true);
                setToken(token);
                setName(data.name);
            })
            .catch((error) => console.error('Error fetching user info:', error));
    };

    // Fetch user info when token is set
    useEffect(() => {
        if (token) {
            fetchUserInfo(token);
        }
    }, [token]);

    const backgroundStyle = {
        backgroundImage: `url('assets/images/bg.jpeg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div style={backgroundStyle}>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title text-center">Sign Up</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            disabled={isGoogleSignIn}
                                        />
                                    </div>
                                    {/* Hide password field if Google sign-in */}
                                    {!isGoogleSignIn && (
                                        <div className="mb-3">
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                required
                                            />
                                        </div>
                                    )}
                                    <div className="mb-4">
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="occupation"
                                                id="student"
                                                value="student"
                                            />
                                            <label className="form-check-label" htmlFor="student">
                                                Student
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="occupation"
                                                id="others"
                                                value="others"
                                            />
                                            <label className="form-check-label" htmlFor="others">
                                                Others
                                            </label>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="terms"
                                            />
                                            <label className="form-check-label" htmlFor="terms">
                                                I agree to the SunstalInbox's Terms & Conditions
                                            </label>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-dark">
                                            Sign Up
                                        </button>
                                    </div>
                                    {!isGoogleSignIn && (
                                        <div className="d-grid gap-2 mt-2">
                                            <button
                                                type="button"
                                                className="btn btn-dark"
                                                onClick={handleSignIn}
                                            >
                                                <img
                                                    src="assets/images/google.png"
                                                    alt="Google sign-in"
                                                />
                                                &nbsp;
                                                Continue with Google
                                            </button>
                                        </div>
                                    )}

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;