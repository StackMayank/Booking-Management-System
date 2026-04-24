import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './home'
import SearchPage from './search'
import HotelDetails from './hotel-details'
import { SignInPage, SignUpPage } from './auth'
import Header from '@/components/layouts/header.layout'
import Footer from '@/components/layouts/footer.layout'
import { PATHS } from '@/config/path.config'


const Router = () => (
    <div>
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path={PATHS.HOME} element={<Home />} />
            <Route path={PATHS.SEARCH} element={<SearchPage />} />
            <Route path={PATHS.HOTEL} element={<HotelDetails />} />
            <Route path={PATHS.SIGN_IN} element={<SignInPage />} />
            <Route path={PATHS.SIGN_UP} element={<SignUpPage />} />
        </Routes>
        <Footer />
    </BrowserRouter>
    </div>
    
)
export default Router