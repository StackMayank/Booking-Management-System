import Icon from '@/components/ui/icon'
import React from 'react'

const HotelMetaDetails = (props) => {

  const { hotel, info } = props

  return (
    <>
      <section className='space-y-5' >
        <div className='flex '>
          <div className='flex-1 space-y-1'>
            <h1 className='text-2xl font-bold'>{hotel.name}</h1>
            <p className=' text-muted-foreground'>{`${hotel.contactInfo.address}, ${hotel.city}`}</p>
          </div>
          <div className=''>
            <div className='flex gap-2 items-center justify-center bg-brand px-2 py-1 rounded-t-sm text-white'>
              <span className='text-base font-bold '>4.8</span>
              <Icon icon='star' size={15} className='fill-white' />
            </div>
            <div className='bg-secondary rounded-b-sm px-2 py-1 flex item-center justify-center '>
              <span className='text-xs text-muted-foreground'>663 Ratings</span>
            </div>
          </div>
        </div>
        <div className='flex gap-2 items-center bg-gray-200 px-1.5 py-1 w-fit rounded text-black font-semibold text-xs '>
          <Icon icon='gem' size={14} />
          <span>Company-Serviced</span>
        </div>
        <div className='flex items-center gap-2 px-2'>
          <Icon icon='curve' className='-mt-4 stroke-gray-500' />
          <p className='text-sm '>5.0 ∙ Check-in rating &gt; Delightful experience</p>
        </div>
        <div className='text-orange-500 bg-orange-50 flex gap-1 p-2 items-center border rounded-sm'>
          <Icon icon='heart' size={16} />
          <p className='text-sm font-medium'>
            Located Less Than 5Km From Medanta Hospital | Located 3 Kms From Omaxe Celebration Mall
          </p>
        </div>
      </section >
          

      <section className='space-y-4 my-8 '>
          <h2 className='text-xl font-bold'>Amenities</h2>
          <ul className='grid grid-cols-3 gap-2'>
            {hotel.amenities.map((item, index) => (
              <li key={index} className='flex items-center gap-2'>
                <Icon icon='check' size={16} className='text-green-400' />
                <span className='text-sm font-medium text-muted-foreground'>{item}</span>
              </li>
            ))}
          </ul>
      </section>

      <section className='space-y-4 my-8'>
            <h2 className='text-xl font-bold'>About this Property</h2>
            <p className='text-sm leading-relaxed text-muted-foreground tracking-wide'>{info.description}</p>
      </section>
    </>
  )
}

export default HotelMetaDetails