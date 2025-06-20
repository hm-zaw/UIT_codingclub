'use client'

import React, { useState, useEffect } from 'react'
import Button from './Button'
import { Montserrat, Fugaz_One } from 'next/font/google'
import { useAuth } from '@/context/AuthContext'

const montserrat = Montserrat({ subsets: ["latin"], weight: ['400'] })
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] })

export default function Login(props) {

  const { state } = props;
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [authenticating, setAuthenticating] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')  

  useEffect(() => {
    setIsRegister(state);
  }, [state]); 

  const { signup, login } = useAuth()

  async function handleSubmit() {
    setErrorMessage('') // Reset on each submit

    if (!email || !password || password.length < 8) {
      setErrorMessage('Please fill in both fields. Password must be at least 8 characters.')
      return
    }

    setAuthenticating(true)

    try {
      let result
      if (isRegister) {
        console.log("Signing up a new user")
        result = await signup(email, password)
        if (result.success) {
          setIsRegister(false) // Switch to login view after successful registration
        }
      } else {
        console.log('Logging in existing user')
        result = await login(email, password)
      }

      if (!result.success) {
        console.log("the message is", result.message)
        setErrorMessage(result.message)
      }
      
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong.')
    } finally {
      setAuthenticating(false)
    }
  }

  useEffect(() => {
    console.log("errorMessage updated", errorMessage)
  }, [errorMessage])

  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      <h3 className={`${fugaz.className} px-20 sm:px-28 md:px-32 font-fugaz text-5xl sm:text-6xl md:text-7xl text-center text-gray-900 dark:text-white`}>
        {isRegister ? 'Register' : 'Login'}
      </h3>

      {/* Error Message Display */}
      {errorMessage && (
        <div className='bg-yellow-100 border border-red-400 text-red-700 px-4 py-2 rounded max-w-[500px] text-center'>
          {errorMessage}
        </div>
      )}

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='w-full max-w-[500px] mx-auto px-4 py-2 sm:py-3 rounded-lg border border-teal-500 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-indigo-300'
        placeholder='Email'
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='w-full max-w-[500px] mx-auto px-4 py-2 sm:py-3 rounded-lg border border-teal-500 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-indigo-300'
        placeholder='Password'
        type='password'
      />
      <div className='w-full max-w-[500px] mx-auto'>
        <Button clickHandler={handleSubmit} text={authenticating ? 'Submitting...' : 'Submit'} full dark />
      </div>
      <p>
        {isRegister ? "Already have an account? " : "Don't have an account? "}
        <button onClick={() => { setIsRegister(!isRegister); setErrorMessage('') }} className='text-[#3d7d7d]'>
          {isRegister ? 'Sign in' : 'Sign up'}
        </button>
      </p>
    </div>
  )
}
