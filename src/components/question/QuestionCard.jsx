import React from "react";
import { Icon } from "@iconify/react";

function QuestionCard() {

    const database = [
        {
            name: "Anonymous1",
            date: "11/1/2567",
            time: "11.30 PM",
            details: "ให้คะแนนยากไหม...",
            like: ["Anonymous1", "Anonymous6"],
            dislike: ["Anonymous5",],
            answer: ["Anonymous6", "Anonymous4",],
        },
        {
            name: "Anonymous3",
            date: "14/1/2567",
            time: "15.30 PM",
            details: "อาจารย์กดเกรดไหม",
            like: ["Anonymous1", "Anonymous6", "Anonymous8"],
            dislike: ["Anonymous5", "Anonymous11", "Anonymous12"],
            answer: ["Anonymous7", "Anonymous15", "Anonymous18", "Anonymous8", "Anonymous6", "Anonymous7"],
        },
        {
            name: "Anonymous1",
            date: "11/1/2567",
            time: "11.30 PM",
            details: "ให้คะแนนยากไหม...",
            like: ["Anonymous1", "Anonymous6"],
            dislike: ["Anonymous5",],
            answer: ["Anonymous6", "Anonymous4",],
        },
        {
            name: "Anonymous3",
            date: "14/1/2567",
            time: "15.30 PM",
            details: "อาจารย์กดเกรดไหม",
            like: ["Anonymous1", "Anonymous6", "Anonymous8"],
            dislike: ["Anonymous5", "Anonymous11", "Anonymous12"],
            answer: ["Anonymous7", "Anonymous15", "Anonymous18", "Anonymous8", "Anonymous6", "Anonymous7"],
        },
    ];

    return (
        <div className="overflow-y-scroll static h-[38dvh]">
            {database.map((question, index) => (
                <div className="pt-[20px]">
                    <div className="w-[100%] border-2 rounded-[10px] bg-[#ffffff] p-[20px]">
                        {/* profile */}
                        <div className="mt-3 flex items-start">
                            <div className="w-[50px] h-[50px] flex-shrink-0 rounded-full bg-[#151C38]"></div>
                            <div className="ml-4">
                                <p className="text-[#151C38] text-l font-[400]">{question.name}</p>
                                <p className="text-[#A4A4A4] text-l font-[350]">
                                    {question.date}, {question.time}
                                </p>
                            </div>
                        </div>
                        {/* detail question */}
                        <div className="mt-5">
                            <div className="text-black text-l font-light">{question.details}</div>
                            {/* emotion */}
                            <div className="mt-3 flex items-start">
                                <div name="like" className="rotate-0">
                                    <Icon
                                        icon="streamline:like-1"
                                        color="#151c38"
                                        width="22"
                                        height="22"
                                    />
                                </div>
                                <div className="ml-1 mt-[1px]">
                                    <p className="text-[#151C38] text-sm mr-3">{question.like.length}</p>
                                </div>
                                <div name="dislike" className="rotate-180 ">
                                    <Icon
                                        icon="streamline:like-1"
                                        color="#151c38"
                                        width="22"
                                        height="22"
                                    />
                                </div>
                                <div className="ml-1 mt-[1px]">
                                    <p className="text-[#151C38] text-sm mr-3">{question.dislike.length}</p>
                                </div>
                                <div className="mt-[2.5px]">
                                    <Icon icon="iconamoon:comment" color="#151c38" width="19" height="19" />
                                </div>
                                <div className="ml-1 mt-[1px]">
                                    <p className="text-[#151C38] text-sm">{question.answer.length}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default QuestionCard;