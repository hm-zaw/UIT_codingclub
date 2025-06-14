import React from 'react'

export default function Main(props) {
  const { children } = props
    return (
    <main className='flex-1 flex flex-col sm:p-8 max-w-[1250px] mx-auto'>
        { children }
    </main>
  )
}