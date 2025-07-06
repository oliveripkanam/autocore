const initializeGoogleAuth = () => {
    // Wait for Google library to load
    if (typeof window.google === 'undefined') {
        console.log('Google library not loaded yet, retrying...');
        setTimeout(initializeGoogleAuth, 500);
        return;
    }

    try {
        window.google.accounts.id.initialize({
            client_id: "120198566642-aeqbm64odquin83oh73oa4heint84uu4.apps.googleusercontent.com",
            callback: handleGoogleSignIn
        });

        const googleSigninDiv = document.getElementById("google-signin");
        if (googleSigninDiv) {
            window.google.accounts.id.renderButton(googleSigninDiv, { 
                theme: "outline", 
                size: "large",
                text: "sign_in_with",
                shape: "rectangular"
            });
        }
    } catch (error) {
        console.error('Google Auth initialization failed:', error);
    }
};

const handleGoogleSignIn = (response) => {
    const responsePayload = decodeJwtResponse(response.credential);
    
    const profileData = {
        name: responsePayload.name,
        email: responsePayload.email,
        picture: responsePayload.picture,
        provider: 'google'
    };

    showUserProfile(profileData);
};

const decodeJwtResponse = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}; 