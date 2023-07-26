import React from 'react'
import {NavLink} from 'react-router-dom'
function Navbar() {
  return (
    <>
    <div>
    <NavLink className='navLink' to ="/components/Home">
        Home |
    </NavLink>
    </div>
    </>
  )
}
export default Navbar
