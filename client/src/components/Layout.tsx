import React from "react";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <div className="layout-container"> 
        <h1>Layout</h1>
        {children}
        <Footer />
      </div>
  );
}
