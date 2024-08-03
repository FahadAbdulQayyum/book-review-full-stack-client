import React, { useContext, useEffect, useState } from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Register = (props: any) => {
    const { setAlert } = useContext(AlertContext)
    const { signup, error, clearErrors, isAuthenticated } = useContext(AuthContext)

    useEffect(() => {
        if (isAuthenticated) {
            props?.history?.push('/')
        }

        if (error === 'A User with this email already exists.') {
            setAlert(error, 'danger')
            clearErrors()
        }
        // else {
        //     setAlert(error, 'danger')
        // }

        setTimeout(() => {
            clearErrors()
        }, 5000);

        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: '',
    })

    const { name, email, password, cpassword } = user

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }


    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('onSubmittteeeeddd!', name, email, password)
        if (name === '' || email === '' || password === '') {
            setAlert('Please fill all fields', 'danger')
        } else if (password !== cpassword) {
            setAlert('Password is incorrect', 'danger')
        } else {
            console.log('userrrrr.....', user)
            signup(user)
            setAlert('User Registered', 'success')
        }
    }


    return (
        <div className='form-container'>
            <h1>User Registration</h1>
            <form
                onSubmit={onSubmit}
            >
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' placeholder='Enter your name' value={name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name='email' placeholder='Enter your email' value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' placeholder='Enter your password' value={password} onChange={onChange} minLength={6} />
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" name='cpassword' placeholder='Enter your password again' value={cpassword} onChange={onChange} minLength={6} />
                </div>
                <input type='submit' value={"Submit"} className='btn btn-primary btn-block'
                // onSubmit={onSubmit}
                />
            </form>
            {/* {error && <small className='btn btn-dark btn-block'>{error}</small>} */}
        </div >
    )
}

export default Register
