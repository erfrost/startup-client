import { ToastContainer } from "react-toastify";
import AppProvider from "./app/providers/index";
import Router from "./app/router/index";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AppProvider>
      <Router />
      <ToastContainer position="bottom-right" />
    </AppProvider>
  );
}

export default App;
