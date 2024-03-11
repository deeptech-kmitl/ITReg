import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import axios from "axios";
import { UserAuth } from "../../context/AuthContext";
import { baseURL } from "../../../baseURL";


function CommentBox({ data, database, setDatabase, indexPost, postId, sortByTime }) {
  const { user } = UserAuth();
  const { role } = UserAuth();

  
  // Modal edit open
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  // ดึงคำถามที่เลือกจะแก้ไข
  const [textAnswer, setTextAnswer] = useState('');
  const [cloneAnswer, setCloneAnswer] = useState('');
  const handleInputAnswerChange = (e) => {
    setTextAnswer(e.target.value);
  };
  const {instance} = UserAuth()
  const toggleModalEdit = async (comment) => {
    const currentDate = new Date();
    if (comment == "save") {
      console.log(cloneAnswer.commentId)
      // ค้นหา index ของข้อมูลที่ต้องการอัพเดท
      const dataIndex = database[indexPost].comments.findIndex((item) => item.commentId === cloneAnswer.commentId);
      const response = await instance.put(`/editPostComment/${postId}/${cloneAnswer.commentId}`, { detail: textAnswer, userId: user.uid })
      setDatabase((prevDatabase) => {
        const updatedDatabase = [...prevDatabase];
        updatedDatabase[indexPost].comments[dataIndex].detail = response.data.detail;
        updatedDatabase[indexPost].comments[dataIndex].dateTime = response.data.dateTime;
        // updatedDatabase[indexPost].comment[dataIndex].edit = true;
        return updatedDatabase;
      })
      setCloneAnswer('')
      setTextAnswer('')
    }
    else {
      setCloneAnswer(comment)
      setTextAnswer(comment.detail)
    }
    setIsModalEditOpen(!isModalEditOpen);
  };

  // Modal delete open
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isIndexDelete, setIsIndexDelete] = useState(null)
  const toggleModalDelete = async (command, commentId) => {
    if (command === 'X' || command === 'cancle') {
      setIsModalDeleteOpen(false);
      setIsIndexDelete(null);
    } else if (command === 'openModal') {
      setIsModalDeleteOpen(true);
      setIsIndexDelete(commentId)
    } else if (command === 'delete') {
      const response = await instance.delete(`/delCommentPost/${postId}/${isIndexDelete}`);
      console.log(response.data)
      const newDatabase = database.map(detail => {
        console.log(detail.id === postId)
        if (detail.id === postId) {
          return {
            ...detail,
            comments: detail.comments.filter(comment => comment.commentId !== isIndexDelete),
          }
        }
        return detail;
      })
      setDatabase(newDatabase)
      setIsModalDeleteOpen(false);
    }
    setIsModalDeleteOpen(!isModalDeleteOpen);
  };
  // เพิ่มข้อมูลลงฐานข้อมูล
  const [comment, setComment] = useState('');
  const [isError, setIsError] = useState(false);
  const postComment = async () => {
    try {
      if (!comment.trim()) {
        setIsError(true); // ตั้งค่าให้มีข้อผิดพลาดเป็น true เมื่อไม่มีข้อความที่ถูกป้อน
        return; // ไม่ส่งข้อมูลถ้า comment เป็นค่าว่าง
      }
  
      // เมื่อ comment ไม่ใช่ค่าว่าง ก็ทำการส่งข้อมูลต่อไป
      const newcomment = {
        postId: data.id,
        userId: user.uid,
        detail: comment,
      };
  
      const response = await instance.post(`/newcommentPost`, newcomment);
      const newDatabase = database.map(detail => {
        if (detail.id === postId) {
          return {
            ...detail,
            comments: [...detail.comments, response.data],
          };
        }
        return detail;
      });
      setDatabase(newDatabase);
      setComment('');
      setIsError(false); // รีเซ็ตข้อผิดพลาดเป็น false เมื่อส่งข้อมูลเสร็จสิ้น
    } catch (error) {
      console.log(error.message);
    }
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
  return (
    <div>
      <div className="mt-5 relative">
        {data.comments.sort(sortByTime).map((comment, index) => (
          <div key={index} className="flex items-start mb-4">
            <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[#151C38] flex items-center justify-center text-white font-bold"></div>
            <div className="ml-3 p-2 bg-[#E3F3FF] relative" style={{ width: '100%', maxWidth: 'calc(100% - 40px)', borderRadius: '10px' }}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <p className="text-[#151C38] text-sm font-[400]">{role == "Admin" ? `admin@${comment?.userId}` : "Anonymous"}</p>
                  <p className="text-[#A4A4A4] text-[10px] font-[350] ml-2 mt-[2px]">{convertTimestampToTime(comment?.dateTime)}</p>
                </div>
                <div className="relative">
                  {role=="admin" || comment.userId == user.uid ? (
                    <Menu placement="bottom-end">
                      <MenuHandler>
                        <div className="flex items-center cursor-pointer">
                          <Icon icon="prime:ellipsis-h" color="#151c38" width="15" height="15" />
                        </div>
                      </MenuHandler>
                      <MenuList className="bg-[#ffffff] border border-gray-200 shadow-md rounded-xl text-sm">
                        <MenuItem className="hover:bg-gray-200 cursor-pointer rounded-xl" onClick={() => toggleModalEdit(comment)}>
                          <div className="flex item-center py-3">
                            <Icon
                              icon="fluent:edit-24-regular"
                              color="#727272"
                              width="15"
                              height="15"
                            />
                            <span className="pl-3 text-gray-700">Edit Comment</span>
                          </div>
                        </MenuItem>
                        <MenuItem className="hover:bg-gray-200 cursor-pointer rounded-xl" onClick={() => toggleModalDelete('openModal', comment.commentId)}>
                          <div className="hover:bg-gray-200 cursor-pointer">
                            <div className="flex item-center py-3">
                              <Icon
                                icon="mingcute:delete-3-line"
                                color="#727272"
                                width="15"
                                height="15"
                              />
                              <p className="pl-3 text-gray-700">Delete Comment</p>
                            </div>
                          </div>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  ):<></>}
                </div>
              </div>

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
                            Edit Comment
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
                            value={textAnswer}
                            onChange={handleInputAnswerChange}
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
                            Delete Comment
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
                          <p>delete your comment?</p>
                        </div>
                        {/* footer */}
                        <div className="flex flex-row gap-4 mb-2 mt-6">
                          <div className="flex items-center pl-6 rounded-b mt-[-20px] mb-2 w-full">
                            <button
                              onClick={() => toggleModalDelete('cancle')}
                              type="button"
                              className="text-gray-500 bg-white hover:from-[#029BE0] hover:to-[#0D0B5F] font-medium rounded-lg text-lg px-10 py-2 text-center w-full border-2 border-[#D9D9D9]"
                            >
                              Cancle
                            </button>
                          </div>
                          <div className="flex items-center pr-6 rounded-b mt-[-20px] mb-2 w-full">
                            <button
                              onClick={() => toggleModalDelete('delete', isIndexDelete)}
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
              <p className="text-black text-sm font-light">{comment.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div name="post" className="relative mx-2">
      <input
  className={`w-full h-[40px] rounded-[10px] border-0 py-5 pl-7 pr-20 text-[16px] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 focus:ring-inset focus:ring-[#0D0B5F] text-sm font-light ${isError ? 'ring-red-500' : ''}`}
  placeholder="Your Message ..."
  value={comment}
  onChange={(e) => setComment(e.target.value)}
></input>

        <button className="py-[6px] px-[12px] flex-shrink-0 bg-gradient-to-br from-[#0D0B5F] to-[#029BE0] hover:from-[#029BE0] hover:to-[#0D0B5F] rounded-[10px] absolute top-1/2 right-[-6px] transform -translate-x-1/2 -translate-y-1/2 text-[16px]">
          <Icon icon="wpf:sent" color="#fff" className="py-0.1" onClick={postComment} />
        </button>
      </div>
    </div>
  );
};

export default CommentBox;
