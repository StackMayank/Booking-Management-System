import React from 'react'
import { FOOTER_SECTION, SOCIAL_LINKS } from '@/config/app.config'
import Icons from '@/lib/icons'
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
     
    </div>
       
  )
}

export default Footer