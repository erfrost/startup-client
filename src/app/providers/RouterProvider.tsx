import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

interface RouterProviderProps {
  children: ReactNode;
}

const RouterProvider = ({ children }: RouterProviderProps) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default RouterProvider;
