import React from 'react'

export function Heading({ title }) {
    return (
      <div>
        <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            SwiftPay </span>
          {title}
        </h1>
      </div>
    );
  }
  
