import React, { useState } from 'react'
import { QuestionComponent } from '../components/index'

function ReviewSubjectDetail() {

  const [activeTab, setActiveTab] = useState("review")

  return (
    <div>
      <header className='text-[40px] max-2xl:text-[34px] font-semibold bg-gradient-to-br from-[#0D0B5F] from-[12.5%] to-[#029BE0] to-[100%] inline-block text-transparent bg-clip-text'>
        Review
      </header>

      {/* ReviewDetail */}
      <div name="ReviewDetail">
        <div className='border-2 border-[#000] h-[30dvh]'>
          Review Detail
        </div>
      </div>

      {/* ReviewOrQuestion */}
      <div name="ReviewOrQuestion">
        <div className='h-[50dvh]'>
          <div name='btnReviewOrQuestion'>
            <button
              onClick={() => setActiveTab("review")}
              className={`${activeTab === "review" ? "border-[#181754] text-[#181754]" : "border-[#00000020] text-[#00000020]"} border-b-4 px-5`}>
              Review
            </button>
            <button
              onClick={() => setActiveTab("question")}
              className={`${activeTab === "question" ? "border-[#181754] text-[#181754]" : "border-[#00000020] text-[#00000020]"} border-b-4 px-5`}>
              Question
            </button>
          </div>
          <div className='h-full' >
            {activeTab === "review" && <div>review</div>}
            {activeTab === "question" && <QuestionComponent/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewSubjectDetail