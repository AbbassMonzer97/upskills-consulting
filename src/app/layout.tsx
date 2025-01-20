import type { Metadata } from "next";
import "./globals.css";
import Header from "./layout/header";
import Footer from "./layout/footer";
import { LanguageProvider } from "@/utils/LanguageContext";

export const metadata: Metadata = {
  title: "Upskills Consulting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body>
          <LanguageProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </LanguageProvider>
        </body>
      </html>
    </>
  );
}
