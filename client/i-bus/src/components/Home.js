import React from 'react'
import { NavLink } from 'react-router-dom';


function Home() {
  return (
    <>
    <div className='home'>
    {/* <h1>Your safari just began</h1> */}
    <img className='home-image' src='/images/Homeimage.jpg' alt='Homeimage' />
    <div className='sign-up-div'>
    <NavLink className='sign-up' to='/components/Signup'>
        SIGN IN 
      </NavLink>
    </div>
    
    
    </div>
    </>
  )
}
export default Home
