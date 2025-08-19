# Performance Optimizations

This document outlines the performance optimizations implemented to make the website run smoothly and eliminate glitchy/jolty behavior.

## Issues Identified

1. **Multiple Heavy Animations Running Simultaneously**

   - DayNightCycle with complex scroll-based transforms
   - PebblesPhysics with Matter.js physics engine
   - StarField with 750 stars animating continuously
   - ShootingStars with trail effects
   - VHSGrainOverlay with multiple animated gradients

2. **Excessive Star Count**: 750 stars in StarField was very high for smooth performance

3. **Complex Scroll-Based Animations**: DayNightCycle used many `useTransform` calls with complex arrays

4. **Physics Engine Running Continuously**: Matter.js physics simulation was computationally expensive

5. **Multiple Canvas Animations**: Several components used `requestAnimationFrame` simultaneously

## Optimizations Implemented

### 1. Dynamic Performance Management

- **Performance Hook** (`usePerformance.ts`): Automatically detects device capabilities and user preferences
- **Reduced Motion Support**: Respects `prefers-reduced-motion` media query
- **Device Detection**: Identifies low-performance devices and mobile devices
- **Conditional Rendering**: Disables heavy animations on low-performance devices

### 2. StarField Optimizations

- **Reduced Star Count**: From 750 to 200 (or 100 on low-performance devices)
- **Frame Rate Limiting**: Limited to 30 FPS for better performance
- **Simplified Effects**: Reduced twinkling and brightening complexity
- **Batch Drawing**: Optimized canvas rendering with fewer state changes

### 3. DayNightCycle Optimizations

- **Simplified Transforms**: Reduced keyframes from 9 to 5 for smoother interpolation
- **Reduced Animation Intensity**: Smaller scale and opacity changes
- **Longer Durations**: Increased animation duration for smoother movement
- **Optimized Motion Parameters**: Reduced radius and movement range

### 4. ShootingStars Optimizations

- **Reduced Star Count**: From 6 to 3 concurrent stars
- **Simplified Trails**: Reduced trail points from 15 to 8
- **Frame Rate Limiting**: Limited to 30 FPS
- **Reduced Effects**: Simplified glow and shadow effects
- **Longer Delays**: Increased time between star spawns

### 5. VHSGrainOverlay Optimizations

- **Reduced Gradient Layers**: From 5 to 3 gradient layers
- **Simplified Animations**: Longer durations for smoother movement
- **Conditional Rendering**: Disabled on low-performance devices
- **Reduced Intensity**: Lower opacity values for better performance

### 6. PebblesPhysics Optimizations

- **Reduced Pebble Count**: From 12/24 to 8/16 pebbles
- **Optimized Physics**: Adjusted gravity, friction, and density for stability
- **Frame Rate Limiting**: Limited to 30 FPS
- **Faster Drop**: Reduced drop duration from 2.5s to 2s
- **Reduced Image Count**: From 12 to 6 pebble images

### 7. Performance Utilities

- **PerformanceManager**: Singleton class for managing frame rates and throttling
- **Optimized Animation Loops**: Wrapper for `requestAnimationFrame` with frame limiting
- **Memory Management**: Utilities for canvas cleanup and resizing
- **Throttling/Debouncing**: Functions for optimizing event handlers

## Performance Settings by Device Type

### High-Performance Devices

- Star Count: 200
- Animation FPS: 30
- All animations enabled
- VHS grain: 50% intensity
- Smooth scrolling: 1.2s duration

### Low-Performance Devices

- Star Count: 100
- Animation FPS: 24
- VHS grain disabled
- Shooting stars disabled
- Smooth scrolling: 0.8s duration

### Reduced Motion Preference

- Star Count: 100
- Animation FPS: 24
- VHS grain: 20% intensity
- Faster transitions
- Less sensitive scrolling

## Browser Compatibility

The optimizations work across all modern browsers and include:

- **Mobile Detection**: Automatic optimization for mobile devices
- **Hardware Concurrency**: Checks CPU cores for performance estimation
- **Reduced Motion**: Respects accessibility preferences
- **Canvas Optimization**: Efficient rendering for all screen sizes

## Monitoring Performance

To monitor performance improvements:

1. **Chrome DevTools**: Use Performance tab to measure frame rates
2. **Lighthouse**: Run audits to check for performance regressions
3. **Real User Monitoring**: Check actual device performance
4. **Frame Rate**: Target 30+ FPS on all devices

## Future Optimizations

Consider these additional optimizations if needed:

1. **Web Workers**: Move heavy calculations to background threads
2. **WebGL**: Use WebGL for complex visual effects
3. **Lazy Loading**: Load animations only when needed
4. **Progressive Enhancement**: Start with basic animations, enhance for capable devices
5. **Asset Optimization**: Compress images and use WebP format

## Usage

The performance optimizations are automatic and require no user intervention. The system:

1. Detects device capabilities on load
2. Applies appropriate settings
3. Monitors for preference changes
4. Adjusts performance in real-time

All optimizations maintain the visual appeal while ensuring smooth performance across all devices.
