import { Route, Router, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import Profile from "../Profile/Profile";
import SavedMovies from "../SavedMovies/SavedMovies";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import * as mainApi from '../../utils/MainApi';
import { getSavedMovies } from "../../utils/MainApi";


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  // const [updateProfileMessage, setUpdateProfileMessage] = useState("");
  // const [errorGlobalMessage, setErrorGlobalMessage] = useState("");
  const [savedMovies, setSavedMovies] = useState([]);
  // const location = useLocation();

  const navigate = useNavigate();

  const handleRegister = ({ email, password, name }) => {
    mainApi
      .signUp({ email, password, name })
      .then(() => {
        handleLogin({ email, password })
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleLogin = ({ email, password }) => {
    mainApi
      .signIn({ email, password })
      .then(() => {
        setLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const tokenCheck = () => {
    mainApi
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  const handleSignOut = () => {
    mainApi
      .signOut()
      .then(() => {
        localStorage.clear();
        setLoggedIn(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (loggedIn) {
      getSavedMovies()
        .then((movies) => {
          setSavedMovies(movies)
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [loggedIn]);

  const handleUpdateUser = (updateUser) => {
    mainApi
      .patchUserInfo(updateUser)
      .then((updateUserData) => {
        setCurrentUser(updateUserData);
        // setUpdateProfileMessage('success');
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function filterByName(movies, text) {
    return movies.filter(({ nameRU, nameEN }) => nameRU.toLowerCase().includes(text.toLowerCase()) || nameEN.toLowerCase().includes(text.toLowerCase()));
  }

  const saveMovies = (movie) => {
    mainApi
      .addMovieToSave(movie)
      .then((saveMovie) => {
        setSavedMovies([...savedMovies, saveMovie]);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const deleteMovies = (id) => {
    mainApi
      .deleteCard(id)
      .then(() => {
        const resultsSavedMovies = savedMovies.filter(({ _id }) => _id !== id);
        setSavedMovies(resultsSavedMovies);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // const logOut = () => {
  //   localStorage.clear();
  //   setLoggedIn(false)
  //   navigate("/")
  //   // Почистить куки
  // }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path='/' element=
          {
            <>
              <Header loggedIn={loggedIn} />
              <Main />
              <Footer />
            </>
          }
        />
        <Route path='/movies' element=
          {
            <>
              <Header loggedIn={loggedIn} />
              <Movies filterByName={filterByName} saveMovies={saveMovies} savedMovies={savedMovies} deleteMovies={deleteMovies} />
              <Footer />
            </>
          }
        />
        <Route path='/saved-movies' element=
          {
            <>
              <Header loggedIn={loggedIn} />
              <SavedMovies filterByName={filterByName} savedMovies={savedMovies} deleteMovies={deleteMovies} />
              <Footer />
            </>
          }
        />
        <Route path='/signup' element={<Register onRegister={handleRegister} loggedIn={loggedIn} />} />
        <Route path='/signin' element={<Login onLogin={handleLogin} />} />
        <Route path='/profile' element={<Profile loggedIn={loggedIn} onSignOut={handleSignOut} onUpdateUser={handleUpdateUser} />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </CurrentUserContext.Provider>


  );
}

export default App;
