import { useState } from "react";
import toast from "react-hot-toast";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";
import { APIEndPoint } from "../baseUrl";

const useFollowUnfollow = (user) => {
  const currentUser = useRecoilValue(userAtom);
  const [following, setFollowing] = useState(
    user.followers?.includes(currentUser?._id)
  );
  const [updating, setUpdating] = useState(false);

  const handleFollowUnfollow = async () => {
    if (!currentUser) {
      toast.error("Please Login to follow");
      return;
    }
    if (updating) return;

    setUpdating(true);
    try {
      const res = await fetch(`${APIEndPoint}/api/users/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }

      if (following) {
        toast.success(`Unfollowed ${user.name}`);
        user.followers.pop(); // simulate removing from followers
      } else {
        toast.success(`Followed ${user.username}`);

        user.followers.push(currentUser?._id); // simulate adding to followers
      }
      setFollowing(!following);

      console.log(data);
    } catch (error) {
      toast.error(error);
    } finally {
      setUpdating(false);
    }
  };

  return { handleFollowUnfollow, updating, following };
};

export default useFollowUnfollow;
