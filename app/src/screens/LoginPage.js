import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap CSS is imported
// import backgroundImage from 'assets/images/bg.jpeg';

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

    const handleForgotPassword = () => {
        // Implement your forgot password logic here
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
                                <h2 className="card-title text-center">Login</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <input type="email" className="form-control" placeholder="Email" required />
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" className="form-control" placeholder="Password" required />
                                    </div>
                                    <div className="mb-4">
                                        <a href="#!" onClick={handleForgotPassword} style={{ textDecoration: 'none' }}>Forgot Password?</a>
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-dark">Login</button>
                                    </div>
                                    <div className="d-grid gap-2 mt-2">
                                        <button type="button" className="btn btn-dark" onClick={handleGoogleSignIn}>
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