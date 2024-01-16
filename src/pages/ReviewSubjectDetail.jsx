import React, { useState } from 'react'
import CardDetailSubject from '../components/cardReview/CardDetailSubject'
import CardReview from '../components/cardReview/CardReview'
import QuestionCard from '../components/question/QuestionCard'

function ReviewSubjectDetail() {

  const [activeTab, setActiveTab] = useState("review")

  return (
    <div className='w-full'>
      {/* ReviewDetail */}
      <div name="ReviewDetail">
        <CardDetailSubject />
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
            {activeTab === "review" &&
              <div>
                <div className="w-full mt-4 border-2 rounded-[30px] bg-[#ffffff] p-[20px]">
                  {/* สร้างรีวิว */}
                  <div className='inputReview flex flex-row gap-3 drop-shadow-sm'>
                    <input type='text' name='review' placeholder='Type to search ...' className='w-full h-[50px] font-light pr-[65px]'></input>
                    <button
                      className="py-[6px] px-[12px] rounded-[10px] bg-gradient-to-br 
                    from-[#0D0B5F] from-[12.5%] to-[#029BE0] to-[100%] text-[#ffffff]  
                    hover:from-[#029BE0] hover:to-[#0D0B5F]
                    absolute right-2 mt-2 text-[16px]"
                    >
                      <img src='https://img.icons8.com/material-outlined/24/FFFFFF/plus-math--v1.png'></img>
                    </button>
                  </div>
                  <CardReview />
                </div>
              </div>}
            {activeTab === "question" &&
              <div className="w-full mt-4 border-2 rounded-[30px] bg-[#ffffff] p-[20px]">
                {/* สร้างคำถาม */}
                <div className='inputReview flex flex-row gap-3 drop-shadow-sm'>
                  <input type='text' placeholder="Question" className="w-full h-[50px] font-light pr-[80px]"></input>
                  <button
                    className="py-[6px] px-[12px] rounded-[10px] bg-gradient-to-br 
                    from-[#0D0B5F] from-[12.5%] to-[#029BE0] to-[100%] text-[#ffffff]  
                    hover:from-[#029BE0] hover:to-[#0D0B5F]
                    absolute right-2 top-2 text-[16px]"
                  >
                    POST
                  </button>
                </div>

                {/* QuestionCard */}
                <QuestionCard />
              </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewSubjectDetail