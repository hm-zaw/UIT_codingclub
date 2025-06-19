import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import GlobalLayout from "@/components/GlobalLayout";
import { DM_Sans, Lexend } from 'next/font/google';

const montserrat = Montserrat({ subsets: ["latin"], weight: ['400'] });
const dmSans = DM_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-dm-sans', });
const lexend = Lexend({ subsets: ['latin'], display: 'swap', variable: '--font-lexend', });

export const metadata = {
  title: "UIT Coding Club",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${lexend.variable}`}>
      <body className={`font-lexend antialiased text-slate-800 dark:text-slate-200 bg-white dark:bg-gray-950 w-full text-sm sm:text-base min-h-screen flex flex-col justify-center`}>
        <ThemeProvider>
          <AuthProvider>
            <GlobalLayout>
              {children}
            </GlobalLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
