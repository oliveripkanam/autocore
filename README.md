# AutoCore

Interactive learning platform for teaching gear mechanics with Google and Microsoft authentication.

## Project Structure

### Root Files
- `index.html` - Main application entry point that browsers load first
- `main.js` - Application coordinator that initializes all modules and features  
- `main.css` - Style orchestrator that imports all CSS from organized modules

### Core Directories

**`features/`** - Feature-specific code organized by functionality
- `features/dashboard/` - Dashboard page logic and styles for learning path and quick access
- `features/calculator/` - Interactive gear ratio calculator with visual animations
- `features/animations/` - Animated demonstrations of manual transmission and CVT systems
- `features/workshops/` - Workshop sections with hands-on practice content

**`shared/`** - Reusable components and utilities used across multiple features
- `shared/auth/` - Authentication modules for Google OAuth, Microsoft MSAL, and profile management
- `shared/utils/` - Common utilities for navigation, notifications, and app-wide functionality
- `shared/styles/` - Organized CSS including variables, layout, and reusable component styles
- `shared/config.js` - Application configuration and settings

**`assets/`** - Static files like images and icons
- Contains fallback profile images and other media assets

**`docs/`** - Project documentation and checklists
- Contains deployment checklist and other project documentation

## Local Development

**NOTE:** To run locally just do `python -m http.server 3000` then visit `http://localhost:3000` 