import React from "react";
import QuestionCard from "./QuestionCard";

function QuestionComponent() {

    return (
        <div className="w-full border-2 rounded-[30px] bg-[#ffffff] p-[20px] h-full">
            {/* สร้างคำถาม */}
            <div name="post" className="relative ">
                <input
                    className="w-full h-[60px] rounded-[10px] border-0 py-1.5 pl-7 pr-28 text-[16px] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 focus:ring-inset focus:ring-[#0D0B5F] "
                    placeholder="Question"
                ></input>
                <button
                    className="py-[6px] px-[12px] rounded-[10px] bg-gradient-to-br 
                    from-[#0D0B5F] from-[12.5%] to-[#029BE0] to-[100%] text-[#ffffff]  
                    hover:from-[#029BE0] hover:to-[#0D0B5F]
                    absolute right-4 top-3 text-[16px]"
                >
                    POST
                </button>
            </div>

            {/* QuestionCard */}
            <QuestionCard />
        </div>
    )

}

export default QuestionComponent