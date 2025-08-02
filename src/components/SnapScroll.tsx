import React, { useEffect, useRef } from "react";

interface SnapScrollProps {
  children: React.ReactNode;
}

const SnapScroll: React.FC<SnapScrollProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Get the existing Lenis instance
    const lenis = (
      window as unknown as {
        lenis: {
          scroll: number;
          scrollTo: (target: number, options: any) => void;
        };
      }
    ).lenis;
    if (!lenis) {
      console.warn("Lenis not found. Make sure it's initialized in App.tsx");
      return;
    }

    // Handle wheel events for snap scrolling
    const handleWheel = (e: WheelEvent) => {
      // Always prevent default scrolling
      e.preventDefault();

      if (isScrollingRef.current) {
        return;
      }

      const currentScroll = lenis.scroll;
      const windowHeight = window.innerHeight;

      // Get all snap sections
      const snapSections =
        containerRef.current?.querySelectorAll("[data-snap]");
      if (!snapSections || snapSections.length === 0) return;

      // Convert to array and get snap points, sorted by value
      const snapPoints = Array.from(snapSections)
        .map((section) => {
          const snapValue = section.getAttribute("data-snap");
          return snapValue ? parseInt(snapValue) : 0;
        })
        .sort((a, b) => a - b);

      // Determine scroll direction
      const scrollDirection = e.deltaY > 0 ? 1 : -1;

      // Find current section (snap to nearest section first)
      const currentSection = Math.round(currentScroll / windowHeight);
      const currentSnapPosition = currentSection * windowHeight;

      // If we're not exactly at a snap point, snap to the current section first
      if (Math.abs(currentScroll - currentSnapPosition) > 10) {
        isScrollingRef.current = true;
        lenis.scrollTo(currentSnapPosition, {
          duration: 0.8,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        } as { duration: number; easing: (t: number) => number });

        setTimeout(() => {
          isScrollingRef.current = false;
        }, 800);
        return;
      }

      // Find next/previous snap point based on direction
      let nextSnap = currentSnapPosition;

      if (scrollDirection > 0) {
        // Scrolling down - find next snap point
        const nextIndex = snapPoints.findIndex(
          (point) => point > currentSection
        );
        if (nextIndex !== -1) {
          nextSnap = snapPoints[nextIndex] * windowHeight;
        }
      } else {
        // Scrolling up - find previous snap point
        const prevIndex = snapPoints.findIndex(
          (point: number) => point < currentSection
        );
        if (prevIndex !== -1) {
          nextSnap = snapPoints[prevIndex] * windowHeight;
        }
      }

      // Only scroll if we're changing to a different section
      if (nextSnap !== currentSnapPosition) {
        isScrollingRef.current = true;
        lenis.scrollTo(nextSnap, {
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        } as { duration: number; easing: (t: number) => number });

        // Reset scrolling flag after animation
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 1200);
      }
    };

    // Add wheel event listener
    containerRef.current.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {children}
    </div>
  );
};

export default SnapScroll;
