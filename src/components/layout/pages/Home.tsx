import { useContext, useEffect } from 'react'
import BookFilter from '../../books/bookFilter'
import BookForm from '../../books/bookForm'
import Books from '../../books/Books'
import AuthContext from '../../../context/auth/authContext'

const Home = () => {

    const { loadUser } = useContext(AuthContext)

    useEffect(() => {
        loadUser() // When the component mounts, load user data from the server.
    }, [])

    return (
        <div className='grid-2'>
            <div>
                <BookForm />
            </div>
            <div>
                <BookFilter />
                <Books />
            </div>
        </div>
    )
}

export default Home