import type { Metadata } from "next";
import "../../styles/globals.css";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import "react-toastify/dist/ReactToastify.css"; // بارگذاری استایل‌ها
import { ToastContainer } from "react-toastify";
import ClientProviders from "@/components/public/ClientProviders";
export const metadata: Metadata = {
  title: "آموزش Next",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <Header />
          <main>{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
