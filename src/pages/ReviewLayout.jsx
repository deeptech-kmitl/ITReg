import React from 'react'
import { Outlet } from 'react-router-dom'

function ReviewLayout() {
    return (
        <>
            <header className='text-[40px] font-semibold bg-gradient-to-br from-[#0D0B5F] from-[12.5%] to-[#029BE0] to-[100%] inline-block text-transparent bg-clip-text'>
                Review
            </header>
            <div className='w-full h-auto flex mt-5'>
                <Outlet />
            </div>
        </>
    )
}

export default ReviewLayout