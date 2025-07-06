const showUserProfile = (profileData) => {
    document.getElementById('signin-buttons').style.display = 'none';
    document.getElementById('user-profile').style.display = 'flex';
    
    const avatarElement = document.getElementById('user-avatar');
    avatarElement.src = profileData.picture;
    avatarElement.onerror = () => {
        avatarElement.src = 'assets/grayicon.png';
    };
    
    document.getElementById('user-name').textContent = profileData.name;
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    
    const firstName = profileData.name.split(' ')[0];
    showNotification(`Welcome, ${firstName}!`, 'success');
};

const handleLogout = async () => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    
    localStorage.removeItem('userProfile');
    
    document.getElementById('signin-buttons').style.display = 'flex';
    document.getElementById('user-profile').style.display = 'none';
    
    if (userProfile?.provider === 'microsoft' && msalInstance) {
        await msalInstance.logoutPopup();
    } else if (userProfile?.provider === 'google') {
        window.google.accounts.id.disableAutoSelect();
    }
    
    showNotification('Logged out successfully', 'info');
};

const checkExistingSession = () => {
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
        const profile = JSON.parse(userProfile);
        document.getElementById('signin-buttons').style.display = 'none';
        document.getElementById('user-profile').style.display = 'flex';
        
        const avatarElement = document.getElementById('user-avatar');
        avatarElement.src = profile.picture;
        avatarElement.onerror = () => {
            avatarElement.src = 'assets/grayicon.png';
        };
        
        document.getElementById('user-name').textContent = profile.name;
    }
};

const showProfileModal = () => {
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
        const profile = JSON.parse(userProfile);
        
        const modalAvatarElement = document.getElementById('modal-user-avatar');
        modalAvatarElement.src = profile.picture;
        modalAvatarElement.onerror = () => {
            modalAvatarElement.src = 'assets/grayicon.png';
        };
        
        document.getElementById('modal-user-name').textContent = profile.name;
        document.getElementById('modal-user-email').textContent = profile.email;
        document.getElementById('profile-modal').style.display = 'flex';
    }
};

const hideProfileModal = () => {
    document.getElementById('profile-modal').style.display = 'none';
};

document.addEventListener('click', (e) => {
    const modal = document.getElementById('profile-modal');
    if (e.target === modal) {
        hideProfileModal();
    }
}); 