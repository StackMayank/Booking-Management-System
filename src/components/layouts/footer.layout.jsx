import { FOOTER_SECTION, SOCIAL_LINKS } from '@/config/app.config';
import { memo } from 'react';
import Icon from '../ui/icon';
import dayjs from 'dayjs';
 
const Footer = () => {
  return (
    <div className="bg-[#0f172a] px-2 py-3 sm:px-6 md:px-8 mt-[60px] ">
      <footer className="w-full max-w-6xl mx-auto py-6 md:py-5 flex flex-col">
        
        {/* Links Grid - 2 cols on mobile, responsive on larger screens */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5 mb-8 lg:mb-0 container text-center lg:text-left place-items-center lg:place-items-start">
          {FOOTER_SECTION.slice(0, 4).map((section, index) => (
            <div key={index} className="flex flex-col gap-5 items-center lg:items-start ">
              <h3 className="text-sm font-bold uppercase tracking-wide text-white">
                {section.title}
              </h3>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-300 hover:text-white transition-colors "
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
 
          {/* Desktop only - Fifth section */}
          <div className="hidden lg:flex flex-col gap-4 items-center lg:items-start">
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              {FOOTER_SECTION[4].title}
            </h3>
            <ul className="list-none  flex flex-col gap-3">
              {FOOTER_SECTION[4].links.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
 
        {/* Mobile - Fifth section and divider */}
        <div className="lg:hidden mt-3">
          <div className="flex flex-col gap-6 items-center justify-center">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-white mb-4 flex items-center justify-center">
                {FOOTER_SECTION[4].title}
              </h3>
              <ul className="list-none p-0 m-0 flex flex-wrap gap-x-4 gap-y-2">
                {FOOTER_SECTION[4].links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-300 hover:text-white transition-colors"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
 
            <div className="border-t border-slate-700/70 pt-6 flex flex-col items-center gap-4 ">
              <div className="flex gap-4">
                {SOCIAL_LINKS.map((link, i) => (
                  <a
                    href={link.href}
                    key={i}
                    aria-label={link.title}
                    className="flex size-11 items-center justify-center rounded-full bg-slate-700/70 text-slate-200 hover:bg-slate-600 hover:text-white transition-colors"
                  >
                    <Icon icon={link.icon} size="18" />
                  </a>
                ))}
              </div>
              <p className="text-sm text-slate-400 font-medium mt-5">
                &copy; {dayjs().year()} StayBookers. All rights reserved.
              </p>
            </div>
          </div>
        </div>
 
        {/* Desktop - divider, social and copyright */}
        <div className="hidden lg:flex border-t border-slate-700/70  mt-10 container justify-between items-center gap-6">
          <div className="flex gap-4 pt-5">
            {SOCIAL_LINKS.map((link, i) => (
              <a
                href={link.href}
                key={i}
                aria-label={link.title}
                className="flex size-11 items-center justify-center rounded-full bg-slate-700/70 text-slate-200 hover:bg-slate-600 hover:text-white transition-colors"
              >
                <Icon icon={link.icon} size="18" />
              </a>
            ))}
          </div>
          <p className="text-sm text-slate-400 font-medium">
            &copy; {dayjs().year()} Booking.com. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
 
export default memo(Footer)