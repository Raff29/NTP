import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-hero min-h-screen bg-cover">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
