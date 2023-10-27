import { Route, Router, Routes, useNavigate, useLocation, Navigate } from "react-router-dom";
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
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute"

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorGlobal, setErrorGlobal] = useState("");
  const [savedMovies, setSavedMovies] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();


  function resetErrorGlobal() {
    setErrorGlobal("");
  }

  const handleRegister = ({ email, password, name }) => {
    mainApi
      .signUp({ email, password, name })
      .then(() => {
        handleLogin({ email, password })
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        if (err === "Произошла ошибка: 409") {
          setErrorGlobal("Пользователь с таким email уже существует");
        } else if (err === "Произошла ошибка: 500") {
          setErrorGlobal("Сервер не доступен, Попробуйте позже");
        }
        console.log(err)
      })
  }

  const handleLogin = ({ email, password }) => {
    mainApi
      .signIn({ email, password })
      .then(() => {
        setLoggedIn(true);
        navigate("/movies", { replace: true });
        resetErrorGlobal();
      })
      .catch((err) => {
        if (err === "Произошла ошибка: 401") {
          setErrorGlobal("Введены некорректные данные");
        } else if (err === "Произошла ошибка: 500") {
          setErrorGlobal("Сервер не доступен, Попробуйте позже");
        }
        console.log(err)
      })
  };

  // const tokenCheck = () => {
  //   mainApi
  //     .getUserInfo()
  //     .then((user) => {
  //       setCurrentUser(user);
  //       setLoggedIn(true)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const tokenCheck = () => {
    const currentPatch = pathname;
    mainApi
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true)
        navigate(currentPatch, { replace: true })
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
      .then((data) => {
        console.log(data)
        setCurrentUser(data);
        alert("Данные профиля изменены успешно")
      })
      .catch((error) => {
        setErrorGlobal(error);;
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

  const logOut = () => {
    handleSignOut()
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path='/' element=
          {
            <>
              <Header loggedIn={loggedIn} resetErrorGlobal={resetErrorGlobal} />
              <Main />
              <Footer />
            </>
          }
        />
        <Route path='/movies' element=
          {<ProtectedRoute loggedIn={loggedIn}
            resetErrorGlobal={resetErrorGlobal}
            filterByName={filterByName}
            saveMovies={saveMovies}
            savedMovies={savedMovies}
            deleteMovies={deleteMovies}
            element={Movies} />
          }
        />

        <Route path='/saved-movies' element=
          {<ProtectedRoute loggedIn={loggedIn}
            resetErrorGlobal={resetErrorGlobal}
            filterByName={filterByName}
            savedMovies={savedMovies}
            deleteMovies={deleteMovies}
            element={SavedMovies} />
          }
        />

        <Route path='/signup' element={loggedIn ? <Navigate to='/movies' replace /> : <Register onRegister={handleRegister} loggedIn={loggedIn} resetErrorGlobal={resetErrorGlobal} errorGlobal={errorGlobal} />} />
        <Route path='/signin' element={loggedIn ? <Navigate to='/movies' replace /> : <Login onLogin={handleLogin} resetErrorGlobal={resetErrorGlobal} errorGlobal={errorGlobal} />} />
        <Route path='/profile' element=
          {<ProtectedRoute
            loggedIn={loggedIn}
            onSignOut={logOut}
            onUpdateUser={handleUpdateUser}
            resetErrorGlobal={resetErrorGlobal}
            errorGlobal={errorGlobal}
            element={Profile} />
          }
        />

        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </CurrentUserContext.Provider>


  );
}

export default App;