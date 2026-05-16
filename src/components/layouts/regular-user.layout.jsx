import React from 'react';
import Header from './header.layout';
import { Outlet } from 'react-router';
import Footer from './footer.layout';

const RegularUserLayout = () => {
  return (
    <>
      <Header />
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RegularUserLayout;
