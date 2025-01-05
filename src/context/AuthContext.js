import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Base_url = process.env.REACT_APP_BACKEND_URL;

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const login = async (credentials) => {
    const toastId = "loginToast";
    try {
      const { data } = await axios.post(`${Base_url}/login`, credentials);

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      const decodedToken = jwtDecode(data.token);
      if (decodedToken.exp * 1000 < Date.now()) {
        throw new Error("Token has expired");
      }

      setUser(decodedToken);
      setUserData(data?.user);

      toast.success("Login successful!", { toastId });
      return { success: true, message: data.message };
    } catch (error) {
      console.error("Login failed:", error.message);

      toast.error(error.response?.data?.message || "Login failed!", {
        toastId,
      });
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const register = async (credentials) => {
    const toastId = "registerToast";
    try {
      const { data } = await axios.post(`${Base_url}/register`, credentials);

      toast.success("Registration successful!", { toastId });
      return { success: true, message: data.message };
    } catch (error) {
      console.error("Registration failed:", error.message);

      toast.error(error.response?.data?.message || "Registration failed!", {
        toastId,
      });
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  const update = async (credentials, id) => {
    const toastId = "updateToast";
    try {
      const { data } = await axios.patch(
        `${Base_url}/profile/${id}`,
        credentials
      );
      setUserData(data?.user);

      toast.success("Profile updated successfully!", { toastId });
      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error during update:", error.message);

      toast.error(
        error.response?.data?.message ||
          "An error occurred while updating the profile.",
        { toastId }
      );
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "An error occurred while updating the profile.",
      };
    }
  };

  const logout = () => {
    const toastId = "logoutToast";
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // navigate("/")
    toast.success("Logout successful!", { toastId });
    setUser(null);
    setUserData(null);
  };

  const toggleDrawer = (open) => {
    if (typeof open !== "boolean") {
      console.error("toggleDrawer requires a boolean value, received:", open);
      return;
    }
    setDrawerOpen(open);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        setUser(decodedToken);

        if (storedUser) {
          setUserData(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Invalid or expired token:", error.message);

        toast.error("Session expired. Please login again.", {
          type: "error",
          toastId: "sessionExpiredToast",
        });

        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        login,
        register,
        update,
        logout,
        drawerOpen,
        toggleDrawer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
