import React from "react";
import { Icon } from "@iconify/react";

function CommentCard({ data }) {

    console.log("CommentCard.jsx >>> ",data)
    //data = ข้อมูลคำถาม 1 คำถาม
    return (
        <div>
            {data.answer.map((answer, index) => (
                <div>
                    {/* profile */}
                    <div className="my-5 mx-2 bg-[#E3F3FF] rounded-[10px]">
                        <p className="text-[#A4A4A4] text-l font-[400] p-3">Answer by {answer.name}</p>
                        <p className="text-[#000000] text-l pl-5 pb-3">{answer.detail}</p>
                    </div>
                </div>
            ))}
            <div name="post" className="relative mx-2">
                <input
                    className="w-full h-[50px] rounded-[10px] border-0 py-5 pl-7 pr-20 text-[16px] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 focus:ring-inset focus:ring-[#0D0B5F] "
                    placeholder="Answer"
                ></input>
                <button
                    className="py-[6px] px-[12px] rounded-[10px] bg-gradient-to-br from-[#0D0B5F] from-[12.5%] to-[#029BE0] to-[100%] text-[#ffffff] hover:from-[#029BE0] hover:to-[#0D0B5F] absolute right-4 top-3 text-[16px]">
                    <Icon icon="wpf:sent" color="#fff" className="py-0.1" />
                </button>
            </div>
        </div>
    )

}
export default CommentCard;