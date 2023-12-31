import { Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { UserPage, PostPage } from "./pages/index";
import { Header } from "./components/index";

export default function App() {
  return (
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:pid" element={<PostPage />} />
      </Routes>
    </Container>
  );
}
