import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import axios from "axios";
import { baseURL } from '../../../baseURL';
import { UserAuth } from "../../context/AuthContext";
import {
    Grade1,
    Grade2,
    Grade3,
    Grade4,
    Grade5,
    Grade6,
    Grade7
} from '../../assets/picGrade/index';
function CardReview({ id, reviews, setReviews }) {
    const [reviewId, setReviewId] = useState('')
    const { user, role } = UserAuth()
    const { instance } = UserAuth()
    // แสดงผลดาวตรง rating
    function DisplayRating(rate) {
        const arrayRate = [];
        for (let i = 0; i < rate.rate; i++) {
            arrayRate.push(
                <img
                    className="w-[24px] h-[24px]"
                    src="https://img.icons8.com/fluency/48/star--v1.png"
                />
            );
        }
        return <div className="flex flex-row ml-2">{arrayRate}</div>
    }
    const convertTimestampToTime = (timestamp) => {
        // Convert timestamp to milliseconds
        const milliseconds = timestamp._seconds * 1000 + Math.round(timestamp._nanoseconds / 1000000);

        // Create a new Date object
        const date = new Date(milliseconds);

        // Format the date and time
        const formattedTime = date.toLocaleString(); // You can customize the format here

        return formattedTime;
    };

    const [textReview, setTextReview] = useState('');
    const [rating, setRating] = useState('');
    const [grade, setGrade] = useState('');


    // Modal edit open
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);

    const toggleModalEdit = (review) => {
        // นำค่ามาแสดงผลตอน edit
        setTextReview(review.content)
        setRating(review.rating.toString())
        setGrade(review.grade)
        setIsModalEditOpen(!isModalEditOpen);
    };

    // Modal delete open

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const toggleModalDelete = () => {
        setIsModalDeleteOpen(!isModalDeleteOpen);
    };

    const delReview = async () => {
        await instance.delete('/delReview', {
            data: {
                subjectId: id,
                reviewId: reviewId
            }
        }).then((response) => {
            setReviews(reviews.filter((item) => item.id != reviewId))
        }, (error) => {
            console.log(error);
        });

    };

    const editReview = async () => {
        await instance.put('/editReview', {
            subjectId: id,
            userId: user.uid,
            content: textReview,
            rating: rating,
            grade: grade,
            reviewId: reviewId,
            edit: true
        }).then((response) => {
            const indexRe = reviews.findIndex((item) => item.id == reviewId)
            setReviews(() => {
                const updatedDatabase = [...reviews];
                updatedDatabase[indexRe].content = textReview;
                updatedDatabase[indexRe].rating = rating;
                updatedDatabase[indexRe].grade = grade
                updatedDatabase[indexRe].time = response.data.time
                updatedDatabase[indexRe].edit = true
                return updatedDatabase;
            })

        }, (error) => {
            console.log(error);
        });
    }

    const newLike = async (reviewId) => {
        const indexRe = reviews.findIndex((item) => item.id == reviewId)
        const likeByUser = reviews[indexRe].like.includes(user.uid);
        await instance.put('/editReviewLikes', {
            subjectId: id,
            userId: user.uid,
            likeType: likeByUser,
            reviewId: reviewId
        }).then((response) => {

            setReviews(
                () => {
                    const updatedDatabase = [...reviews];

                    // user ไม่มีข้อมูลใน like >>> จะใส่สี
                    if (!likeByUser) {
                        const dislikeByUser = updatedDatabase[indexRe].dislike.includes(user.uid);
                        if (dislikeByUser) {
                            // ถ้า user กด'dislike'ในข้อมูลเดิม แล้วกด'like' ข้อมูล'dislike'เดิมจะถูกนำออก
                            updatedDatabase[indexRe].dislike = updatedDatabase[indexRe].dislike.filter(userId => userId !== user.uid);
                        }
                        // เพิ่ม user ลง 'like'
                        updatedDatabase[indexRe].like.push(user.uid);
                    }
                    // user มีข้อมูลใน like >>> จะลบสี
                    else {
                        updatedDatabase[indexRe].like = updatedDatabase[indexRe].like.filter(userId => userId !== user.uid);
                    }
                    return [...updatedDatabase];
                }
            )
        });
    }
    const dislike = async (reviewId) => {
        const indexRe = reviews.findIndex((item) => item.id == reviewId)
        const dislikeByUser = reviews[indexRe].dislike.includes(user.uid);
        await instance.put('/delReviewLikes', {
            subjectId: id,
            userId: user.uid,
            likeType: dislikeByUser,
            reviewId: reviewId
        }).then((response) => {
            setReviews(
                () => {
                    const updatedDatabase = [...reviews];
                    // user ไม่มีข้อมูลใน dislike >>> จะใส่สี
                    if (!dislikeByUser) {
                        const likeByUser = updatedDatabase[indexRe].like.includes(user.uid);
                        if (likeByUser) {
                            // ถ้า user กด'like'ในข้อมูลเดิม แล้วกด'dislike' ข้อมูล'like'เดิมจะถูกนำออก
                            updatedDatabase[indexRe].like = updatedDatabase[indexRe].like.filter(userId => userId !== user.uid);
                        }
                        // เพิ่ม user ลง 'dislike'
                        updatedDatabase[indexRe].dislike.push(user.uid);
                    }
                    // user มีข้อมูลใน dislike >>> จะลบสี
                    else {
                        updatedDatabase[indexRe].dislike = updatedDatabase[indexRe].dislike.filter(userId => userId !== user.uid);
                    }
                    return updatedDatabase;
                }
            )
        });
    }

    return (
        <div className="mt-4">
            {reviews.map((review, index) => (
                review.subjectId === id && (
                    <div className="max-w p-6 bg-white border border-gray-200 rounded-xl mt-4" key={index}>
                        <div className="mt-2 flex flex-row">
                            <div className="w-[50px] h-[50px] flex-shrink-0 rounded-full bg-[#151C38]"></div>
                            {(user.uid == review.userId || role == "admin") && <Menu placement="bottom-end">
                                <MenuHandler>
                                    <div className="absolute right-20 cursor-pointer">
                                        <Icon icon="prime:ellipsis-h" color="#151c38" width="19" height="19" />
                                    </div>
                                </MenuHandler>
                                <MenuList className="bg-[#ffffff] border border-gray-200 shadow-md rounded-xl text-sm">
                                    <MenuItem className="hover:bg-gray-200 cursor-pointer rounded-xl" onClick={() => { toggleModalEdit(review), setReviewId(review.id) }} >
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
                                    <MenuItem className="hover:bg-gray-200 cursor-pointer rounded-xl" onClick={() => (toggleModalDelete(), setReviewId(review.id))}>
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
                            </Menu>}

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
                                                        value={textReview}
                                                        onChange={(e) => setTextReview(e.target.value)}
                                                    />
                                                </div>
                                                <div className="flex flex-row">
                                                    <div className="w-full px-3 mb-6">
                                                        <label className="text-[16px] max-2xl:text-[16px] font-medium mb-2 text-gray-500" htmlFor="year">
                                                            Rating
                                                        </label>
                                                        <select
                                                            className='bg-[#F4F4F4] border border-gray-200 rounded-[10px] text-gray-500 mt-2 text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500'
                                                            name="selectedPoint" defaultValue={rating} onChange={(e) => setRating(e.target.value)}>
                                                            <option value="1">1 point</option>
                                                            <option value="2">2 point</option>
                                                            <option value="3">3 point</option>
                                                            <option value="4">4 point</option>
                                                            <option value="5">5 point</option>

                                                        </select>
                                                    </div>
                                                    <div className="w-full px-3 mb-6">
                                                        <label className="text-[16px] max-2xl:text-[16px] font-medium mb-2 text-gray-500" htmlFor="year">
                                                            Grade
                                                        </label>
                                                        <select
                                                            className='bg-[#F4F4F4] border border-gray-200 text-gray-500 rounded-[10px] mt-2 text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500'
                                                            name="selectedGrade" defaultValue={grade} onChange={(e) => setGrade(e.target.value)}>
                                                            <option value="A">A</option>
                                                            <option value="B+">B+</option>
                                                            <option value="B">B</option>
                                                            <option value="C+">C+</option>
                                                            <option value="C">C</option>
                                                            <option value="D+">D+</option>
                                                            <option value="D">D</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                {/* footer */}
                                                <div className="flex items-center p-4 md:p-5 rounded-b mt-[-20px] mb-2">
                                                    <button
                                                        onClick={() => { setIsModalEditOpen(false), editReview() }}
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

                            {/* modal delete */}
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
                                                    <button type="button" class="absolute top-5 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setIsModalDeleteOpen(false)}>
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
                                                            Cancel
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center pr-6 rounded-b mt-[-20px] mb-2 w-full">
                                                        <button
                                                            onClick={() => (setIsModalDeleteOpen(false), delReview())}
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
                                <p className="text-[#151C38] text-l font-[400]">Anonymous</p>
                                <p className="text-[#A4A4A4] text-l font-[350]">
                                    {convertTimestampToTime(review.time)}
                                    {review.edit && <> (edit)</>}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row mt-2">
                            <p className="font-medium text-[#A4A4A4]">Rating</p>
                            <DisplayRating rate={review.rating} />
                            <p className="font-medium text-[#A4A4A4] ml-2">Grade</p>
                            {review.grade === "A" ? (
                                <img className="ml-2 w-[24px] h-[24px]" src={Grade1}></img>
                            ) : review.grade === "B+" ? (
                                <img className="ml-2 w-[24px] h-[24px]" src={Grade2}></img>
                            ) : review.grade === "B" ? (
                                <img className="ml-2 w-[24px] h-[24px]" src={Grade3}></img>
                            ) : review.grade === "C+" ? (
                                <img className="ml-2 w-[24px] h-[24px]" src={Grade4}></img>
                            ) : review.grade === "C" ? (
                                <img className="ml-2 w-[24px] h-[24px]" src={Grade5}></img>
                            ) : review.grade === "D+" ? (
                                <img className="ml-2 w-[24px] h-[24px]" src={Grade6}></img>
                            ) : (
                                <img className="ml-2 w-[24px] h-[24px]" src={Grade7}></img>
                            )}

                        </div>
                        <div className="mt-2">
                            <p className="text-[#151C38] font-normal">{review.content}</p>
                        </div>
                        <div className="flex flex-row mt-2">
                            {review.like.includes(user.uid) ?
                                (
                                    // กรณี มีชื่อ user ใน 'like'
                                    // <button name="like" className="rotate-0" onClick={() => { setReviewId(review.id), clearLike('like') }}>
                                    <button name="like" className="rotate-0" onClick={() => { newLike(review.id) }}>
                                        <Icon
                                            icon="streamline:like-1-solid"
                                            color="#D91818"
                                            width="22"
                                            height="22"
                                        />
                                    </button>
                                ) : (
                                    // กรณี ไม่มีชื่อ user ใน 'like'
                                    // <button name="like" className="rotate-0" onClick={() => { setReviewId(review.id), newLike('like') }}>
                                    <button name="like" className="rotate-0" onClick={() => { newLike(review.id) }}>
                                        <Icon
                                            icon="streamline:like-1"
                                            color="#151c38"
                                            width="22"
                                            height="22"
                                        />
                                    </button>
                                )}
                            <div className="ml-1 mt-[1px]">
                                <p className="text-[#151C38] text-sm mr-3">{review.like.length}</p>
                            </div>

                            {/* Did you dislike it ? */}
                            {review.dislike.includes(user.uid) ?
                                (
                                    // กรณี มีชื่อ user ใน 'dislike'
                                    // <button name="dislike" className="rotate-180 mt-1" onClick={() => { setReviewId(review.id), clearLike('dislike') }}>
                                    <button name="dislike" className="rotate-180 mt-1" onClick={() => { dislike(review.id) }}>
                                        <Icon
                                            icon="streamline:like-1-solid"
                                            color="#151c38"
                                            width="22"
                                            height="22"
                                        />
                                    </button>
                                ) : (
                                    // กรณี ไม่มีชื่อ user ใน 'dislike'
                                    <button name="dislike" className="rotate-180 mt-1" onClick={() => { dislike(review.id) }}>
                                        {/* <button name="dislike" className="rotate-180 mt-1" onClick={() => { setReviewId(review.id), newLike('dislike') }}> */}
                                        <Icon
                                            icon="streamline:like-1"
                                            color="#151c38"
                                            width="22"
                                            height="22"
                                        />
                                    </button>
                                )}
                            <div className="ml-1 mt-[1px]">
                                <p className="text-[#151C38] text-sm mr-3">{review.dislike.length}</p>
                            </div>
                        </div>
                    </div>
                )
            ))}
        </div>
    );
}

export default CardReview;