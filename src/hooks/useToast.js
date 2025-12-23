import { createContext, useContext } from "react";

// Toast Context for global access
export const ToastContext = createContext(null);

/**
 * Hook to use toast notifications
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
