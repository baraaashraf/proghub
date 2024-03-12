import { Box } from '@chakra-ui/react';
import { NavBar } from "./components/NavBar";
import { ListPosts } from "./pages/list-posts";
import { ViewPost } from "./pages/view-post";
import { SignIn } from './pages/sign-in';
import { SignUp } from './pages/sign-up';
import { UserProfile } from './pages/user-profile';
import { Routes, Route } from "react-router-dom";
import { NewPost } from './pages/new-post';
import { ROUTES } from './routes';

export const App = () => {
  return (
    <Box h="100vh">
      <NavBar />
        <Routes>
          <Route path='/' element={<ListPosts />} />
          <Route path='/p/:id' element={<ViewPost />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/new' element={<NewPost />} />
          <Route path={ROUTES.USER_PROFILE(':id')} element={<UserProfile />} />
        </Routes>
    </Box>
  )
};
