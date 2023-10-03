import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const isValidEmail = (email) => {
    // Define a regex pattern for a valid email address
    const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/

    // Test the email against the pattern
    return emailPattern.test(email)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email || !password) {
      setMessage('Please provide both email and password.')
      return
    }

    setLoading(true)

    fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          setMessage('Login successful!')
        } else {
          setMessage('Login failed. Please check your credentials.')
        }

        setLoading(false)
      })
      .catch((error) => {
        setMessage('An error occurred. Please try again.')

        setLoading(false)
      })
  }

  const handleEmail = (value) => {
    setEmail(value)

    if (!value) {
      setMessage('Please provide the email address.')

      return
    }

    if (!isValidEmail(value)) {
      setMessage('Please provide the valid email address.')

      return
    }

    setMessage('')
  }

  const handlePassword = (value) => {
    setPassword(value)

    if (!value) {
      setMessage('Please provide at least one character password.')

      return
    }

    setMessage('')
  }

  return (
    <div className='container-fluid  mt-5'>
      <h2 className='text-center'>Login Form</h2>

      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-md-5 mx-auto'>
            {message && <div className='alert alert-warning'>{message}</div>}
            <div className='form-group mb-2'>
              <label className='mb-2' htmlFor='email'>
                Email:
              </label>
              <input
                type='email'
                value={email}
                id='email'
                className='form-control'
                onChange={(e) => handleEmail(e.target.value)}
              />
            </div>
            <div className='form-group mb-4'>
              <label className='mb-2' htmlFor='password'>
                Password:
              </label>
              <input
                type='password'
                value={password}
                id='password'
                className='form-control'
                onChange={(e) => handlePassword(e.target.value)}
              />
            </div>

            <div className='d-flex'>
              <button
                type='submit'
                className='btn btn-primary btn-block w-100'
                disabled={!isValidEmail(email) || !password}
              >
                {loading ? `Loading...` : 'Login'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
