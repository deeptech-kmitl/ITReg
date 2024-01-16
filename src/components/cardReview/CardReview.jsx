import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";

function CardReview() {
    const user = "Anonymous1";
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
            like: ["Anonymous2", "Anonymous6"],
            dislike: ["Anonymous5",],
        }
    ])
    // const toggleEditOrDelete = (index) => {
    //     setOpenEditOrDelete((prevIndex) => (prevIndex === index ? null : index));
    // }
    // const handleToggleLike = (index) => {
    //     setData(
    //         (dumyDatabase) => {
    //             const updatedDatabase = [...dumyDatabase];
    //             const likeByUser = updatedDatabase[index].like.includes(user);

    //             if (likeByUser) {
    //                 // ถ้า user กด'like'ในข้อมูลเดิม ให้ลบออก
    //                 updatedDatabase[index].like = updatedDatabase[index].like.filter(user_id => user_id !== user);
    //             } else {
    //                 const dislikeByUser = updatedDatabase[index].dislike.includes(user);
    //                 if (dislikeByUser) {
    //                     // ถ้า user กด'dislike'ในข้อมูลเดิม แล้วกด'like' ข้อมูล'dislike'เดิมจะถูกนำออก
    //                     updatedDatabase[index].dislike = updatedDatabase[index].dislike.filter(user_id => user_id !== user);
    //                 }
    //                 // ถ้า user ไม่ได้กด'like'ในข้อมูลเดิม ให้เพิ่มเข้า
    //                 updatedDatabase[index].like.push(user);
    //             }
    //             return updatedDatabase;
    //         }
    //     )
    // }

    // const handleToggleDislike = (index) => {
    //     setData(
    //         (dumyDatabase) => {
    //             const updatedDatabase = [...dumyDatabase];
    //             const dislikeByUser = updatedDatabase[index].dislike.includes(user);

    //             if (dislikeByUser) {
    //                 // ถ้า user กด'dislike'ในข้อมูลเดิม ให้ลบออก
    //                 updatedDatabase[index].dislike = updatedDatabase[index].dislike.filter(user_id => user_id !== user);
    //             } else {
    //                 const likeByUser = updatedDatabase[index].like.includes(user);
    //                 if (likeByUser) {
    //                     // ถ้า user กด'like'ในข้อมูลเดิม แล้วกด'dislike' ข้อมูล'like'เดิมจะถูกนำออก
    //                     updatedDatabase[index].like = updatedDatabase[index].like.filter(user_id => user_id !== user);
    //                 }
    //                 // ถ้า user ไม่ได้กด'dislike'ในข้อมูลเดิม ให้เพิ่มเข้า
    //                 updatedDatabase[index].dislike.push(user);
    //             }
    //             return updatedDatabase;
    //         }
    //     )
    // }

    // Modal edit open
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);

    const toggleModalEdit = () => {
        setIsModalEditOpen(!isModalEditOpen);
    };

    // Modal delete open

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const toggleModalDelete = () => {
        setIsModalDeleteOpen(!isModalEditOpen);
    };

    return (
        <div className="mt-4">
            {data.map((review, index) => (
                <div className="max-w p-6 bg-white border border-gray-200 rounded-xl mt-4">
                    <div className="mt-2 flex flex-row">
                        <div className="w-[50px] h-[50px] flex-shrink-0 rounded-full bg-[#151C38]"></div>
                        <Menu placement="bottom-end">
                            <MenuHandler>
                                <div className="absolute right-20 cursor-pointer">
                                    <Icon icon="prime:ellipsis-h" color="#151c38" width="19" height="19" />
                                </div>
                            </MenuHandler>
                            <MenuList className="bg-[#ffffff] border border-gray-200 shadow-md rounded-xl text-sm">
                                <MenuItem className="hover:bg-gray-200 cursor-pointer rounded-xl" onClick={toggleModalEdit} >
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

                        {/* Modal edit Review */}
                        {isModalEditOpen && (
                            <div
                                id="modal-edit"
                                tabIndex="-1"
                                aria-hidden="true"
                                className="fixed inset-0 overflow-y-auto"
                                style={{ zIndex: 1001, borderRadius: "30px" }}
                            // onClick={() => setIsModalOpen(false)}
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
                                                    Edit Review
                                                </h5>
                                                {/* close */}
                                                <button type="button" class="absolute top-5 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal" onClick={() => setIsModalEditOpen(false)}>
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
                                                // value="eiei"
                                                />
                                            </div>
                                            <div className="flex flex-row">
                                                <div className="w-full px-3 mb-6">
                                                    <label className="text-[16px] max-2xl:text-[16px] font-medium mb-2 text-gray-500" htmlFor="year">
                                                        Rating
                                                    </label>
                                                    <select
                                                        className='bg-[#F4F4F4] border border-gray-200 rounded-[10px] text-gray-500 mt-2 text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500'
                                                        name="selectedPoint">
                                                        <option value="point1">1 point</option>
                                                        <option value="point2">2 point</option>
                                                        <option value="point3">3 point</option>
                                                        <option value="point4">4 point</option>
                                                        <option value="point5">5 point</option>

                                                    </select>
                                                </div>
                                                <div className="w-full px-3 mb-6">
                                                    <label className="text-[16px] max-2xl:text-[16px] font-medium mb-2 text-gray-500" htmlFor="year">
                                                        Grade
                                                    </label>
                                                    <select
                                                        className='bg-[#F4F4F4] border border-gray-200 text-gray-500 rounded-[10px] mt-2 text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500'
                                                        name="selectedGrade">
                                                        <option value="GradeA">A</option>
                                                        <option value="GradeB+">B+</option>
                                                        <option value="GradeB">B</option>
                                                        <option value="GradeC+">C+</option>
                                                        <option value="GradeC">C</option>
                                                        <option value="GradeD+">D+</option>
                                                        <option value="GradeD">D</option>
                                                    </select>
                                                </div>
                                            </div>
                                            {/* footer */}
                                            <div className="flex items-center p-4 md:p-5 rounded-b mt-[-20px] mb-2">
                                                <button
                                                    onClick={() => setIsModalEditOpen(false)}
                                                    type="button"
                                                    className="text-white bg-gradient-to-br from-[#0D0B5F] to-[#029BE0] hover:from-[#029BE0] hover:to-[#0D0B5F] font-medium rounded-lg text-lg px-10 py-2 text-center w-full"
                                                >
                                                    Post
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isModalDeleteOpen && (
                            <div
                                id="modal-delete"
                                tabIndex="-1"
                                aria-hidden="true"
                                className="fixed inset-0 overflow-y-auto"
                                style={{ zIndex: 1001, borderRadius: "30px" }}
                            // onClick={() => setIsModalOpen(false)}
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
                                                <button type="button" class="absolute top-5 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal" onClick={() => setIsModalDeleteOpen(false)}>
                                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                    </svg>
                                                </button>
                                            </div>
                                            {/* body */}
                                            <div className="flex flex-col p-4 md:p-5 justify-center items-center text-2xl font-normal">
                                                <p>Are you sure you want to</p>
                                                <p>delete your review?</p>
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
                            <p className="text-[#151C38] text-l font-[400]">{review.name}</p>
                            <p className="text-[#A4A4A4] text-l font-[350]">
                                {review.date}, {review.time}
                            </p>
                        </div>
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