import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
      <nav className='flex item-center justify-between  bg-slate-800 px-8 py-3 font-white'>
          <Link className='text-white font-bold' href={'/'} >GTCoding</Link>
          <Link className='bg-white p-2' href={'/addTopic'} >Add Topic</Link>
    </nav>
  )
}

export default Navbar