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
// import AuthContext from './context/auth/authContext';

const App: React.FC = () => {

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  };

  // const { isAuthenticated } = useContext(AuthContext)

  return (
    <AuthState>
      <BookState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <Routes>

                  {/* <PrivateRoute>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Register />} />
                  </PrivateRoute> */}

                  {/* <Route path='/login' element={<Login />} />
                  <Route path='/signup' element={<Register />} />
                  <Route path='/' element={<PrivateRoute element={< Home />} />} />
                  <Route path='/about' element={<PrivateRoute element={<About />} />} /> */}

                  <Route path='/login' element={<Login />} />
                  <Route path='/signup' element={<Register />} />
                  <Route path='/' element={<PrivateRoute />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={< About />} />
                  </Route>


                  {/* <Route path="/" element={<PrivateRoute element={<Home />} />} />
                  <Route path="/about" element={<PrivateRoute element={<About />} />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Register />} /> */}

                  {/* Private routes starts*/}
                  {/* <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Register />} />
                  </Route> */}
                  {/* Private routes ends*/}

                </Routes>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </BookState>
    </AuthState >
  )
}

export default App;