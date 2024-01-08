import React from 'react'

function Review() {
  return (
    <div>
      <header className='text-[40px] font-semibold bg-gradient-to-br from-[#0D0B5F] from-[12.5%] to-[#029BE0] to-[100%] inline-block text-transparent bg-clip-text'>
        Review
      </header>
      <div className='w-full h-auto flex mt-5'>
        <div className='w-[70%] pr-10'>
          รายวิชาเรียน
        </div>
        <div className='w-[30%] border-l-[1px] border-[#00000052] px-10'>
          <h1 className='text-[26px] font-medium'>Announcement</h1>
        </div>
      </div>
    </div>
  )
}

export default Review