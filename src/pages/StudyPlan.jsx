import React, { useState } from 'react';
import { StudyPlanForm } from '../components/index';

function StudyPlan() {

  return (
    <div>
      <header className='text-[40px] max-2xl:text-[34px] font-semibold bg-gradient-to-br from-[#0D0B5F] from-[12.5%] to-[#029BE0] to-[100%] inline-block text-transparent bg-clip-text'>
        Study plan
      </header>
      <div className="flex p-10 items-center justify-center">
        <StudyPlanForm />
      </div >
    </div >
  )
}

export default StudyPlan