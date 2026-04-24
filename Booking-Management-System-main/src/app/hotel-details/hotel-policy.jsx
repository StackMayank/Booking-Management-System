import React from 'react'
import { Separator } from '@/components/ui/separator'

const HotelPolicy = (props) => {

  const { policy } = props

  return (
    <section className='space-y-4'>
      <h2 className='text-xl font-bold'>Hotel Policy</h2>

      <div className='space-y-4'>
        <div className='flex items-center gap-4 mx-5'>

          <div>
            <span className='text-sm'>Check-in</span>
            <div className='mt-3 relative px-4 py-1 border border-border before:absolute before:size-4 before:rotate-[44deg] before:bg-background before:-top-2 before:left-2 before:border-t before:border-l before:border-border'>
              <p className='text-lg font-semibold'>{policy.checkIn}</p>
            </div>
          </div>

          <Separator orientation="vertical" className="!h-20 " />

          <div>
            <span className='text-sm'>Check-out</span>
            <div className='mt-3 relative px-4 py-1 border border-border before:absolute before:size-4 before:rotate-[44deg] before:bg-background before:-top-2 before:left-2 before:border-t before:border-l before:border-border'>
              <p className='text-lg font-semibold'>{policy.checkout}</p>
            </div>
          </div>

        </div>

        <ul className='list-disc list-inside space-y-2'>
          {policy.rules.map((rule, index) => {
            return (
            <li key={index} className='text-sm text-muted-foreground'>
              <span>{rule}</span>
            </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default HotelPolicy