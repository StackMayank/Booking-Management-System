import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './home';
import Header from '@/components/layouts/header.layout';
import Footer from '@/components/layouts/footer.layout';
import SearchPage from './search';
import HotelDetails from './hotel-details';
import { SignInPage, SignUpPage } from './auth';
import { PATHS } from '@/config/path.config';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path={PATHS.SEARCH} element={<SearchPage />}/>
        <Route path={PATHS.HOTEL} element={<HotelDetails />}/>

        <Route path={PATHS.SIGN_IN} element={<SignInPage />}/>
        <Route path={PATHS.SIGN_UP} element={<SignUpPage />}/>

      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
