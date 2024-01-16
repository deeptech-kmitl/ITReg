import React, { useState } from "react";
import { Icon } from "@iconify/react";
import CommentCard from "./CommentCard";

function QuestionCard() {

    const user = "Anonymous1";

    const [database, setDatabase] = useState([
        {
            name: "Anonymous1",
            date: "11/1/2567",
            time: "11.30 PM",
            details: "ให้คะแนนยากไหม...",
            like: ["Anonymous1", "Anonymous6"],
            dislike: ["Anonymous5",],
            answer: [
                {
                    name: "Anonymous6",
                    detail: "ไม่รู้ ไม่รู้ ไม่รู้ ไม่เข้าใจ",
                    date: "13/1/2567",
                    time: "20.30 PM",
                },
                {
                    name: "Anonymous3",
                    detail: "ยากมากกกก ยากสุดดดดๆ",
                    date: "15/1/2567",
                    time: "11.45 PM",
                },
            ],
        },
        {
            name: "Anonymous3",
            date: "14/1/2567",
            time: "15.30 PM",
            details: "อาจารย์กดเกรดไหม",
            like: ["Anonymous6", "Anonymous8"],
            dislike: ["Anonymous5", "Anonymous11", "Anonymous12"],
            answer: [
                {
                    name: "Anonymous13",
                    detail: "กดดัน",
                    date: "11/1/2567",
                    time: "11.30 PM",
                },
            ],
        },
        {
            name: "Anonymous1",
            date: "11/1/2567",
            time: "11.30 PM",
            details: "Going to you like Vroom vroom vroom Vroom vroom vroom ฉันจะเหยียบให้มิดไมล์ Going to you like Vroom vroom vroom Vroom vroom vroom ให้เธอรักฉันหมดใจ Coming to you like",
            like: ["Anonymous1", "Anonymous6"],
            dislike: ["Anonymous5",],
            answer: [
                {
                    name: "Anonymous7",
                    detail: "ohhhhhhhhhhhh",
                    date: "11/1/2567",
                    time: "11.30 PM",
                },
                {
                    name: "Anonymous3",
                    detail: "hiiiiiiiiiii",
                    date: "11/1/2567",
                    time: "11.30 PM",
                },
            ],
        },
        {
            name: "Anonymous3",
            date: "14/1/2567",
            time: "15.30 PM",
            details: "ถ้าไม่มีฉัน อยากจะรู้จริง ๆ ว่าเธอจะอยู่ได้หรือเปล่า ก่อนเคยผ่านเรื่องราว ที่มีความสุขและทุกข์ใจ",
            like: ["Anonymous19", "Anonymous6", "Anonymous8"],
            dislike: ["Anonymous5", "Anonymous11", "Anonymous12"],
            answer: [
                {
                    name: "Anonymous12",
                    detail: "ไม่รู้ ไม่รู้ ไม่รู้ ไม่เข้าใจ",
                    date: "11/1/2567",
                    time: "11.30 PM",
                },
                {
                    name: "Anonymous1",
                    detail: "ยากมากกกก ยากสุดดดดๆ",
                    date: "11/1/2567",
                    time: "11.30 PM",
                },
                {
                    name: "Anonymous36",
                    detail: "ไม่รู้ ไม่รู้ ไม่รู้ ไม่เข้าใจ",
                    date: "11/1/2567",
                    time: "11.30 PM",
                },
                {
                    name: "Anonymous1",
                    detail: "ยากมากกกก ยากสุดดดดๆ",
                    date: "11/1/2567",
                    time: "11.30 PM",
                },
            ],
        },
    ]);

    const handleToggleLike = (index) => {
        setDatabase(
            (dumyDatabase) => {
                const updatedDatabase = [...dumyDatabase];
                const likeByUser = updatedDatabase[index].like.includes(user);

                if (likeByUser) {
                    // ถ้า user กด'like'ในข้อมูลเดิม ให้ลบออก
                    updatedDatabase[index].like = updatedDatabase[index].like.filter(user_id => user_id !== user);
                } else {
                    const dislikeByUser = updatedDatabase[index].dislike.includes(user);
                    if (dislikeByUser) {
                        // ถ้า user กด'dislike'ในข้อมูลเดิม แล้วกด'like' ข้อมูล'dislike'เดิมจะถูกนำออก
                        updatedDatabase[index].dislike = updatedDatabase[index].dislike.filter(user_id => user_id !== user);
                    }
                    // ถ้า user ไม่ได้กด'like'ในข้อมูลเดิม ให้เพิ่มเข้า
                    updatedDatabase[index].like.push(user);
                }
                return updatedDatabase;
            }
        )
    }

    const handleToggleDislike = (index) => {
        setDatabase(
            (dumyDatabase) => {
                const updatedDatabase = [...dumyDatabase];
                const dislikeByUser = updatedDatabase[index].dislike.includes(user);

                if (dislikeByUser) {
                    // ถ้า user กด'dislike'ในข้อมูลเดิม ให้ลบออก
                    updatedDatabase[index].dislike = updatedDatabase[index].dislike.filter(user_id => user_id !== user);
                } else {
                    const likeByUser = updatedDatabase[index].like.includes(user);
                    if (likeByUser) {
                        // ถ้า user กด'like'ในข้อมูลเดิม แล้วกด'dislike' ข้อมูล'like'เดิมจะถูกนำออก
                        updatedDatabase[index].like = updatedDatabase[index].like.filter(user_id => user_id !== user);
                    }
                    // ถ้า user ไม่ได้กด'dislike'ในข้อมูลเดิม ให้เพิ่มเข้า
                    updatedDatabase[index].dislike.push(user);
                }
                return updatedDatabase;
            }
        )
    }

    const [openIndex, setOpenIndex] = useState(null);
    const toggleOpen = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className="mt-4">
            {database.map((question, index) => (
                <div key={index} className="mt-4">
                    <div className="w-[100%] p-6 bg-[#ffffff] border border-gray-200 rounded-xl relative">
                        {/* Can it be Edit/Delete ? */}
                        {question.name === user &&
                            <div className="mt-[2.5px] absolute right-5">
                                <Icon icon="prime:ellipsis-h" color="#151c38" width="19" height="19" />
                            </div>}
                        {/* profile */}
                        <div className="mt-2 flex flex-row">
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
                                {/* Did you like it ? */}
                                {question.like.filter(user_id => user_id === user).length > 0 ?
                                    (
                                        // กรณี มีชื่อ user ใน 'like'
                                        <div name="like" className="rotate-0" onClick={() => handleToggleLike(index)}>
                                            <Icon
                                                icon="streamline:like-1-solid"
                                                color="#D91818"
                                                width="22"
                                                height="22"
                                            />
                                        </div>
                                    ) : (
                                        // กรณี ไม่มีชื่อ user ใน 'like'
                                        <div name="like" className="rotate-0" onClick={() => handleToggleLike(index)}>
                                            <Icon
                                                icon="streamline:like-1"
                                                color="#151c38"
                                                width="22"
                                                height="22"
                                            />
                                        </div>
                                    )}
                                <div className="ml-1 mt-[1px]">
                                    <p className="text-[#151C38] text-sm mr-3">{question.like.length}</p>
                                </div>

                                {/* Did you dislike it ? */}
                                {question.dislike.filter(user_id => user_id === user).length > 0 ?
                                    (
                                        // กรณี มีชื่อ user ใน 'dislike'
                                        <div name="dislike" className="rotate-180" onClick={() => handleToggleDislike(index)}>
                                            <Icon
                                                icon="streamline:like-1-solid"
                                                color="#151c38"
                                                width="22"
                                                height="22"
                                            />
                                        </div>
                                    ) : (
                                        // กรณี ไม่มีชื่อ user ใน 'dislike'
                                        <div name="dislike" className="rotate-180" onClick={() => handleToggleDislike(index)}>
                                            <Icon
                                                icon="streamline:like-1"
                                                color="#151c38"
                                                width="22"
                                                height="22"
                                            />
                                        </div>
                                    )}

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
                            {/* openCardComment */}
                            <div className="border-b-2 border-[#000] py-2 w-[97%]" onClick={() => toggleOpen(index)}>
                                <div className={`rotate-0 absolute right-5 mt-[-2px] ${openIndex === index ? 'rotate-0': 'rotate-180'}`}>
                                    <Icon icon="mingcute:down-line" color="#151c38" width="19" height="19" />
                                </div>
                            </div>
                            <div>
                                {openIndex === index && <CommentCard data={question} />}
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default QuestionCard;