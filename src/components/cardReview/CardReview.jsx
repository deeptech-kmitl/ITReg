import React, { useState } from "react";

function CardReview() {
    const [data, setData] = useState([
    {
        userId: "1",
        name: "Anonymous1",
        date: "10/01/2024",
        time: "11.30 PM",
        reviewDetails: "สนุกมากๆค่ะ อาจารย์สอนดีมาก เริ่ดอันดับ1",
        rating: 5,
        grade: "A",
        like: ["Anonymous1", "Anonymous6"],
        dislike: ["Anonymous5",],
    },
    {
        userId: "2",
        name: "Anonymous2",
        date: "11/01/2024",
        time: "10.30 PM",
        reviewDetails: "เรียนได้เรื่อยๆแต่ก้สนุกดีค้าบ ให้เกรดยากมากงง",
        rating: 3,
        grade: "C",
        like: ["Anonymous1", "Anonymous6"],
        dislike: ["Anonymous5",],
    }
])
    return (
        <div className="mt-4">
            {data.map((review, index) => (
                <div className="max-w p-6 bg-white border border-gray-200 rounded-xl mt-4">
                <div className="mt-2 flex flex-row">
                    <div className="w-[50px] h-[50px] flex-shrink-0 rounded-full bg-[#151C38]"></div>
                    <div className="ml-4">
                        <p className="text-[#151C38] text-l font-[400]">{review.name}</p>
                        <p className="text-[#A4A4A4] text-l font-[350]">
                            {review.date}, {review.time}
                        </p>
                    </div>
                    <img className="w-[18px] h-[18px] absolute right-20" src="https://img.icons8.com/ios-filled/50/151c38/ellipsis.png" alt="" />
                </div>
                <div className="flex flex-row mt-2">
                    <p className="font-medium text-[#A4A4A4]">Rating</p>
                    <img className="w-[24px] h-[24px] ml-2" src="https://img.icons8.com/fluency/48/star--v1.png"></img>
                    <p className="font-medium text-[#A4A4A4] ml-2">Grade</p>
                    <img className="ml-2 w-[24px] h-[24px]" src="https://img.icons8.com/color/48/dryclean-with-any-solvent.png"></img>
                </div>
                <div className="mt-2">
                    <p className="text-[#151C38] font-normal">{review.reviewDetails}</p>
                </div>
                <div className="flex flex-row mt-2">
                    <img className="w-[28px] h-[28px]" src="https://img.icons8.com/sf-regular-filled/48/cd0404/facebook-like.png" alt="" />
                    <p className="ml-2 text-[#151C38]">{review.like.length}</p>

                    <img className="ml-2 w-[24px] h-[24px] mt-1" src="https://img.icons8.com/external-tanah-basah-detailed-outline-tanah-basah/48/cd0404/external-dislike-user-interface-tanah-basah-detailed-outline-tanah-basah.png" alt="" />
                    <p className="ml-2 text-[#151C38]">{review.dislike.length}</p>
                </div>
            </div>
            ))}
        </div>
    );
}

export default CardReview;