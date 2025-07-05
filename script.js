// Global variables
let currentSection = 'dashboard';

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeGearCalculator();
    initializeAnimations();
    initializeGoogleAuth();
    showSection('dashboard');
});

/**
 * Navigation System
 */
const initializeNavigation = () => {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetSection = link.getAttribute('href').substring(1);
            showSection(targetSection);
            updateActiveNavLink(link);
        });
    });
};

const showSection = sectionId => {
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
    }
    
    updateActiveNavLink();
    
    // Trigger section-specific initialization
    if (sectionId === 'calculator') refreshGearCalculator();
    if (sectionId === 'animations') startAnimations();
};

const updateActiveNavLink = (clickedLink = null) => {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if ((clickedLink && link === clickedLink) || 
            (!clickedLink && link.getAttribute('href') === `#${currentSection}`)) {
            link.classList.add('active');
        }
    });
};

/**
 * Google Authentication System
 */
const initializeGoogleAuth = () => {
    window.google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace with your actual client ID
        callback: handleGoogleSignIn
    });

    window.google.accounts.id.renderButton(
        document.getElementById("google-signin"),
        { 
            theme: "outline", 
            size: "large",
            text: "sign_in_with",
            shape: "rectangular"
        }
    );

    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    
    // Check for existing session
    setTimeout(checkExistingSession, 100);
};

const handleGoogleSignIn = (response) => {
    const responsePayload = decodeJwtResponse(response.credential);
    
    // Show user profile
    document.getElementById('google-signin').style.display = 'none';
    document.getElementById('user-profile').style.display = 'flex';
    
    // Update profile info
    document.getElementById('user-avatar').src = responsePayload.picture;
    document.getElementById('user-name').textContent = responsePayload.name;
    
    // Store user info
    localStorage.setItem('userProfile', JSON.stringify(responsePayload));
    
    showNotification(`Welcome, ${responsePayload.given_name}!`, 'success');
};

const handleLogout = () => {
    // Clear user data
    localStorage.removeItem('userProfile');
    
    // Update UI
    document.getElementById('google-signin').style.display = 'block';
    document.getElementById('user-profile').style.display = 'none';
    
    // Sign out from Google
    window.google.accounts.id.disableAutoSelect();
    
    showNotification('Logged out successfully', 'info');
};

const decodeJwtResponse = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

const checkExistingSession = () => {
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
        const profile = JSON.parse(userProfile);
        document.getElementById('google-signin').style.display = 'none';
        document.getElementById('user-profile').style.display = 'flex';
        document.getElementById('user-avatar').src = profile.picture;
        document.getElementById('user-name').textContent = profile.name;
    }
};

/**
 * Gear Calculator System
 */
const initializeGearCalculator = () => {
    const inputTeethSlider = document.getElementById('inputTeeth');
    const outputTeethSlider = document.getElementById('outputTeeth');
    
    if (inputTeethSlider && outputTeethSlider) {
        [inputTeethSlider, outputTeethSlider].forEach(slider => 
            slider.addEventListener('input', updateGearCalculation)
        );
        updateGearCalculation();
    }
};

const updateGearCalculation = () => {
    const inputTeeth = parseInt(document.getElementById('inputTeeth').value);
    const outputTeeth = parseInt(document.getElementById('outputTeeth').value);
    
    // Update display values
    document.getElementById('inputValue').textContent = inputTeeth;
    document.getElementById('outputValue').textContent = outputTeeth;
    document.getElementById('inputTeethDisplay').textContent = inputTeeth;
    document.getElementById('outputTeethDisplay').textContent = outputTeeth;
    
    // Calculate gear ratio
    const gearRatio = outputTeeth / inputTeeth;
    
    // Update results display
    updateGearResults(inputTeeth, outputTeeth, gearRatio);
    updateGearVisuals(inputTeeth, outputTeeth);
};

const updateGearResults = (inputTeeth, outputTeeth, gearRatio) => {
    // Format results
    const ratioText = gearRatio > 1 ? `1:${gearRatio.toFixed(1)}` : `${(1/gearRatio).toFixed(1)}:1`;
    const speedText = gearRatio > 1 ? `${gearRatio.toFixed(1)}x slower` : `${(1/gearRatio).toFixed(1)}x faster`;
    const torqueText = gearRatio > 1 ? `${gearRatio.toFixed(1)}x stronger` : `${(1/gearRatio).toFixed(1)}x weaker`;
    
    // Update DOM elements
    document.getElementById('gearRatio').textContent = ratioText;
    document.getElementById('speedChange').textContent = speedText;
    document.getElementById('torqueChange').textContent = torqueText;
    
    // Update practical example
    updatePracticalExample(gearRatio);
};

