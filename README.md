# Portfolio Website

A modern, interactive portfolio website built with React, TypeScript, and Framer Motion.

## Features

### Interactive About Page

The About page features a unique interactive experience with 6 animated strands that reveal progressively:

- **Progressive Animation Reveal**: Each strand contains a different animation component that becomes visible as users progress through the content
- **Animated Strands**: Features 6 different animations including:
  - StarField (reduced star count for performance)
  - ShootingStars
  - PebblesPhysics (Matter.js physics simulation)
  - WaveParallax (animated wave layers)
  - MountainParallax (mountain landscape animation)
  - DayNightCycle (sun movement animation)
- **Interactive Navigation**: Next button reveals new strands and content, with final step navigating to Contact page
- **Progress Indicator**: Visual dots showing current progress through the 6 steps
- **Responsive Design**: Optimized for all screen sizes with proper container constraints

### Other Features

- Smooth scrolling with Lenis
- Performance optimizations for animations
- SEO optimization
- Contact form with EmailJS integration
- Loading screen with transitions
- Responsive design with Tailwind CSS

## Technologies Used

- React 19
- TypeScript
- Framer Motion
- Tailwind CSS
- Matter.js (for physics animations)
- EmailJS (for contact form)
- Lenis (for smooth scrolling)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables for EmailJS (see EMAILJS_SETUP.md)
4. Run development server: `npm run dev`
5. Build for production: `npm run build`

## Project Structure

```
src/
├── components/
│   ├── About.tsx          # Interactive About page with animated strands
│   ├── StarField.tsx      # Canvas-based star animation
│   ├── ShootingStars.tsx  # Shooting stars animation
│   ├── PebblesPhysics.tsx # Matter.js physics simulation
│   ├── WaveParallax.tsx   # Animated wave layers
│   ├── MountainParallax.tsx # Mountain landscape animation
│   ├── DayNightCycle.tsx  # Sun movement animation
│   └── ...
├── pages/                 # Page components
├── hooks/                 # Custom React hooks
└── utils/                 # Utility functions
```

## Performance Optimizations

- Reduced star count in StarField for strand layout
- Canvas-based animations optimized for container constraints
- Proper cleanup of animation loops
- Responsive design with mobile-first approach
- Lazy loading and code splitting where appropriate

## Browser Support

- Modern browsers with ES6+ support
- Canvas API support for animations
- WebGL support for advanced graphics (optional)
