/**
 * Mobile device detection and touch handling utilities
 */

/**
 * Check if the current device is a mobile device
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === "undefined") return false;

  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    ) ||
    ("ontouchstart" in window && window.innerWidth <= 768)
  );
};

/**
 * Check if the device supports touch
 */
export const isTouchDevice = (): boolean => {
  if (typeof window === "undefined") return false;

  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

/**
 * Trigger haptic feedback for touch devices
 */
export const triggerHapticFeedback = (
  intensity: "light" | "medium" | "heavy" = "light",
): void => {
  if (!isTouchDevice() || !("vibrate" in navigator)) return;

  const patterns = {
    light: [10],
    medium: [20],
    heavy: [30],
  };

  navigator.vibrate(patterns[intensity]);
};

/**
 * Get optimal touch target size for mobile
 */
export const getTouchTargetSize = (): string => {
  return isMobileDevice() ? "48px" : "44px";
};

/**
 * Check if device prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};
