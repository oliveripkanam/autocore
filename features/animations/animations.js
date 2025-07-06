const initializeAnimations = () => {
    document.querySelectorAll('.animation-card .btn-primary').forEach((button, index) => {
        button.addEventListener('click', () => handleAnimationClick(index));
    });
    
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