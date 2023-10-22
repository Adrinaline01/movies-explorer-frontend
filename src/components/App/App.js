import { Route, Router, Routes } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import Profile from "../Profile/Profile";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/movies' element={<Movies />} />
      <Route path='/signup' element={<Register />} />
      <Route path='/signin' element={<Login />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/saved-movies' element={<SavedMovies />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>

  );
}

export default App;
