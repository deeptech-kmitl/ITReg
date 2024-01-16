import React, { useState } from "react";
import { Icon } from "@iconify/react";
import CommentCard from "./CommentCard";

function QuestionCard() {

    const user = "Anonymous1";

    const [database, setDatabase] = useState([
        {
            id: '1',
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
            id: '2',
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
            id: '3',
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
            id: '4',
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
        console.log("กด like")
        setDatabase(
            (dumyDatabase) => {
                const updatedDatabase = [...dumyDatabase];
                const likeByUser = updatedDatabase[index].like.includes(user);
                console.log('user มีข้อมูลใน like >>> ', likeByUser)

                // user ไม่มีข้อมูลใน like >>> จะใส่สี
                if (!likeByUser) {
                    const dislikeByUser = updatedDatabase[index].dislike.includes(user);
                    if (dislikeByUser) {
                        // ถ้า user กด'dislike'ในข้อมูลเดิม แล้วกด'like' ข้อมูล'dislike'เดิมจะถูกนำออก
                        updatedDatabase[index].dislike = updatedDatabase[index].dislike.filter(user_id => user_id !== user);
                    }
                    // เพิ่ม user ลง 'like'
                    updatedDatabase[index].like.push(user);
                }
                // user มีข้อมูลใน like >>> จะลบสี
                else {
                    updatedDatabase[index].like = updatedDatabase[index].like.filter(user_id => user_id !== user);
                }
                return updatedDatabase;
            }
        )
    }

    const handleToggleDislike = (index) => {
        console.log("กด dislike")
        setDatabase(
            (dumyDatabase) => {
                const updatedDatabase = [...dumyDatabase];
                const dislikeByUser = updatedDatabase[index].dislike.includes(user);
                console.log('user มีข้อมูลใน dislike >>> ', dislikeByUser)

                // user ไม่มีข้อมูลใน dislike >>> จะใส่สี
                if (!dislikeByUser) {
                    const likeByUser = updatedDatabase[index].like.includes(user);
                    if (likeByUser) {
                        // ถ้า user กด'like'ในข้อมูลเดิม แล้วกด'dislike' ข้อมูล'like'เดิมจะถูกนำออก
                        updatedDatabase[index].like = updatedDatabase[index].like.filter(user_id => user_id !== user);
                    }
                    // เพิ่ม user ลง 'dislike'
                    updatedDatabase[index].dislike.push(user);
                }
                // user มีข้อมูลใน dislike >>> จะลบสี
                else {
                    updatedDatabase[index].dislike = updatedDatabase[index].dislike.filter(user_id => user_id !== user);
                }
                console.log(updatedDatabase)
                return updatedDatabase;
            }
        )
    }

    // เปิด-ปิด Comment
    const [openComment, setOpenComment] = useState(null);
    const toggleComment = (index) => {
        setOpenComment((prevIndex) => (prevIndex === index ? null : index));
    };

    // เปิด-ปิด edit/delete Question
    const [openEditOrDelete, setOpenEditOrDelete] = useState(null);
    const toggleEditOrDelete = (index) => {
        setOpenEditOrDelete((prevIndex) => (prevIndex === index ? null : index));
    }

    // เปิด-ปิด edit
    const [openEdit, setOpenEdit] = useState(false);
    const [textQues, setTextQues] = useState('');
    const [cloneQuestion, setCloneQuestion] = useState('');
    const handleInputQuestionChange = (e) => {
        setTextQues(e.target.value);
    };
    const toggleEdit = (question, type) => {
        if (openEdit === false && type === 'open') {
            console.log("Open toggle Edit")
            setOpenEdit(true)
            setCloneQuestion(question)
            setTextQues(question.details)
        }
        else if (openEdit === true && type === 'close') {
            console.log("Close toggle Edit")
            setOpenEdit(false)
        }
        else if (openEdit === true && type === 'save') {
            console.log("Save toggle Edit")
            // ค้นหา index ของข้อมูลที่ต้องการอัพเดท
            const dataIndex = database.findIndex((item) => item.id === cloneQuestion.id);
            setDatabase((prevDatabase) => {
                const updatedDatabase = [...prevDatabase];
                updatedDatabase[dataIndex].details = textQues;
                return updatedDatabase;
            })
            setOpenEdit(false)
            setOpenEditOrDelete(null)
            setCloneQuestion('')
            setTextQues('')
        }
    }

    return (
        <div className="mt-4">
            {database.map((question, index) => (
                <div key={index} className="mt-4">
                    <div className="w-[100%] p-6 bg-[#ffffff] border border-gray-200 rounded-xl relative">
                        {/* Can it be Edit/Delete ? */}
                        {question.name === user &&
                            <div className="mt-[2.5px] absolute right-5 cursor-pointer" onClick={() => toggleEditOrDelete(index)}>
                                <Icon icon="prime:ellipsis-h" color="#151c38" width="19" height="19" />
                            </div>}
                        {openEditOrDelete === index && (
                            <div className="absolute bg-[#ffffff] border border-gray-200 shadow-md rounded-xl right-4 top-14">
                                <ul className="py-2 text-sm text-gray-700">
                                    <li className="hover:bg-gray-200 cursor-pointer" onClick={() => toggleEdit(question, 'open')}><div className="flex item-center py-3 px-4">
                                        <Icon
                                            icon="fluent:edit-24-regular"
                                            color="#727272"
                                            width="15"
                                            height="15"
                                        />
                                        <p className="px-3">Edit Question</p>
                                    </div></li>
                                    <li className="hover:bg-gray-200 cursor-pointer"><div className="flex item-center py-3 px-4">
                                        <Icon
                                            icon="mingcute:delete-3-line"
                                            color="#727272"
                                            width="15"
                                            height="15"
                                        />
                                        <p className="px-3">Delete Question</p>
                                    </div></li>
                                </ul>
                            </div>
                        )}
                        {openEdit && (
                            <div
                                id="default-modal"
                                tabIndex="-1"
                                aria-hidden="true"
                                className="fixed inset-0 overflow-y-auto"
                                style={{ zIndex: 1001, borderRadius: "30px" }}
                            >
                                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                    <div
                                        className="fixed inset-0 transition-opacity"
                                        aria-hidden="true"
                                    >
                                        <div className="absolute inset-0 bg-gray-500 opacity-25"></div>
                                    </div>

                                    <span
                                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                                        aria-hidden="true"
                                    >
                                        &#8203;
                                    </span>

                                    <div className="inline-block align-bottom bg-white rounded-[20px] text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                        <div className="bg-white rounded-[30px]">

                                            {/* header */}
                                            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                                <h5 className="text-[27px] font-semibold bg-gradient-to-br from-[#0D0B5F] from-[12.5%] to-[#029BE0] to-[100%] text-transparent bg-clip-text text-center w-full">
                                                    Edit Question
                                                </h5>
                                                {/* close */}
                                                <button type="button" onClick={() => toggleEdit('', 'close')} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center hover:bg-gray-300 hover:text-white">
                                                    <svg
                                                        className="w-3 h-3"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 14 14"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                            {/* body */}
                                            <div className="p-4 md:p-5 space-y-4">
                                                <textarea
                                                    rows="4"
                                                    cols="50"
                                                    placeholder="Text to something ..."
                                                    className="border-none outline-none p-2 mb-4 w-full resize-none focus:ring-0 text-base font-normal"
                                                    value={textQues}
                                                    onChange={handleInputQuestionChange}
                                                />
                                            </div>
                                            {/* footer */}
                                            <div className="flex items-center p-4 md:p-5 rounded-b mt-[-20px]">
                                                <button
                                                    onClick={() => toggleEdit('', 'save')}
                                                    type="button"
                                                    className="text-white bg-gradient-to-br from-[#0D0B5F] to-[#029BE0] hover:from-[#029BE0] hover:to-[#0D0B5F] font-medium rounded-lg text-[15px] px-10 py-2 text-center w-full"
                                                >
                                                    Post
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                        )}

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
                                        {question.like.filter(user_id => user_id === user).length === 1 ?
                                            (
                                                // กรณี มีชื่อ user ใน 'like'
                                                <div name="like" className="rotate-0 cursor-pointer" onClick={() => handleToggleLike(index)}>
                                                    <Icon
                                                        icon="streamline:like-1-solid"
                                                        color="#D91818"
                                                        width="22"
                                                        height="22"
                                                    />
                                                </div>
                                            ) : (
                                                // กรณี ไม่มีชื่อ user ใน 'like'
                                                <div name="like" className="rotate-0 cursor-pointer" onClick={() => handleToggleLike(index)}>
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
                                        {question.dislike.filter(user_id => user_id === user).length === 1 ?
                                            (
                                                // กรณี มีชื่อ user ใน 'dislike'
                                                <div name="dislike" className="rotate-180 cursor-pointer" onClick={() => handleToggleDislike(index)}>
                                                    <Icon
                                                        icon="streamline:like-1-solid"
                                                        color="#151c38"
                                                        width="22"
                                                        height="22"
                                                    />
                                                </div>
                                            ) : (
                                                // กรณี ไม่มีชื่อ user ใน 'dislike'
                                                <div name="dislike" className="rotate-180 cursor-pointer" onClick={() => handleToggleDislike(index)}>
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
                                    <div className="border-b-2 border-[#000] py-2 w-[97%] cursor-pointer" onClick={() => toggleComment(index)}>
                                        <div className={`rotate-0 absolute right-5 mt-[-2px] ${openComment === index ? 'rotate-0' : 'rotate-180'}`}>
                                            <Icon icon="mingcute:down-line" color="#151c38" width="19" height="19" />
                                        </div>
                                    </div>
                                    <div>
                                        {openComment === index && <CommentCard data={question} />}
                                    </div>
                                </div>

                            </div>
                </div>
            ))}
                </div>
            )
}

            export default QuestionCard;