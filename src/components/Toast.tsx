// Toast.tsx
import { useEffect } from "react";

type ToastProps = {
  message: string;
  onClose: () => void;
};

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Försvinner efter 3 sekunder

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#22c55e",
      color: "white",
      padding: "1rem 2rem",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
      fontWeight: "bold",
      zIndex: 1000,
    }}>
      {message}
    </div>
  );
}
