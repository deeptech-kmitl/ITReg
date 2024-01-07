import React from 'react'
import SignUpBG from '../assets/SignUpBG.png'

function SignUp() {
    return (
        <div style={{ backgroundImage: `url(${SignUpBG})` }}
            className='bg-no-repeat bg-cover bg-center h-screen px-40 py-16 bg-[#181754] text-white'
        >
            <div className='flex justify-center items-center h-full text-3xl'>
                Sign Up
            </div>
        </div>
    )
}

export default SignUp