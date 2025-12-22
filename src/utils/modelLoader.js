import { useEffect, useState, useRef } from 'react';

/**
 * Progressive loading hook for 3D models
 * @param {string} priority - 'immediate', 'deferred', or 'lazy'
 * @param {string} triggerId - Optional element ID to trigger lazy loading
 * @returns {boolean} shouldLoad - Whether the component should load
 */
export const useProgressiveLoad = (priority = 'immediate', triggerId = null) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    if (priority === 'immediate') {
      setShouldLoad(true);
    } else if (priority === 'deferred') {
      // Load hero 3D after page becomes interactive (1 second)
      const timer = setTimeout(() => setShouldLoad(true), 1000);
      return () => clearTimeout(timer);
    } else if (priority === 'lazy') {
      // Load on scroll near viewport using IntersectionObserver
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observerRef.current?.disconnect();
          }
        },
        { rootMargin: '200px' } // Load 200px before visible
      );

      const target = triggerId
        ? document.getElementById(triggerId)
        : document.querySelector(`[data-load-trigger="${priority}"]`);

      if (target) {
        observerRef.current.observe(target);
      } else {
        // Fallback: load after 2 seconds if no trigger found
        const timer = setTimeout(() => setShouldLoad(true), 2000);
        return () => clearTimeout(timer);
      }

      return () => observerRef.current?.disconnect();
    }
  }, [priority, triggerId]);

  return shouldLoad;
};

/**
 * Performance monitoring hook
 * Detects device capability and adjusts quality settings
 */
export const usePerformanceMode = () => {
  const [performanceMode, setPerformanceMode] = useState('high');

  useEffect(() => {
    // Detect device capability
    const memoryGB = navigator.deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const isLowEnd = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let mode = 'high';

    if (isLowEnd) {
      mode = 'low';
    } else if (isMobile || memoryGB < 4 || cores < 4) {
      mode = 'medium';
    }
    if (memoryGB < 2 || cores < 2) {
      mode = 'low';
    }

    setPerformanceMode(mode);

    // FPS monitoring - drop quality if below 30fps
    let lastTime = performance.now();
    let frames = 0;
    let rafId;
    const fpsThreshold = 30;

    const checkFPS = (currentTime) => {
      frames++;
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - lastTime));

        if (fps < fpsThreshold && mode !== 'low') {
          setPerformanceMode('low');
        }

        frames = 0;
        lastTime = currentTime;
      }
      rafId = requestAnimationFrame(checkFPS);
    };

    rafId = requestAnimationFrame(checkFPS);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return performanceMode;
};

/**
 * Quality settings based on performance mode
 */
export const getQualitySettings = (mode) => {
  const settings = {
    high: {
      particleCount: 50,
      shadowMapSize: 2048,
      antialias: true,
      postprocessing: true,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
      bloomIntensity: 1.0,
    },
    medium: {
      particleCount: 25,
      shadowMapSize: 1024,
      antialias: true,
      postprocessing: true,
      pixelRatio: Math.min(window.devicePixelRatio, 1.5),
      bloomIntensity: 0.7,
    },
    low: {
      particleCount: 10,
      shadowMapSize: 512,
      antialias: false,
      postprocessing: false,
      pixelRatio: 1,
      bloomIntensity: 0.5,
    },
  };

  return settings[mode] || settings.medium;
};
