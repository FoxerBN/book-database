// src/hooks/useLogout.ts
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = async (): Promise<void> => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log me out!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post(
          "http://localhost:3001/user/logout",
          {},
          { withCredentials: true }
        );

        if (response.data.success) {
          localStorage.removeItem("user");
          localStorage.removeItem("recommendedBooks");
          localStorage.removeItem("favBooks");
          localStorage.removeItem("myFriends");
          navigate("/login");
          Swal.fire("Logged Out", "You have been logged out successfully.", "success");
        } else {
          Swal.fire("Error", response.data.message, "error");
        }
      } catch (error) {
        Swal.fire("Error", "Logout failed. Try again.", "error");
      }
    }
  };

  return logout;
};

export default useLogout;
