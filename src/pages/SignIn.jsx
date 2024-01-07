import React from 'react'
import SignInBG from '../assets/SignInBG.png'


function SignIn() {
    return (
        <div style={{ backgroundImage: `url(${SignInBG})` }}
            className='bg-no-repeat bg-cover bg-center h-screen px-40 py-16 bg-[#181754] text-white'
        >
            <div className='flex justify-center items-center h-full text-3xl'>
                Sign In
            </div>
        </div>
    )
}

export default SignIn