const updatePracticalExample = gearRatio => {
    const examples = [
        [2.5, 'first gear - high torque for starting from a stop or climbing steep hills, but limited top speed'],
        [1.5, 'second or third gear - balanced power and speed for normal driving conditions'],
        [0.8, 'fourth gear - good balance of acceleration and efficiency for highway cruising'],
        [0, 'fifth gear or overdrive - optimized for high-speed efficiency with reduced engine RPM']
    ];
    
    const example = examples.find(([threshold]) => gearRatio > threshold)?.[1] || examples[examples.length - 1][1];
    document.getElementById('practicalExample').innerHTML = `<strong>Real-world example:</strong> Like using ${example}.`;
};

const updateGearVisuals = (inputTeeth, outputTeeth) => {
    const inputGear = document.getElementById('inputGear');
    const outputGear = document.getElementById('outputGear');
    
    if (inputGear && outputGear) {
        // Calculate relative sizes (base size 120px, range 80-160px)
        const calcSize = teeth => 80 + ((teeth - 10) / 90) * 80;
        const inputSize = calcSize(inputTeeth);
        const outputSize = calcSize(outputTeeth);
        
        inputGear.style.width = inputGear.style.height = `${inputSize}px`;
        outputGear.style.width = outputGear.style.height = `${outputSize}px`;
        
        // Update animation speed based on gear ratio
        const gearRatio = outputTeeth / inputTeeth;
        const inputSpeed = 4;
        const outputSpeed = inputSpeed * gearRatio;
        
        inputGear.style.animationDuration = `${inputSpeed}s`;
        outputGear.style.animationDuration = `${outputSpeed}s`;
    }
};

const refreshGearCalculator = () => {
    if (document.getElementById('inputTeeth')) updateGearCalculation();
};

/**
 * Animation System
 */
const initializeAnimations = () => {
    // Add click listeners to animation buttons
    document.querySelectorAll('.animation-card .btn-primary').forEach((button, index) => {
        button.addEventListener('click', () => handleAnimationClick(index));
    });
    
    // Add click listeners to workshop buttons
    document.querySelectorAll('.workshop-card .btn-secondary').forEach((button, index) => {
        button.addEventListener('click', () => handleWorkshopClick(index));
    });
};

const handleAnimationClick = animationIndex => {
    const animationTitles = ['Manual Transmission', 'CVT System'];
    const title = animationTitles[animationIndex] || 'Animation';
    showNotification(`${title} animation would play here. This is a demo version.`, 'info');
};

const handleWorkshopClick = workshopIndex => {
    const workshopTitles = ['Automotive Gearbox Design', 'Bicycle Gear Systems', 'Industrial Applications'];
    const title = workshopTitles[workshopIndex] || 'Workshop';
    showNotification(`${title} workshop would start here. This is a demo version.`, 'info');
};

const startAnimations = () => {
    document.querySelectorAll('.demo-gear, .cvt-pulley').forEach(element => {
        element.style.animationPlayState = 'running';
    });
};

/**
 * Utility Functions
 */
const showNotification = (message, type = 'info') => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles if not already added
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification { position: fixed; top: 20px; right: 20px; max-width: 400px; padding: 1rem; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); z-index: 1000; background: white; border-left: 4px solid var(--primary-blue); animation: slideInRight 0.3s ease; }
            .notification.info { border-left-color: var(--primary-blue); background: var(--light-blue); }
            .notification.success { border-left-color: var(--primary-green); background: var(--light-green); }
            .notification.warning { border-left-color: var(--accent-orange); background: #FEF3C7; }
            .notification-content { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
            .notification-close { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--gray-600); padding: 0; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; }
            .notification-close:hover { color: var(--gray-900); }
            @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes slideOutRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Add close functionality
    notification.querySelector('.notification-close').addEventListener('click', () => removeNotification(notification));
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) removeNotification(notification);
    }, 5000);
};

const removeNotification = notification => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
        if (document.body.contains(notification)) document.body.removeChild(notification);
    }, 300);
};

/**
 * Event Listeners
 */
// Resize handler
window.addEventListener('resize', (() => {
    let timeout;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (currentSection === 'calculator') refreshGearCalculator();
        }, 250);
    };
})());

// Keyboard navigation
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

// Export functions for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { showSection, updateGearCalculation, showNotification };
} 