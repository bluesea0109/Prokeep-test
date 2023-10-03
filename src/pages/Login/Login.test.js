import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import Login from '.'

// Mock the fetch function to simulate responses
global.fetch = jest.fn()

test('renders login form', () => {
  render(<Login />)

  const headerElement = screen.getByText('Login Form')
  const emailInputElement = screen.getByLabelText('Email:')
  const passwordInputElement = screen.getByLabelText('Password:')
  const loginButtonElement = screen.getByText('Login')

  expect(headerElement).toBeInTheDocument()
  expect(emailInputElement).toBeInTheDocument()
  expect(passwordInputElement).toBeInTheDocument()
  expect(loginButtonElement).toBeInTheDocument()
})

test('Login form with valid credentials', async () => {
  fetch.mockResolvedValueOnce({
    status: 200,
    json: async () => ({ token: 'valid-token' }),
  })

  render(<Login />)

  fireEvent.change(screen.getByLabelText('Email:'), {
    target: { value: 'test@example.com' },
  })
  fireEvent.change(screen.getByLabelText('Password:'), {
    target: { value: 'password' },
  })
  fireEvent.click(screen.getByText('Login'))

  await waitFor(() => {
    expect(screen.getByText('Login successful!')).toBeInTheDocument()
  })
})

test('Login form with invalid credentials', async () => {
  fetch.mockResolvedValueOnce({
    status: 401,
    json: async () => ({ error: 'Invalid credentials' }),
  })

  render(<Login />)

  fireEvent.change(screen.getByLabelText('Email:'), {
    target: { value: 'test@example.com' },
  })
  fireEvent.change(screen.getByLabelText('Password:'), {
    target: { value: 'invalidpassword' },
  })
  fireEvent.click(screen.getByText('Login'))

  await waitFor(() => {
    expect(
      screen.getByText('Login failed. Please check your credentials.'),
    ).toBeInTheDocument()
  })
})

test('Login form with invalid email field', async () => {
  render(<Login />)

  fireEvent.change(screen.getByLabelText('Email:'), {
    target: { value: 'invalid email' },
  })

  await waitFor(() => {
    expect(
      screen.getByText('Please provide the valid email address.'),
    ).toBeInTheDocument()
  })
})

test('Login form with empty fields', async () => {
  render(<Login />)

  const loginButtonElement = screen.getByText('Login')

  expect(loginButtonElement).toHaveAttribute('disabled')
})

test('Login form with network error', async () => {
  fetch.mockRejectedValueOnce(new Error('Network error'))

  render(<Login />)

  fireEvent.change(screen.getByLabelText('Email:'), {
    target: { value: 'test@example.com' },
  })
  fireEvent.change(screen.getByLabelText('Password:'), {
    target: { value: 'password123' },
  })
  fireEvent.click(screen.getByText('Login'))

  await waitFor(() => {
    expect(
      screen.getByText('An error occurred. Please try again.'),
    ).toBeInTheDocument()
  })
})
