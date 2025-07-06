let currentSection = 'dashboard';

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