import React from 'react'

export function Heading({ title }) {
    return (
      <div>
      <h1 className="mb-10 text-center font-extrabold text-gray-900 dark:text-white">
  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-600 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
    SwiftPay
  </span>
  <span className="block mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
    {title}
  </span>
</h1>



      </div>
    );
  }
  
