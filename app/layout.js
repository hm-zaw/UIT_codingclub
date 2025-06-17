import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import GlobalLayout from "@/components/GlobalLayout";

const montserrat = Montserrat({ subsets: ["latin"], weight: ['400'] });

export const metadata = {
  title: "UIT Coding Club",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased text-slate-800 w-full text-sm sm:text-base min-h-screen flex flex-col justify-center`}>
        <AuthProvider>
          <GlobalLayout>
            {children}
          </GlobalLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
