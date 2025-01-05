import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import "./App.css"; 

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
