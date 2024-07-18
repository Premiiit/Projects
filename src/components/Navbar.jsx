import React from 'react'

const Navbar = () => {
  return (
    <nav>
      <div className="flex justify-between bg-indigo-900 text-white py-2">
        <div className="logo font-bold text-xl mx-9">
            <span>iTask</span>
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
