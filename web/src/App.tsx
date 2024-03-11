import { Box } from '@chakra-ui/react';
import { NavBar } from "./components/NavBar";
import { ListPosts } from "./pages/list-posts";
import { ViewPost } from "./pages/view-post";
import { Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <Box h="100vh">
      <NavBar />
        <Routes>
          <Route path='/' element={<ListPosts />} />
          <Route path='/p/:id' element={<ViewPost />} />
        </Routes>
    </Box>

  )

};
