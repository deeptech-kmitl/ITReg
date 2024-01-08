import React from 'react'
import SignInBG from '../assets/SignInBG.png'
import { Link } from "react-router-dom";
import Logo from '../assets/Logo.png'
import SignInImage from '../assets/SignInImage.png'


function SignIn() {
    return (
        <div style={{ backgroundImage: `url(${SignInBG})` }}
            className='bg-no-repeat bg-cover bg-center h-screen px-40 py-16 bg-[#181754] text-white'
        >
            <div className='flex justify-center items-center h-full text-3xl'>
                {/* <div className="grid grid-cols-2"> */}
                    <div className='flex flex-col justify-center items-center w-1/2'>
                        <Link to='/'><img src={Logo} alt="Logo" className='w-28' /></Link>
                        <h1 className='font-bold text-[60px] tracking-[2px] mt-4'>LOGIN</h1>
                        <p className='font-light text-[40px] tracking-[2px] mt-4'>Login to continues</p>
                        {/* <input
                            type="email" className='bg-[#FFFFFF] mt-8 w-[600px] border border-[#D9D9D9] text-lg rounded-xl block p-2.5 dark:placeholder-gray-400 text-[#151C38] focus:border-[#000000] focus:ring-[#000000]'
                            placeholder="Email"
                        />
                        <input
                            type="password" className='bg-[#FFFFFF] mt-4 w-[600px] text-lg rounded-xl block p-2.5 dark:placeholder-gray-400 text-[#151C38]'
                            placeholder="Password"
                        /> */}
                        <form action="" className='flex flex-col gap-6 mt-6'>
                            <div className='input-box'>
                                <input type='text' name='email' placeholder='Email' className='w-[600px] h-[60px]'></input>
                            </div>
                            <div className='input-box'>
                               <input type='password' name='password' placeholder='Password' className='w-[600px] h-[60px]'></input> 
                            </div>
                        </form>

                        <Link to='/dashboard' className='box-btnGradient font-bold text-[20px] text-[#0cb6ff] flex flex-col justify-center items-center py-3 mt-10 w-[600px]'>LOGIN</Link>

                    </div>
                    <div className='flex flex-col justify-center items-center ml-20 w-1/2'>
                        <img src={SignInImage}></img>
                        <div>
                            <p className='font-normal text-[25px] inline'>Don't have an account?  </p>
                            <p className='font-normal text-[25px] textGradient underline underline-offset-4 decoration-[#3753cf8f] inline'>Sign Up</p>
                        </div>
                    </div>

                </div>

            </div>
        // </div>
    )
}

export default SignIn