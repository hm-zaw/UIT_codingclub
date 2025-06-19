// user-dashboard.js
import Navbar from "@/components/user_dash/Navbar";
import Footer from "@/components/user_dash/Footer";

export default function UserDashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20"> {/* Adjust pt-20 as needed, a bit more than navbar height */}
        {children}
      </main>
      <Footer />
    </>
  );
}