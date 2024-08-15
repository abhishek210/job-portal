import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./protectedRoutes"; // Ensure this hook returns the correct status
import { useEffect, useState } from "react";

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth(); // Get the authentication status from your hook
  const [isAuth, setIsAuth] = useState(null); // Initialize with null to avoid premature redirect

  useEffect(() => {
    const storedToken = localStorage.getItem("myKey");
    if (storedToken) {
      console.log("storedToken", storedToken);
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  console.log("isAuthenticated from useAuth:", isAuthenticated);
  console.log("isAuth from localStorage:", isAuth);

  // Wait for both isAuthenticated and isAuth to resolve
  if (isAuth === null) {
    // Render a loading spinner or any placeholder while determining auth status
    return <div>Loading...</div>;
  }

  return isAuthenticated || isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
