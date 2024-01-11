import { useEffect, useState } from "react";
import { UserHeader, UserPost } from "../components";
import { useParams } from "react-router-dom";

export default function UserPage() {
  const [user, setUser] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();

        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [username]);

  if (!user) return null;
  return (
    <>
      <UserHeader user={user} />
      <UserPost />
    </>
  );
}
