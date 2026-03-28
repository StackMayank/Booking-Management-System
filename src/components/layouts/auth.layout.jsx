import React from 'react'
import { getAssetPath } from '@/lib/utils'



const AuthLayout = ({ children, title, description }) => {
  return (
    <div className='w-full flex-1 flex items-center justify-center py-10 px-4 my-10'>
      <div className='w-full md:max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8'>
        <div className='flex flex-col gap-3 justify-center items-center'>
          <div className='p-3 rounded-lg shadow '>
            <img width={30} height={30} src="/bookingcom-icon-logo.svg" alt="logo" />
          </div>
          <h1 className='text-xl font-semibold text-center'>{title}</h1>
          <p className='text-sm text-center'>{description}</p>
          {children}
        </div>
      </div>
    </div>

  )
}

export default AuthLayout