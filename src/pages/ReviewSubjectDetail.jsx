import React, { useState } from 'react'
import { QuestionComponent } from '../components/index'
import CardDetailSubject from '../components/cardReview/CardDetailSubject'

function ReviewSubjectDetail() {

  const [activeTab, setActiveTab] = useState("review")

  return (
    <div className='w-full'>
      {/* ReviewDetail */}
      <div name="ReviewDetail">
        <CardDetailSubject/>
      </div>

      {/* ReviewOrQuestion */}
      <div name="ReviewOrQuestion">
        <div className='h-[48dvh] mt-4'>
          <div name='btnReviewOrQuestion'>
            <button
              onClick={() => setActiveTab("review")}
              className={`${activeTab === "review" ? "border-[#151C38] text-[#151C38] font-medium text-lg" : "border-[#00000020] text-[#00000020] font-medium text-lg"} border-b-4 px-5`}>
              Review
            </button>
            <button
              onClick={() => setActiveTab("question")}
              className={`${activeTab === "question" ? "border-[#151C38] text-[#151C38] font-medium text-lg" : "border-[#00000020] text-[#00000020] font-medium text-lg"} border-b-4 px-5`}>
              Question
            </button>
          </div>
          <div className='h-full' >
            {activeTab === "review" && <div>review</div>}
            {activeTab === "question" && <QuestionComponent />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewSubjectDetail