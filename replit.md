# Miriam's Study App

## Overview

A personalized study companion Progressive Web App (PWA) designed for BSc (NQ) studies. The app provides weekly study schedules, subject workflows, task checklists, a Pomodoro timer, mood tracking, and personal features like love notes and reunion countdowns. Built as a mobile-first single-page application with offline capability.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool with SWC for fast compilation
- **React Router** for client-side navigation with a bottom navigation pattern

### UI Architecture
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling with custom CSS variables for theming
- **Framer Motion** for animations and transitions
- **Dark/Light mode** support via CSS class toggling on document root

### State Management
- **React Query (TanStack Query)** for server state management
- **localStorage** for persistent client-side data (mood history, checklist progress, timer sessions, notes, photos)
- **React useState/useEffect** for component-level state

### PWA Configuration
- **vite-plugin-pwa** with Workbox for service worker generation
- Configured for auto-update registration
- Manifest includes app icons and standalone display mode
- Caches JS, CSS, HTML, and static assets for offline use

### Routing Structure
The app uses a mobile-first bottom navigation pattern with these main routes:
- `/` - Schedule (weekly timetable)
- `/subjects` - Course workflows and study plans
- `/checklist` - Daily task tracking
- `/love` - Personal love notes and reunion countdown
- `/more` - Additional features (timer, gallery, progress, notes)
- `/timer` - Pomodoro study timer
- `/gallery` - Photo memories
- `/progress` - Study streak and statistics
- `/notes` - Subject-specific study notes

### Data Layer
- All data is stored client-side in localStorage
- Schedule data is statically defined in `src/data/scheduleData.ts`
- No backend database currently configured

### Styling Approach
- CSS variables defined in `src/index.css` for theme colors
- Course-specific color coding (math, physics, biology, chemistry, computing, communication)
- Custom font families: Inter (sans-serif) and Playfair Display (serif)
- Responsive design with mobile-first approach

## External Dependencies

### UI Component Libraries
- Radix UI primitives (dialog, popover, tabs, accordion, etc.)
- Lucide React for icons
- cmdk for command palette functionality
- embla-carousel-react for carousels
- react-day-picker for calendar components
- vaul for drawer components

### Animation & Interaction
- Framer Motion for page transitions and micro-interactions
- Class Variance Authority (CVA) for component variant management

### Form Handling
- React Hook Form with @hookform/resolvers for form validation

### Date Utilities
- date-fns for date manipulation and formatting

### Build & Development
- Vite with React SWC plugin
- TypeScript with relaxed strict mode settings
- ESLint with React Hooks and React Refresh plugins
- PostCSS with Tailwind and Autoprefixer

### Third-Party Services
- Google Fonts (Inter, Playfair Display) loaded via CDN
- No external APIs or backend services currently integrated
- Lovable platform integration via lovable-tagger (development only)