import { useState, useEffect } from "react";
import { isLowPerformanceDevice } from "../utils/performance";

interface PerformanceSettings {
  starCount: number;
  animationFPS: number;
  enablePhysics: boolean;
  enableVHSGrain: boolean;
  enableShootingStars: boolean;
  enableDayNightCycle: boolean;
  reducedMotion: boolean;
}

export const usePerformance = () => {
  const [settings, setSettings] = useState<PerformanceSettings>({
    starCount: 200,
    animationFPS: 30,
    enablePhysics: true,
    enableVHSGrain: true,
    enableShootingStars: true,
    enableDayNightCycle: true,
    reducedMotion: false,
  });

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Check if device is low performance
    const isLowPerformance = isLowPerformanceDevice();

    if (isLowPerformance || prefersReducedMotion) {
      setSettings({
        starCount: 100,
        animationFPS: 24,
        enablePhysics: true,
        enableVHSGrain: false, // Disable VHS grain on low performance devices
        enableShootingStars: false, // Disable shooting stars on low performance devices
        enableDayNightCycle: true,
        reducedMotion: prefersReducedMotion,
      });
    } else {
      // High performance device settings
      setSettings({
        starCount: 200,
        animationFPS: 30,
        enablePhysics: true,
        enableVHSGrain: true,
        enableShootingStars: true,
        enableDayNightCycle: true,
        reducedMotion: false,
      });
    }

    // Listen for changes in reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => {
      setSettings((prev) => ({
        ...prev,
        reducedMotion: e.matches,
        animationFPS: e.matches ? 24 : 30,
      }));
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Function to update settings manually
  const updateSettings = (newSettings: Partial<PerformanceSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Function to get optimized settings for specific components
  const getComponentSettings = (componentName: string) => {
    switch (componentName) {
      case "StarField":
        return {
          starCount: settings.starCount,
          animationFPS: settings.animationFPS,
        };
      case "PebblesPhysics":
        return {
          enabled: settings.enablePhysics,
          animationFPS: settings.animationFPS,
        };
      case "VHSGrainOverlay":
        return {
          enabled: settings.enableVHSGrain,
          intensity: settings.reducedMotion ? 0.2 : 0.5,
          speed: settings.reducedMotion ? 0.3 : 0.5,
        };
      case "ShootingStars":
        return {
          enabled: settings.enableShootingStars,
          animationFPS: settings.animationFPS,
        };
      case "DayNightCycle":
        return {
          enabled: settings.enableDayNightCycle,
          animationFPS: settings.animationFPS,
        };
      default:
        return {};
    }
  };

  return {
    settings,
    updateSettings,
    getComponentSettings,
    isLowPerformance: isLowPerformanceDevice(),
  };
};
