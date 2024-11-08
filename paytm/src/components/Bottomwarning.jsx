import React from 'react'
import { Link } from 'react-router-dom'

export  function Bottomwarning({text,linktext,page}) {
  return (
    <div>
      
<p class="text-gray-500 dark:text-gray-400">
    {text}
    <Link to={page} class="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline">{linktext}</Link>
     
     </p>

    </div>
  )
}
