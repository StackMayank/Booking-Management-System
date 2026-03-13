import React from 'react'
import Icon from '@/components/ui/icon'
import { Button } from '@/components/ui/button'

const Room = (props) => {
  const {id, type, amenities, price, isSelected, photos} = props

  return (
    <article>
      {isSelected && (
        <div className='flex items-center gap-1 py-2 px-5 rounded-t-lg bg-brand'>
          <Icon 
          icon="star" 
          size={16} 
          className="fill-amber-400 stroke-0"
          />
          <p className='text-xs font-bold text-white uppercase'
          >Selected Category
          </p>
        </div>
      )}

      <div className='flex border border-border p-4'>
      <div className='flex-1 space-y-3'>
        <div className='flex items-center gap-4'>
          <h3 className='text-lg font-semibold'>{type}</h3>
          {isSelected && <Icon icon="circleCheck" size={25} className='fill-green-400 text-white'/>}
        </div>
        <div>
          <ul className='grid grid-cols-3 gap-2'>
           {amenities.map((item, index) => (
              <li key={index} className='flex items-center gap-2'>
                <Icon icon='check' size={16} className='text-green-400' />
                <span className='text-sm font-medium text-muted-foreground'>{item}</span>
              </li>
            ))}
            </ul>
        </div>
      </div>
      <div className='w-[180px] h-[120px] rounded-lg overflow-hidden'>
        <img src={photos[0]} alt="room-image" className='w-full h-full object-cover' />
      </div>
      </div>

      <div className='border py-3 px-3 flex justify-between items-center border-t-0'>
        <div className='flex gap-3 items-center'>
        <span className='font-bold text-lg'>₹{price.toLocaleString()}</span>
        <span className='font-semibold text-sm line-through text-muted-foreground'>₹{(price*1.5).toLocaleString()}</span>
        </div>
        <Button disabled={isSelected} variant='outline' className={`uppercase border border-border px-7 py-2 font-semibold text-sm w-[160px] text-red-500 ${isSelected && 'text-gray-900'}`}>
          {isSelected && <Icon icon="circleCheck" size={25} className='fill-green-400 text-white'/>}
          {isSelected ? 'selected' : 'select'}</Button>
      </div>
    </article>
  )
}

const HotelRoomsPicker = (props) => {
  const {rooms} = props
  return (
    <section className='space-y-4'>
      <h2 className='text-xl font-bold'>Choose Your Room</h2>
        <div >
          <div className='space-y-4'>
            {rooms.map((room) => (
             <Room key={room.id} {...room} /> 
            ))}    
          </div>
        </div>
    </section>
  )
}

export default HotelRoomsPicker