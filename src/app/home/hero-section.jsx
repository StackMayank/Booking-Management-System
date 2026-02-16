import React from 'react'
import { Button } from '@/components/ui/button'

const HeroSection = () => {
    return (
        <div>
            <section className='relative min-h-[372px] bg-black '>
                <img src="https://images.pexels.com/photos/376368/pexels-photo-376368.jpeg" alt="hero-image" className='absolute z-1 size-full object-cover inset-0 brightness-75 ' />
                <div className=' relative z-2 container top-5'>
                    <h1 className='text-4xl font-extrabold leading-tight text-white md:text-5xl'>
                        Travel has never <br />
                        felt this cosy</h1>
                    <p className='text-xl font-medium leading-snug text-white md:text-2xl mt-3'>Book an entire place all for yourself</p>
                    <Button className='mt-8 h-12 px-4 text-base font-semibold cursor-pointer '>Discover Holiday Rentals</Button>
                </div>
            </section>
        </div>
    )
}
export default HeroSection