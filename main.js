document.addEventListener('DOMContentLoaded', () => {
    // Initialize core features first
    initializeNavigation();
    initializeGearCalculator();
    initializeAnimations();
    initializeDashboard();
    initializeWorkshops();
    
    // Initialize auth with delay to ensure libraries are loaded
    setTimeout(() => {
        initializeGoogleAuth();
        initializeMicrosoftAuth();
        
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', handleLogout);
        }
        
        // Check for existing session after auth is set up
        setTimeout(checkExistingSession, 200);
    }, 100);
    
    showSection('dashboard');
});

// Global event listeners
window.addEventListener('resize', (() => {
    let timeout;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (currentSection === 'calculator') refreshGearCalculator();
        }, 250);
    };
})());

document.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey) {
        const sections = ['dashboard', 'calculator', 'animations', 'workshops'];
        const key = parseInt(e.key);
        if (key >= 1 && key <= 4) {
            e.preventDefault();
            showSection(sections[key - 1]);
        }
    }
}); 