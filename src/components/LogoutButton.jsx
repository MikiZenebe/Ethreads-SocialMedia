import { Button } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowtoast";

export default function LogoutButton() {
  const setUser = useRecoilState(userAtom);
  const showToast = useShowToast();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);

      if (data.error) {
        showToast("Error", data.error, "error");
      } else {
        showToast("Success", "Logout Successfully", "success");
      }

      localStorage.removeItem("user");
      await setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button size={"xs"} onClick={handleLogout}>
      <FiLogOut size={20} />
    </Button>
  );
}
