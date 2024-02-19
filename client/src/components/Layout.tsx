import React from "react";
import Footer from "./Footer";
import Header from "./Header";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <div className="bg-hero"> 
      <Header />
        <h1>Layout</h1>
        {children}
        <Footer />
      </div>
  );
}
