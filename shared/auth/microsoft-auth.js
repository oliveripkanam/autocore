let msalInstance;

const initializeMicrosoftAuth = () => {
    // Wait for MSAL library to load
    if (typeof msal === 'undefined') {
        console.log('MSAL library not loaded yet, retrying...');
        setTimeout(initializeMicrosoftAuth, 500);
        return;
    }

    try {
        const msalConfig = {
            auth: {
                clientId: "0294a24b-c318-48fb-8256-ebd582bb07e7",
                authority: "https://login.microsoftonline.com/common",
                redirectUri: window.location.origin
            }
        };

        msalInstance = new msal.PublicClientApplication(msalConfig);
        
        const microsoftSigninBtn = document.getElementById('microsoft-signin');
        if (microsoftSigninBtn) {
            microsoftSigninBtn.addEventListener('click', handleMicrosoftSignIn);
        }
    } catch (error) {
        console.error('Microsoft Auth initialization failed:', error);
    }
};

const handleMicrosoftSignIn = async () => {
    if (!msalInstance) {
        console.error('Microsoft Auth not initialized');
        return;
    }

    try {
        const loginRequest = {
            scopes: ["openid", "profile", "User.Read"]
        };

        const response = await msalInstance.loginPopup(loginRequest);
        
        const graphResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
            headers: {
                'Authorization': `Bearer ${response.accessToken}`
            }
        });
        
        const userProfile = await graphResponse.json();
        
        const profileData = {
            name: userProfile.displayName,
            email: userProfile.mail || userProfile.userPrincipalName,
            picture: `https://graph.microsoft.com/v1.0/me/photo/$value`,
            provider: 'microsoft'
        };

        showUserProfile(profileData);
        
    } catch (error) {
        console.error('Microsoft sign-in error:', error);
        showNotification('Microsoft sign-in failed', 'error');
    }
}; 