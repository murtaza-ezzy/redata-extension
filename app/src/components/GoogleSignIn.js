import React, { useEffect } from 'react';

const GoogleSignIn = () => {
    useEffect(() => {
        // Initialize the Google Identity Services library
        window.google?.accounts.id.initialize({
            client_id: "643928758990-uua2tpt3uluae6lqf53dfjtbns6samsn.apps.googleusercontent.com",
            callback: handleCredentialResponse
        });

        // Render the Google sign-in button
        window.google?.accounts.id.renderButton(
            document.getElementById("signInDiv"), // Ensure this ID is unique and exists
            { theme: "outline", size: "large" } // Options for the appearance of the button
        );

        // Prompt the user automatically if needed (optional)
        window.google?.accounts.id.prompt();

    }, []);

    // Function to handle the response from Google after user is authenticated
    const handleCredentialResponse = (response) => {
        console.log("Encoded JWT ID token: " + response.credential);
        // You can send this token to your server here if needed
    };

    return (
        <div id="signInDiv"></div> // This div is where the Google button will be rendered
    );
};

export default GoogleSignIn;