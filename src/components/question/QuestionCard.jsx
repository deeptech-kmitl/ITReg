import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import CommentCard from "./CommentCard";
import { baseURL } from "../../../baseURL";
import axios from "axios";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { UserAuth } from "../../context/AuthContext";
function QuestionCard({ id, questionParent }) {
    const { user, role } = UserAuth()
    const [questions, setQuestions] = useState([])
    const [questionId, setQuestionId] = useState('')
    useEffect(() => {
        fetchQuestions()
    }, [questionParent])
    const fetchQuestions = async () => {
        try {
            const response = await axios.get(baseURL + `getQuestions/${id}`);
            setQuestions(response.data); // Update the review state with the fetched data

        } catch (error) {
            console.error('Error fetching review:', error);
        }
    };
    const convertTimestampToTime = (timestamp) => {
        // Convert timestamp to milliseconds
        const milliseconds = timestamp._seconds * 1000 + Math.round(timestamp._nanoseconds / 1000000);

        // Create a new Date object
        const date = new Date(milliseconds);

        // Format the date and time
        const formattedTime = date.toLocaleString(); // You can customize the format here

        return formattedTime;
    };
    // const handleToggleLike = (questionId) => {
    //     console.log("กด like", questionId)
    //     setDatabase(
    //         (database) => {
    //             const updatedDatabase = [...database];
    //             const indexQuestion = updatedDatabase.findIndex(question => question.id === questionId)
    //             const likeByUser = updatedDatabase[indexQuestion].like.includes(user);
    //             console.log('user มีข้อมูลใน like >>> ', likeByUser)

    //             // user ไม่มีข้อมูลใน like >>> จะใส่สี
    //             if (!likeByUser) {
    //                 const dislikeByUser = updatedDatabase[indexQuestion].dislike.includes(user);
    //                 if (dislikeByUser) {
    //                     // ถ้า user กด'dislike'ในข้อมูลเดิม แล้วกด'like' ข้อมูล'dislike'เดิมจะถูกนำออก
    //                     updatedDatabase[indexQuestion].dislike = updatedDatabase[indexQuestion].dislike.filter(userId => userId !== user);
    //                 }
    //                 // เพิ่ม user ลง 'like'
    //                 updatedDatabase[indexQuestion].like.push(user);
    //             }
    //             // user มีข้อมูลใน like >>> จะลบสี
    //             else {
    //                 updatedDatabase[indexQuestion].like = updatedDatabase[indexQuestion].like.filter(userId => userId !== user);
    //             }
    //             return [...updatedDatabase];;
    //         }
    //     )
    // }
    // const handleToggleDislike = (questionId) => {
    //     console.log("กด dislike")
    //     setDatabase(
    //         (database) => {
    //             const updatedDatabase = [...database];
    //             const indexQuestion = updatedDatabase.findIndex(question => question.id === questionId)
    //             const dislikeByUser = updatedDatabase[indexQuestion].dislike.includes(user);
    //             console.log('user มีข้อมูลใน dislike >>> ', dislikeByUser)

    //             // user ไม่มีข้อมูลใน dislike >>> จะใส่สี
    //             if (!dislikeByUser) {
    //                 const likeByUser = updatedDatabase[indexQuestion].like.includes(user);
    //                 if (likeByUser) {
    //                     // ถ้า user กด'like'ในข้อมูลเดิม แล้วกด'dislike' ข้อมูล'like'เดิมจะถูกนำออก
    //                     updatedDatabase[indexQuestion].like = updatedDatabase[indexQuestion].like.filter(userId => userId !== user);
    //                 }
    //                 // เพิ่ม user ลง 'dislike'
    //                 updatedDatabase[indexQuestion].dislike.push(user);
    //             }
    //             // user มีข้อมูลใน dislike >>> จะลบสี
    //             else {
    //                 updatedDatabase[indexQuestion].dislike = updatedDatabase[indexQuestion].dislike.filter(userId => userId !== user);
    //             }
    //             return updatedDatabase;
    //         }
    //     )
    // }

    // เปิด-ปิด Commentทั้งหมด/คำถาม
    const [openComment, setOpenComment] = useState([]);
    const toggleComment = (questionId) => {
        const indexQuestion = database.findIndex(question => question.id === questionId)
        setOpenComment((prevIndex) => {
            const newOpenComments = [...prevIndex];
            newOpenComments[indexQuestion] = !newOpenComments[indexQuestion];
            return newOpenComments
        });
    };

    // Modal edit open
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    // ดึงคำถามที่เลือกจะแก้ไข
    const [textQues, setTextQues] = useState('');
    const [cloneQuestion, setCloneQuestion] = useState('');
    const handleInputQuestionChange = (e) => {
        setTextQues(e.target.value);
    };

    const toggleModalEdit = async (question, questionId) => {
        console.log(question)
        // const currentDate = new Date();
        if (question == "save") {
            // GU DO HERE
            console.log("Save toggle Edit")
            await axios.put(baseURL + 'question', {
                subjectId: id,
                userId: user.uid,
                detail: textQues,
                questionId: questionId
            }).then((response) => {
                console.log(response);
                fetchQuestions()
            }, (error) => {
                console.log(error);
            });
            // ค้นหา index ของข้อมูลที่ต้องการอัพเดท
            // const dataIndex = database.findIndex((item) => item.id === cloneQuestion.id);
            // setDatabase((prevDatabase) => {
            //     const updatedDatabase = [...prevDatabase];
            //     updatedDatabase[dataIndex].detail = textQues;
            //     updatedDatabase[dataIndex].date = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
            //     updatedDatabase[dataIndex].time = currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            //     updatedDatabase[dataIndex].edit = true;
            //     return updatedDatabase;
            // })
            // setCloneQuestion('')
            // setTextQues('')
        }
        else {
            setCloneQuestion(question)
            setTextQues(question.detail)
        }
        setIsModalEditOpen(!isModalEditOpen);
    };

    // Modal delete open
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isIndexDelete, setIsIndexDelete] = useState(null)
    const toggleModalDelete = async (command) => {
        console.log(command)
        if (command === 'X' || command === 'cancel') {
            setIsModalDeleteOpen(false);
        } else if (command === 'openModal') {
            setIsModalDeleteOpen(true);
        } else if (command === 'delete') {
            await axios.delete(baseURL + 'question', {
                data: {
                    subjectId: id,
                    questionId: questionId
                }
            }).then((response) => {
                console.log(response);
                fetchQuestions()
            }, (error) => {
                console.log(error);
            });
            setIsModalDeleteOpen(false);
        }
    };

    return (
        <div className="mt-4">
            {questions.map((question, index) => (
                <div key={index} className="mt-4">
                    <div className="p-6 bg-white border border-gray-200 rounded-xl mt-4">
                        {/* profile */}
                        <div className="mt-2 flex flex-row">
                            <div className="w-[50px] h-[50px] flex-shrink-0 rounded-full bg-[#151C38]"></div>
                            {/* Can it be Edit/Delete ? */}
                            {question.userId === user.uid &&
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
                                        <MenuItem className="hover:bg-gray-200 cursor-pointer rounded-xl" onClick={() => { setQuestionId(question.id), toggleModalDelete('openModal') }}>
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
                                                    <button type="button" className="absolute top-5 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setIsModalEditOpen(false)}>
                                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
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
                                                        onClick={() => toggleModalEdit("save",question.id)}
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
                                                    <button type="button" className="absolute top-5 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => toggleModalDelete('X')}>
                                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
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
                                                            onClick={() => toggleModalDelete('cancel')}
                                                            type="button"
                                                            className="text-gray-500 bg-white hover:from-[#029BE0] hover:to-[#0D0B5F] font-medium rounded-lg text-lg px-10 py-2 text-center w-full border-2 border-[#D9D9D9]"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center pr-6 rounded-b mt-[-20px] mb-2 w-full">
                                                        <button
                                                            onClick={() => toggleModalDelete('delete')}
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
                                <p className="text-[#151C38] font-[400]">User@{question.userId}</p>
                                <p className="text-[#A4A4A4] font-[350]">
                                    {convertTimestampToTime(question.time)}
                                    {question.edit && <> (edit)</>}
                                </p>
                            </div>
                        </div>
                        {/* detail question */}
                        <div className="mt-5">
                            <div className="text-black font-normal">{question.detail}</div>
                            {/* emotion */}
                            <div className="mt-3 flex items-start">
                                {/* Did you like it ? */}
                                {question.like.includes(user.uid) ?
                                    (
                                        // กรณี มีชื่อ user ใน 'like'
                                        <button name="like" className="rotate-0" onClick={() => handleToggleLike(question.id)}>
                                            <Icon
                                                icon="streamline:like-1-solid"
                                                color="#D91818"
                                                width="22"
                                                height="22"
                                            />
                                        </button>
                                    ) : (
                                        // กรณี ไม่มีชื่อ user ใน 'like'
                                        <button name="like" className="rotate-0" onClick={() => handleToggleLike(question.id)}>
                                            <Icon
                                                icon="streamline:like-1"
                                                color="#151c38"
                                                width="22"
                                                height="22"
                                            />
                                        </button>
                                    )}
                                <div className="ml-1 mt-[1px]">
                                    <p className="text-[#151C38] text-sm mr-3">{question.like.length}</p>
                                </div>

                                {/* Did you dislike it ? */}
                                {question.dislike.includes(user.uid) ?
                                    (
                                        // กรณี มีชื่อ user ใน 'dislike'
                                        <button name="dislike" className="rotate-180 mt-1" onClick={() => handleToggleDislike(question.id)}>
                                            <Icon
                                                icon="streamline:like-1-solid"
                                                color="#151c38"
                                                width="22"
                                                height="22"
                                            />
                                        </button>
                                    ) : (
                                        // กรณี ไม่มีชื่อ user ใน 'dislike'
                                        <button name="dislike" className="rotate-180 mt-1" onClick={() => handleToggleDislike(question.id)}>
                                            <Icon
                                                icon="streamline:like-1"
                                                color="#151c38"
                                                width="22"
                                                height="22"
                                            />
                                        </button>
                                    )}

                                <div className="ml-1 mt-[1px]">
                                    <p className="text-[#151C38] text-sm mr-3">{question.dislike.length}</p>
                                </div>
                                <button className="mt-[2.5px]" onClick={() => toggleComment(question.id)}>
                                    <Icon icon={openComment[index] ? "iconamoon:comment-fill" : "iconamoon:comment"} color="#151c38" width="19" height="19" />
                                </button>
                                <div className="ml-1 mt-[1px]">
                                    <p className="text-[#151C38] text-sm">{question.answer.length}</p>
                                </div>
                            </div>
                            {/* openCardComment */}
                            <div className="">
                                {openComment[index] && <CommentCard data={question} indexQuestion={index} questionId={question.id} toggleCommentQuestion={toggleComment} user={user} database={database} setDatabase={setDatabase} />}
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    )
}

export default QuestionCard;