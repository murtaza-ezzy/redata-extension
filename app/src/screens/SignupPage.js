/* global chrome */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleSignIn from '../components/GoogleSignIn';


function SignUpPage() {
    // Handle the form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Implement your sign-up logic here
    };

    // Handle the Google sign-in
    const handleGoogleSignIn = () => {
        // Implement Google sign-in logic here
    };

    const responseGoogle = (response) => {
        console.log(response);
        // Handle successful login here, like storing user data or managing session
    };

    const errorGoogle = (error) => {
        console.error(error);
        // Handle error, if any
    };

    const handleSignIn = () => {
        chrome.runtime.sendMessage({ action: "signIn" }, function (response) {
            console.log('User token:', response.token);
        });
    };


    const backgroundStyle = {
        backgroundImage: `url('assets/images/bg.jpeg')`,
        backgroundSize: 'cover', // Cover the entire space of the container
        backgroundRepeat: 'no-repeat', // Do not repeat the image
        backgroundPosition: 'center', // Center the image in the container
        minHeight: '100vh', // At least 100% of the viewport height
        display: 'flex',
        alignItems: 'center', // Align items vertically
        justifyContent: 'center', // Align items horizontally
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
                                        <input type="text" className="form-control" placeholder="Name" required />
                                    </div>
                                    <div className="mb-3">
                                        <input type="email" className="form-control" placeholder="Email" required />
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" className="form-control" placeholder="Password" required />
                                    </div>
                                    <div className="mb-4">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="occupation" id="student" value="student" />
                                            <label className="form-check-label" htmlFor="student">Student</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="occupation" id="others" value="others" />
                                            <label className="form-check-label" htmlFor="others">Others</label>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="terms" />
                                            <label className="form-check-label" htmlFor="terms">
                                                I agree to the SunstalInbox's Terms & Conditions
                                            </label>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-dark">Sign Up</button>
                                    </div>
                                    <div className="d-grid gap-2 mt-2">
                                        <button type="button" className="btn btn-dark" onClick={handleSignIn}>
                                            <img src="assets/images/google.png" alt="Google sign-in" />
                                            &nbsp;
                                            Continue with Google
                                        </button>
                                    </div>
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
