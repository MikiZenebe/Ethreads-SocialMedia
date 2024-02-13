import userAtom from "../atoms/userAtom";
import { useSetRecoilState } from "recoil";
import toast from "react-hot-toast";
import { APIEndPoint } from "../baseUrl";

const useLogout = () => {
  const setUser = useSetRecoilState(userAtom);

  const logout = async () => {
    try {
      const res = await fetch(APIEndPoint + "/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Logout Successfully");
        setTimeout(() => {
          window.location.replace("/auth");
        });
      }

      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return logout;
};

export default useLogout;
