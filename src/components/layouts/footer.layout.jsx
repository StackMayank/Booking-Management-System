import { FOOTER_SECTION, SOCIAL_LINKS } from '@/config/app.config';
import React from 'react';
import Icon from '../ui/icon';
import dayjs from 'dayjs';

const Footer = () => {
  return (
    <div className="bg-[#0f172a] p-8 mt-[60px]">
      <footer className="container py-10 md:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          {FOOTER_SECTION.slice(0, 4).map((section, index) => (
            <div key={index} className="flex flex-col gap-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-white">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-5">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-base font-normal text-slate-300 transition-colors hover:text-white"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* Last section for desktop */}
          <div className="hidden lg:flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              {FOOTER_SECTION[4].title}
            </h3>
            <ul className="flex flex-col gap-5">
              {FOOTER_SECTION[4].links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-base font-normal text-slate-300 transition-colors hover:text-white"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-700/70 pt-8">
          <div className="flex flex-col items-center justify-center gap-10">
            {/* Last section and social icons for mobile */}
            <div className="flex flex-col items-center gap-8 lg:hidden">
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-sm font-bold uppercase tracking-wide text-white">
                  {FOOTER_SECTION[4].title}
                </h3>
                <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                  {FOOTER_SECTION[4].links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-sm font-normal text-slate-300 transition-colors hover:text-white"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center justify-center gap-5">
                {SOCIAL_LINKS.map((link, index) => (
                  <a
                    href={link.href}
                    key={index}
                    aria-label={link.title}
                    className="flex size-11 items-center justify-center rounded-full bg-slate-700/70 text-slate-200 transition-colors hover:bg-slate-600 hover:text-white"
                  >
                    <Icon icon={link.icon} size="18" />
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom bar for desktop */}
            <div className="hidden lg:flex w-full items-center justify-between">
              <div className="flex items-center gap-5">
                {SOCIAL_LINKS.map((link, index) => (
                  <a
                    href={link.href}
                    key={index}
                    aria-label={link.title}
                    className="flex size-11 items-center justify-center rounded-full bg-slate-700/70 text-slate-200 transition-colors hover:bg-slate-600 hover:text-white"
                  >
                    <Icon icon={link.icon} size="18" />
                  </a>
                ))}
              </div>
              <p className="text-sm font-medium text-slate-400">
                &copy; {dayjs().year()} StayBooker. All rights reserved.
              </p>
            </div>

            {/* Copyright for mobile */}
            <p className="lg:hidden text-center text-sm font-medium text-slate-400">
              &copy; {dayjs().year()} StayBooker. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
