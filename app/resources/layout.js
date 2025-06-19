import Navbar from "@/components/user_dash/Navbar";
import Footer from "@/components/user_dash/Footer";

export default function UserDashboardLayout({ children }) {
    return (
        <>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </>
      );
  }