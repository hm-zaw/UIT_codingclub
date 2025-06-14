import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "./head";

export const metadata = {
  title: "UIT Coding Club",
};

export default function RootLayout({ children }) {
  const header = (
    <header className="flex items-center justify-between gap-4 p-4 sm:p-8">
      <h1 className={`${fugaz.className} text-xl sm:text-2xl md:text-3xl text-gradient`}>Moodoshii</h1>
      <Logout />
    </header>
  )
  const footer = (
    <footer className="p-4 sm:p-8">
      <p className={`${fugaz.className} text-center mx-auto text-indigo-600`}> Created by HMZ</p>
    </footer>
  )

  return (
    <html lang="en">
      <Head />
      <body className={`antialiased text-slate-800 w-full max-w-[1500px] mx-auto my-auto text-sm sm:text-base min-h-screen flex flex-col justify-center`}>
        {header}
        {children} 
        {footer}
      </body>
    </html>
  );
}
