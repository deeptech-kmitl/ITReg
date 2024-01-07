import React from 'react'
import { Outlet, Link } from "react-router-dom";
import Homepage_bg from '../assets/Homepage_bg.png'
import Logo from '../assets/Logo.png'


function Homepage() {

    return (
        <div style={{ backgroundImage: `url(${Homepage_bg})` }}
            className='bg-no-repeat bg-cover bg-center h-screen px-40 py-16 bg-[#181754] text-white'>
            <div className='flex justify-between items-center'>
                <Link to='/'><img src={Logo} alt="Logo" className='w-28' /></Link>
                <div className='flex gap-12'>
                    <ul>
                        <li><Link to='signIn' className=''>Sign In</Link></li>
                    </ul>
                    <ul>
                        <li><Link to='signUp' className='box-btnGradient text-[#0cb6ff] px-5 py-2'>Sign Up</Link></li>
                    </ul>
                </div>
            </div>
            <div className='h-full flex flex-col justify-center items-center'>
                <h2 className='font-semibold text-[80px] tracking-[2px]'>HOW TO</h2>
                <h1 className='font-bold text-[120px] tracking-[15px] mt-[-50px] textTitleGradient'
                >
                    REGISTER</h1>
                <div className='flex flex-col items-center text-[22px] font-light mt-2'>
                    <p className=''>There are several steps to help you get ready for your college experience</p>
                    <p className=''>here are some tips on how to register for college classes.</p>
                </div>
                <Link className='box-btnGradient font-medium text-[20px] text-[#0cb6ff] px-9 py-3 mt-20' to="/dashboard">Get Started</Link>
            </div>
        </div>
    )
}

export default Homepage