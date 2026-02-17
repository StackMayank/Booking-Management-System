import React from 'react'
import { TRENDING_DESTINATION } from '@/config/app.config'
import { getAssetPath } from '@/lib/utils'

const TrendingDestination = () => {
  return (
    <div className='container my-8'>
      <div className="mb-8 space-y-1 ">
        <h2 className='text-2xl font-bold'>Trending Destinations</h2>
        <p className='text-base text-muted-foreground'>Most popular choices for travellers from India</p>
      </div>
      <div className='grid grid-cols-6 gap-4'>
        {TRENDING_DESTINATION.map((item) => (
          <div key={item.id} className={`h-[270px] rounded-lg relative overflow-hidden ${item.className}`}>
            <img src={getAssetPath(item.image)} alt={item.Title} className='size-full object-cover brightness-80 hover:scale-105 transition-transform duration-300 ' />
            <div className='absolute from-70% to 100% inset-0 size-full bg-gradient-to-t from-transparent to-blue-600/60'>
              <div className='p-4'>
                <h3 className='text-white text-xl font-bold'>{item.Title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrendingDestination