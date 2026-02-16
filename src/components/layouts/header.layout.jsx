import React from 'react'
import { Button } from "@/components/ui/button"
import { SERVICE_LIST } from '@/config/app.config'

const Header = () => {
    return (
        <header className='bg-brand py-2'>
            <div className='container flex justify-between items-center'>
                <div id="logo-wrapper">
                    <a href="#" aria-label="Go to Booking.com">
                        <img height={25} width={130} src="/assets/booking.com.svg" alt="Logo of Booking.com" />
                    </a>
                </div>

                <div id="auth"
                    className='flex gap-2 justify-center items-center'>
                    <Button className='bg-white text-primary cursor-pointer border-primary rounded-sm hover:bg-white/95'>Register</Button>
                    <Button className='bg-white text-primary cursor-pointer border-primary rounded-sm hover:bg-white/95'>Login</Button>
                </div>
            </div>
            <div className='container flex gap-2'>
                {SERVICE_LIST.map((item) => (
                    <Button key={item.id} className={`bg-transparent shadow-none font-normal rounded-full hover:bg-white/10 cursor-pointer flex items-center justify-between gap-2 px-6 h-11 ${item.active ? 'bg-white/10 border border-white/10' : ''} `}>
                        {item.icon}
                        {item.Title}
                    </Button>
                ))}
            </div>
        </header>
    )
}

export default Header