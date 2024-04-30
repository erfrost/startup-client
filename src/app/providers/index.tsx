import RecoilProvider from "./RecoilProvider";
import { ReactNode } from "react";
import RouterProvider from "./RouterProvider";

interface AppProvidersProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProvidersProps) => {
  return (
    <RecoilProvider>
      <RouterProvider>{children}</RouterProvider>
    </RecoilProvider>
  );
};

export default AppProvider;
