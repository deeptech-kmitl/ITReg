import React, { useState } from "react";
import { Icon } from "@iconify/react";
import CommentCard from "./CommentCard";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";

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

    // Modal edit open
    const [textQues, setTextQues] = useState('');
    const [cloneQuestion, setCloneQuestion] = useState('');
    const handleInputQuestionChange = (e) => {
        setTextQues(e.target.value);
    };

    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const toggleModalEdit = (question) => {
        console.log(question)
        if (question == "save") {
            console.log("Save toggle Edit")
            // ค้นหา index ของข้อมูลที่ต้องการอัพเดท
            const dataIndex = database.findIndex((item) => item.id === cloneQuestion.id);
            setDatabase((prevDatabase) => {
                const updatedDatabase = [...prevDatabase];
                updatedDatabase[dataIndex].details = textQues;
                return updatedDatabase;
            })
            setCloneQuestion('')
            setTextQues('')
        }
        else {
            setCloneQuestion(question)
            setTextQues(question.details)
        }
        setIsModalEditOpen(!isModalEditOpen);
    };

    // Modal delete open
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const toggleModalDelete = () => {
        setIsModalDeleteOpen(!isModalDeleteOpen);
    };

    return (
        <div className="mt-4">
            {database.map((question, index) => (
                <div key={index} className="mt-4">
                    <div className="max-w p-6 bg-white border border-gray-200 rounded-xl mt-4">
                        {/* profile */}
                        <div className="mt-2 flex flex-row">
                            <div className="w-[50px] h-[50px] flex-shrink-0 rounded-full bg-[#151C38]"></div>
                            {/* Can it be Edit/Delete ? */}
                            {question.name === user &&
                                <Menu placement="bottom-end">
                                    <MenuHandler>
                                        <div className="absolute right-20 cursor-pointer">
                                            <Icon icon="prime:ellipsis-h" color="#151c38" width="19" height="19" />
                                        </div>
                                    </MenuHandler>
                                    <MenuList className="bg-[#ffffff] border border-gray-200 shadow-md rounded-xl text-sm">
                                        <MenuItem className="hover:bg-gray-200 cursor-pointer rounded-xl" onClick={() => toggleModalEdit(question)} >
                                            <div className="flex item-center py-3">
                                                <Icon
                                                    icon="fluent:edit-24-regular"
                                                    color="#727272"
                                                    width="15"
                                                    height="15"
                                                />
                                                <span className="pl-3 text-gray-700">Edit Review</span>
                                            </div>
                                        </MenuItem>
                                        <MenuItem className="hover:bg-gray-200 cursor-pointer rounded-xl" onClick={toggleModalDelete}>
                                            <div className="hover:bg-gray-200 cursor-pointer">
                                                <div className="flex item-center py-3">
                                                    <Icon
                                                        icon="mingcute:delete-3-line"
                                                        color="#727272"
                                                        width="15"
                                                        height="15"
                                                    />
                                                    <p className="pl-3 text-gray-700">Delete Review</p>
                                                </div></div>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            }
                            {/* Modal edit Review */}
                            {isModalEditOpen && (
                                <div
                                    id="modal-edit"
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
                                                    <button type="button" class="absolute top-5 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setIsModalEditOpen(false)}>
                                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
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
                                                <div className="flex items-center p-4 md:p-5 rounded-b mt-[-20px] mb-2">
                                                    <button
                                                        onClick={() => toggleModalEdit("save")}
                                                        type="button"
                                                        className="text-white bg-gradient-to-br from-[#0D0B5F] to-[#029BE0] hover:from-[#029BE0] hover:to-[#0D0B5F] font-medium rounded-lg text-lg px-10 py-2 text-center w-full"
                                                    >
                                                        SAVE
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* modal delete */}
                            {isModalDeleteOpen && (
                                <div
                                    id="modal-delete"
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
                                                        Delete Review
                                                    </h5>
                                                    {/* close */}
                                                    <button type="button" class="absolute top-5 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setIsModalDeleteOpen(false)}>
                                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                {/* body */}
                                                <div className="flex flex-col p-4 md:p-5 justify-center items-center text-2xl font-normal">
                                                    <p>Are you sure you want to</p>
                                                    <p>delete your Question?</p>
                                                </div>
                                                {/* footer */}
                                                <div className="flex flex-row gap-4 mb-2 mt-6">
                                                    <div className="flex items-center pl-6 rounded-b mt-[-20px] mb-2 w-full">
                                                        <button
                                                            onClick={() => setIsModalDeleteOpen(false)}
                                                            type="button"
                                                            className="text-gray-500 bg-white hover:from-[#029BE0] hover:to-[#0D0B5F] font-medium rounded-lg text-lg px-10 py-2 text-center w-full border-2 border-[#D9D9D9]"
                                                        >
                                                            Cancle
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center pr-6 rounded-b mt-[-20px] mb-2 w-full">
                                                        <button
                                                            onClick={() => setIsModalDeleteOpen(false)}
                                                            type="button"
                                                            className="text-white bg-gradient-to-br from-[#0D0B5F] to-[#029BE0] hover:from-[#029BE0] hover:to-[#0D0B5F] font-medium rounded-lg text-lg px-10 py-2 text-center w-full"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
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
                                <div className="mt-[2.5px]" onClick={() => toggleComment(index)}>
                                    <Icon icon="iconamoon:comment" color="#151c38" width="19" height="19" />
                                </div>
                                <div className="ml-1 mt-[1px]">
                                    <p className="text-[#151C38] text-sm">{question.answer.length}</p>
                                </div>
                            </div>
                            {/* openCardComment */}
                            <div className={`py-2 w-[97%] cursor-pointer ${openComment === index && ''}`} onClick={() => toggleComment(index)}>
                                {/* <div className={`rotate-180`}>
                                    <Icon icon="mingcute:down-line" color={`${openComment === index ? '#151c38' : '#0000'}`} width="19" height="19" />
                                </div> */}
                            </div>
                            <div className="">
                                {openComment === index && <CommentCard data={question} openComment={openComment} index={index} toggleComment={toggleComment} />}
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default QuestionCard;