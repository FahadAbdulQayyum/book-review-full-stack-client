import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import BookContext from '../../context/book/bookContext'

interface NavbarProps {
  title?: string,
  icon?: string,
}

const Navbar: React.FC<NavbarProps> = ({ title = "Book Review Management App", icon = "fas fa-id-card-alt" }) => {
  const { isAuthenticated, logout, user } = useContext(AuthContext)
  const { clearBooks } = useContext(BookContext)


  const onLogout = () => {
    logout()
    clearBooks()
  }

  const authLinks = (
    <Fragment>
      {/* <li>Hello {user && user?.name}</li> */}
      <li>Hello {user && user?.name}</li>
      <li>
        <a href='#!' onClick={onLogout}>
          <i className="fas fa-sign-out-alt"></i>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/signup'>Signup</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  )

  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} />
        {title}
      </h1>
      <ul>
        <li>
          {isAuthenticated ? authLinks : guestLinks}
        </li>
      </ul>
    </div>
  )
}

export default Navbar
