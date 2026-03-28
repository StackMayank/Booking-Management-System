import React from 'react'
import Home from './home'
import Header from '../components/layouts/header.layout'
import Footer from '../components/layouts/footer.layout'
import HotelDetails from './hotel-details'
import {SignInPage, SignUpPage} from './auth'


const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1 flex flex-col">
          {/* <Home /> */}
          {/* <HotelDetails /> */}
          {/* <SignInPage /> */}
          <SignUpPage />
        </main>
        <Footer variant="minimal" />
    </div>
  )
}

export default App