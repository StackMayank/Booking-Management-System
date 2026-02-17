import React from 'react'
import { FOOTER_SECTION, SOCIAL_LINKS } from '@/config/app.config'
import Icon from '../ui/icon';


const Footer = () => {
  return (
    <div className='bg-secondary mt-16 border-t'>
      <footer className='container py-12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12'>
          {FOOTER_SECTION.map((section, index) => (
            <div key={index} className="flex flex-col gap-4">
              <h3 className='font-bold text-sm text-foreground'>{section.title}</h3>
              <ul className='flex flex-col gap-1'>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className='text-xs text-neutral-600 hover:text-primary transition-colors hover:underline underline-offset-4'
                    >
                      {link.text}
                    </a>
                  </li>

                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
      <div className='bg-brand py-2' >
        <div className='container flex items-center justify-between'>
          <div className='flex items-center gap-4 text-white'>
            {SOCIAL_LINKS.map((link, index)=> (
              <a href={link.href} key={index}>
                <Icon icon={link.icon} size={18} />
              </a>
            ))}
          </div>
          <div className='text-sm text-white'>
            <p>© {new Date().getFullYear()} Hotel Booking Platform. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
       
  )
}


export default Footer