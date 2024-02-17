import React from "react";
import Footer from "./footer.tsx";

export default function Layout({ children }) {
  return (
    <div className="bg-[url('public/background3.jpg')]">
      <div>
        <h1>Layout</h1>
        {children}
        <Footer />
      </div>
    </div>
  );
}
