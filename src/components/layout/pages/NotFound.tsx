import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="flex">
            <h1>Sorry, This Page Does Not Exist! Unfortunately!</h1>
            <p className='my-1'>
                This Book Review Management App is a full stack MERN app for keeping track of books review
            </p>
            <p className='bg-dark p'>
                <Link to="/all">Go Back to <strong>Home</strong></Link>
            </p>
        </div >
    )
}

export default NotFound