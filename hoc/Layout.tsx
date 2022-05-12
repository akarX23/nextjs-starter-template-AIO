import React from "react";

import Navbar from "components/Header/Navbar";
import Footer from "components/Footer/Footer";

const Layout = ({ pageTitle, ...rest }) => {
  return (
    <div className="h-screen flex flex-col justify-between">
      <Navbar />
      <div className="flex-1">{rest.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
