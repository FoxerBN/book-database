import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const useRemoveAccount = () => {
  const navigate = useNavigate();

  const removeAccount = async (): Promise<void> => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete my account!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          "http://localhost:3001/user/remove",
          { withCredentials: true }
        );

        if (response.status === 200) {
          localStorage.clear();
          setTimeout(() => {
            navigate("/register");
          }, 500);
          Swal.fire("Deleted", "Your account has been removed.", "success");
        } else {
          Swal.fire("Error", response.data.message, "error");
        }
      } catch (error) {
        Swal.fire("Error", "Account deletion failed. Try again.", "error");
      }
    }
  };

  return removeAccount;
};

export default useRemoveAccount;
