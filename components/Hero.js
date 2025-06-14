import { Montserrat } from 'next/font/google'
import React from 'react'
import Button from './Button'
import Link from 'next/link'

const montserrat = Montserrat({ subsets: ["latin"], weight: ['500']})

export default function Hero() {
  return (
    <div className={`px-5 py-10 sm:py-8 md:py-10 w-full mx-auto max-w-[1000px] flex flex-col gap-6 sm:gap-8`}>
      <h1 className={`${montserrat.className} text-5xl text-center sm:text-6xl md:text-7xl`}> 
        <span className='text-gradient-dark-bg-4'> Code, Learn, </span> and <span className='text-gradient-dark-bg-4'> Innovate </span> with UIT Coding Club
      </h1>
      <p className='text-sm text-center sm:text-lg md:text-xl'>
        Join our community at the <span className='font-semibold'>UIT Coding Club</span> to learn, code, and innovate together!
      </p>
      <div className='grid grid-cols-2 gap-4 mx-auto mt-3 w-fit'>
        <Link href={'/dashboard'}>
          <Button text="Sign Up"/>
        </Link>
        <Link href={'/dashboard'}>
          <Button text="Login" dark/>
        </Link>
      </div>
    </div>
  )
}
