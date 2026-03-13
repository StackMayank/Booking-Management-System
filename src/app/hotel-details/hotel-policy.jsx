import React from 'react'

const HotelPolicy = (props) => {

  const {policy} = props

  return (
    <section className='space-y-4'>
        <h2 className='text-xl font-bold'>Hotel Policy</h2>
        <div>
          <div>
            <div>
              <span>Check In</span>
            </div>
            <div>
              <p>{policy.checkIn}</p>
            </div>
          </div>
          <ul className='list-disc'>
            {policy.rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>
        
   </section>
  )
}

export default HotelPolicy