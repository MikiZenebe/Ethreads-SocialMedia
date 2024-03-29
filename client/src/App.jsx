import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  UserPage,
  PostPage,
  HomePage,
  AuthPage,
  UpdateProfile,
} from "./pages/index";
import { CreatePost, Header } from "./components/index";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";

export default function App() {
  const user = useRecoilValue(userAtom);

  return (
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route
          path="/update"
          element={user ? <UpdateProfile /> : <Navigate to="/auth" />}
        />

        <Route
          path="/:username"
          element={
            user ? (
              <>
                <UserPage /> <CreatePost />
              </>
            ) : (
              <UserPage />
            )
          }
        />
        <Route path="/:username/post/:pid" element={<PostPage />} />
      </Routes>
    </Container>
  );
}
