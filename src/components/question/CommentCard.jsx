import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

function CommentCard({ data, openComment, index, toggleComment }) {

    console.log("CommentCard.jsx >>> ", data)
    //data = ข้อมูลคำถาม 1 คำถาม

    // เปิด-ปิด showMore
    const [showMore, setShowmore] = useState(null);
    const toggleShowmore = (index) => {
        setShowmore((prevIndex) => (prevIndex === index ? null : index));
        console.log(index, showMore)
    };

    //ให้แสดง show less/show more โดยปรับตามขนาดจอ
    const [thresholdValue, setThresholdValue] = useState(window.innerWidth / 14); // ค่าเริ่มต้น 1/14 ของความกว้างหน้าจอ

    useEffect(() => {
        const handleResize = () => {
            setThresholdValue(window.innerWidth / 14);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div>
            <div className="flex items-center gap-2">
                <div className="border-gray-300 border-b-[1.5px] w-full"></div>
                <button className={`rotate-180`}>
                    <Icon icon="mingcute:down-line" color='#00000080' width="19" height="19" onClick={() => toggleComment(index)} />
                </button>
            </div>
            {data.answer.map((answer, index) => (
                <div key={index}>
                    {/* profile */}
                    <div className="my-5 mx-2 bg-[#E3F3FF] rounded-[10px]">
                        <p className="text-[#A4A4A4] text-l font-[400] p-3">Answer by {answer.name}</p>
                        <div className="flex px-5 pb-3">
                            <p className="text-[#000000] w-11/12 pl-5 pb-3 ">
                                <span style={{ ...(!(showMore === index) ? { display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', WebkitLineClamp: 1 } : {}) }}>
                                    {answer.detail}
                                </span>
                                {answer.detail.length > thresholdValue && (
                                    <span>
                                        {!(showMore === index) && (
                                            <button className="text-[#A7A7A7] text-sm ml-2" onClick={() => toggleShowmore(index)}>
                                                ...show more
                                            </button>
                                        )}
                                        {showMore === index && (
                                            <button className="text-[#A7A7A7] text-sm ml-2" onClick={() => toggleShowmore(null)}>
                                                ...show less
                                            </button>
                                        )}
                                    </span>
                                )}
                            </p>
                        </div>
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