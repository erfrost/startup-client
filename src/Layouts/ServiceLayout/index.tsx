import { ReactNode, useEffect } from "react";
import { io } from "socket.io-client";

interface ServiceLayoutProps {
  children: ReactNode;
}

const ServiceLayout = ({ children }: ServiceLayoutProps) => {
  useEffect(() => {
    const userId: string | null = localStorage.getItem("user_id");
    if (!userId) return;

    const socket = io(`ws://localhost:8000/user?user_id=${userId}`);

    return () => {
      socket.off("message");
    };
  }, []);

  return children;
};

export default ServiceLayout;
