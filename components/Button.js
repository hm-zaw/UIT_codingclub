import React from 'react'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ["latin"], weight: ['400']})

export default function Button(props) {
    const { text, dark, full, clickHandler } = props
    return (
        <button
            onClick={clickHandler}
            className={
                'rounded-full overflow-hidden duration-200 ' +
                'font-bold py-3 px-10 sm:px-14 border-b-4 ' +
                (full ? 'w-full ' : '') +
                (dark // Dark button styling
                    ? 'bg-[#5DA7A7] text-white border-[#2B7C7C] hover:bg-[#76D1CD] hover:border-[#5DA7A7] ' 
                    : 'bg-white text-[#4f9a9a] border-[#2B7C7C] hover:bg-[#76D1CD] hover:text-white hover:border-[#76D1CD] ') 
            }>
            <p className={`${montserrat.className} whitespace-nowrap text-xl font-bold`}>
                { text }
            </p>
        </button>
    )
}