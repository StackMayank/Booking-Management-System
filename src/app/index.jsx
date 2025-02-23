import React from 'react'
import Home from './home'
import Header from '@/components/layouts/header.layout'
import Footer from '@/components/layouts/footer.layout'
import HotelDetails from './hotel-details'
import {SignInPage, SignUpPage} from './auth'

const App = () => {
  return (
    <div>
      <Header />
      <Home />
      {/* <HotelDetails /> */}
      {/* <SignInPage /> */}
      {/* <SignUpPage /> */}
      <Footer />
    </div>
  )
}

export default App