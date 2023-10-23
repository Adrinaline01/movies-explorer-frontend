import { Route, Router, Routes } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import Profile from "../Profile/Profile";
import SavedMovies from "../SavedMovies/SavedMovies";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function App() {
  return (
    <Routes>
      <Route path='/' element=
        {
          <>
            <Header isAuth={false} />
            <Main />
            <Footer />
          </>
        }
      />
      <Route path='/movies' element=
        {
          <>
            <Header isAuth={true} />
            <Movies />
            <Footer />
          </>
        }
      />
      <Route path='/saved-movies' element=
        {
          <>
            <Header isAuth={true} />
            <SavedMovies />
            <Footer />
          </>
        }
      />
      <Route path='/signup' element={<Register />} />
      <Route path='/signin' element={<Login />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>

  );
}

export default App;
