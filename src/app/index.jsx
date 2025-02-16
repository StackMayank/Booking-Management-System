import React from 'react'
import Home from './home'
import Header from '@/components/layouts/header.layout'
import Footer from '@/components/layouts/footer.layout'
import HotelDetails from './hotel-details'

const App = () => {
  return (
    <div>
      <Header />
      {/* <Home /> */}
      <HotelDetails />
      <Footer />
    </div>
  )
}

export default App