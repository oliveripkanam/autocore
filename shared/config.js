/**
 * Configuration file for Gearbox Fundamentals Platform
 */

const PLATFORM_CONFIG = {
    // Application metadata
    app: {
        name: "Gearbox Fundamentals",
        version: "1.0.0",
        description: "Interactive Learning Platform for Gear Mechanics"
    },

    // Theme configuration
    theme: {
        primaryColor: "#1E3A8A",
        secondaryColor: "#059669",
        accentColor: "#F59E0B",
        mode: "light",
        animations: true
    },

    // Learning path configuration
    learningPath: [
        { id: 1, title: "Introduction", description: "Basic concepts", status: "completed" },
        { id: 2, title: "Manual Transmission", description: "How gears engage", status: "completed" },
        { id: 3, title: "Gear Ratios", description: "Interactive calculator", status: "current" },
        { id: 4, title: "CVT Systems", description: "Continuous variation", status: "locked" },
        { id: 5, title: "Applications", description: "Real-world usage", status: "locked" }
    ],

    // Calculator configuration
    calculator: {
        teeth: { min: 10, max: 100, defaultInput: 20, defaultOutput: 60 },
        animations: { baseSpeed: 4000, enabled: true },
        examples: {
            automotive: {
                first: { ratio: "> 2.5", description: "First gear - high torque for starting" },
                cruise: { ratio: "0.8 - 1.5", description: "Cruise gear - balanced efficiency" },
                overdrive: { ratio: "< 0.8", description: "Overdrive - fuel economy" }
            }
        }
    },

    // Workshop configurations
    workshops: [
        {
            id: "automotive",
            title: "Automotive Gearbox Design",
            icon: "fas fa-car",
            description: "Design a complete gearbox for different vehicle types",
            features: ["Interactive CAD", "Performance Analysis", "Cost Optimization"]
        },
        {
            id: "bicycle",
            title: "Bicycle Gear Systems",
            icon: "fas fa-bicycle",
            description: "Explore multi-speed bicycle transmission systems",
            features: ["Derailleur Systems", "Hub Gears", "Efficiency Analysis"]
        },
        {
            id: "industrial",
            title: "Industrial Applications",
            icon: "fas fa-cogs",
            description: "Heavy machinery and industrial gear systems",
            features: ["Load Calculations", "Material Selection", "Safety Factors"]
        }
    ],

    // Animation configurations
    animations: [
        {
            id: "manual_transmission",
            title: "Manual Transmission",
            description: "See how gears engage and disengage in a manual transmission system",
            type: "interactive",
            duration: 45
        },
        {
            id: "cvt_system",
            title: "CVT System",
            description: "Understand continuous variable transmission with smooth ratio changes",
            type: "interactive",
            duration: 60
        }
    ],

    // Feature flags
    features: {
        progressTracking: true,
        bookmarks: true,
        notes: true,
        sharing: false,
        offline: false,
        analytics: false,
        gamification: { enabled: true, badges: true, leaderboard: false, points: true }
    }
};

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PLATFORM_CONFIG;
}

// Make available globally for browser use
if (typeof window !== 'undefined') {
    window.PLATFORM_CONFIG = PLATFORM_CONFIG;
} 