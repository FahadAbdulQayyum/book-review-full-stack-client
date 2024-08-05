import { Fragment } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookState from './context/book/BookState';
import Navbar from './components/layout/Navbar'
import Home from './components/layout/pages/Home';
import About from './components/layout/pages/About';
import AuthState from './context/auth/AuthState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import AlertState from './context/alert/AlertState';
import setAuthToken from './context/utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import AllBooks from './components/books/allBooks';

const App: React.FC = () => {

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  };


  return (
    <AlertState>
      <AuthState>
        <BookState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <Routes>
                  <Route path='/all' element={<AllBooks />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/signup' element={<Register />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/' element={<PrivateRoute />}>
                    <Route path='/home' element={<Home />} />
                  </Route>
                </Routes>
              </div>
            </Fragment>
          </Router>
        </BookState>
      </AuthState >
    </AlertState >
  )
}

export default App;