import React, { useContext, useEffect, useState } from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'
import { useNavigate } from 'react-router-dom'

const Login = (props: any) => {

    const navigate = useNavigate()

    const { setAlert } = useContext(AlertContext)
    const { login, error, clearErrors, isAuthenticated } = useContext(AuthContext)

    useEffect(() => {
        if (isAuthenticated) {
            // console.log('I\'m in login pageee', props)
            console.log('I\'m in login pageee')
            // props?.history?.push('/')
            navigate('/')
        }

        if (error === '') {
            setAlert(error, 'danger')
            clearErrors()
        }
        // eslint-disable-next-line
        // }, [])
    }, [error, isAuthenticated, props?.history])

    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const { email, password } = user

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('onSubmittteeeeddd!', email, password)
        if (email === '' || password === '') {
            setAlert('Please fill all fields', 'danger')
        } else {
            login(user)
            setAlert('Logged in successfully!', 'success')
        }
    }

    return (
        <div className='form-container'>
            <h1>User Login</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name='email' placeholder='Enter your email' value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' placeholder='Enter your password' value={password} onChange={onChange} />
                </div>
                <input type='submit' value={"Submit"} className='btn btn-primary btn-block' />
            </form>
        </div>
    )
}

export default Login
