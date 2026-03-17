import React from 'react'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

const CancellationPolicy = ({ policy }) => {
  return (
        <HoverCard openDelay={100} >
            <HoverCardTrigger>
                <div className='flex items-center cursor-pointer gap-2 text-rose-600'>
                  <span>Cancellation Policy</span>
                  <Icon
                    icon='info'
                    size='18'
                  />
                </div>
            </HoverCardTrigger>
            <HoverCardContent align='center' side='left' className='w-[350px] space-y-3 border-border'>
              <h3 className='text-base font-semibold mb-2'>Cancellation Policy</h3>
              <ul className='pl-4 space-y-3 list-disc'> 
                {policy.map((policy, item) => {
                  return (
                    <li key={item}>
                      {policy}
                    </li>
                  )
                }) }
              </ul>
            </HoverCardContent>
        </HoverCard>
  )
}


const HotelCheckoutCard = ({ rooms, cancellationPolicy }) => {

  const selectedRoom = rooms.find((item) => item.isSelected)

  return (
    <div className='space-y-6'>
      <div className='flex-1 flex gap-2 items-center'>
        <span className='font-bold text-2xl'>₹{selectedRoom.price.toLocaleString()}</span>
        <span className='text-base line-through text-muted-foreground'>₹{(selectedRoom.price * 1.5).toLocaleString()}</span>
      </div>
      <div className='space-y-3'>
        <div className='flex items-center justify-between'>
          <span className='text-sm'>Your savings</span>
          <span className='text-sm font-bold'> {`₹${(selectedRoom.price * 0.5).toLocaleString()}`}</span>
        </div>
      </div>
      <div className='space-y-3'>
        <div className='flex items-center justify-between'>
          <span className='text-sm'>Total Price</span>
          <span className='text-sm font-bold'> {`₹${(selectedRoom.price).toLocaleString()}`}</span>
        </div>
      </div>
      <Button className=' font-bold w-full bg-brand text-white hover:bg-brand' aria-label='Continue to Book'>
        Continue to Book
      </Button>
      <div className='flex justify-center gap-2'>
        <Icon
          icon='zap'
          size='16'
          className='mt-[3px] shrink-0 fill-rose-600 text-rose-600'
        />
        <p className='text-sm font-medium text-rose-600'>1k+ people booked this OYO in last 6 months</p>
      </div>
      <CancellationPolicy  policy={cancellationPolicy}/>
    </div>
  )
}

export default HotelCheckoutCard