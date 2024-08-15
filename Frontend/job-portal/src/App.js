import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./modules/Register";
import Login from "./modules/Login";
import Dashboard from "./modules/Dashboard";
import { AuthProvider } from "./utils/Context/protectedRoutes";
import PrivateRoutes from "./utils/Context/privateRoute";
function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
