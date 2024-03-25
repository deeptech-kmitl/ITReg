import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./PostDetailCard.css";
import CommentBox from "./CommentBox";
import { parse, compareDesc } from "date-fns";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { UserAuth } from "../../context/AuthContext";
import Carousel from "./Carousel"
import axios from "axios";
import { baseURL } from "../../../baseURL";

function PostDetailCard({ database, setDatabase, role }) {
  const { user } = UserAuth();
  const [likedPosts, setLikedPosts] = useState([]);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [imgForFullScreen, setImgForFullScreen] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showComments, setShowComments] = useState([]);
  // const [database, setDatabase] = useState(PostDetail);
  const {instance} = UserAuth()
  const handleToggleLike = async (postId) => {
    console.log("กด like", postId);

    try {
      const updatedDatabase = [...database];
      const indexQuestion = updatedDatabase.findIndex(post => post.id === postId);
      const likeByUser = updatedDatabase[indexQuestion].like.includes(user.uid);
      console.log('user มีข้อมูลใน like >>> ', likeByUser);

      if (!likeByUser) {
        // Add user to 'like'
        await instance.patch(`/newPostLikes`, { postId: postId, userId: user.uid });
        updatedDatabase[indexQuestion].like.push(user.uid);
        console.log("like");
      } else {
        // Remove user from 'like'
        await instance.patch("/delPostLikes", { postId: postId, userId: user.uid });
        updatedDatabase[indexQuestion].like = updatedDatabase[indexQuestion].like.filter(user_id => user_id !== user.uid);
        console.log("unlike");
      }

      setDatabase([...updatedDatabase]);
    } catch (error) {
      console.error(error.message);
    }
  };


  // const handleImageClick = (item, index) => {
  //   setImgForFullScreen(item);
  //   setCurrentImageIndex(index);
  //   setShowFullScreen(true);
  // };

  // const handleCloseFullScreen = () => {
  //   setShowFullScreen(false);
  // };

  const handleToggleComments = (index) => {
    console.log("eeeee")
    setShowComments((prev) => {
      const newShowComments = [...prev];
      newShowComments[index] = !newShowComments[index];
      return newShowComments;
    });
  };

  // Modal edit open
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  // ดึงคำถามที่เลือกจะแก้ไข
  const [textPost, setTextPost] = useState('');
  const [clonePost, setClonePost] = useState('');
  const [newtitle, setNewtitle] = useState('');
  const handleInputPostChange = (e) => {
    setTextPost(e.target.value);
  };

  const toggleModalEdit = async (detail) => {
    const currentDate = new Date();
    try {
      if (detail == "save") {
        console.log("Save toggle Edit")
        // ค้นหา index ของข้อมูลที่ต้องการอัพเดท
        const dataIndex = database.findIndex((item) => item.id === clonePost.id);
        const response = await instance.put(`/editPost/${database[dataIndex].id}`, { Title: newtitle, message: textPost });
        setDatabase((prevDatabase) => {
          const updatedDatabase = [...prevDatabase];
          updatedDatabase[dataIndex].message = response.data.message;
          updatedDatabase[dataIndex].titlename = response.data.titlename;
          updatedDatabase[dataIndex].dateTime = response.data.dateTime;
          // updatedDatabase[dataIndex].edit = true;
          console.log(updatedDatabase);
          return updatedDatabase;
        });
        setClonePost('')
        setTextPost('')
      }
      else {
        setClonePost(detail)
        setTextPost(detail.message)
        setNewtitle(detail.titlename)
      }
      setIsModalEditOpen(!isModalEditOpen);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Modal delete open
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isIndexDelete, setIsIndexDelete] = useState(null)
  const toggleModalDelete = async (command, index) => {
    try {
      // console.log(command, index)
      if (command === 'X' || command === 'cancle') {
        setIsIndexDelete(null)
        setIsModalDeleteOpen(false);
      } else if (command === 'openModal') {
        setIsIndexDelete(index)
        setIsModalDeleteOpen(true);
      } else if (command === 'delete') {
        const response = await instance.delete(`/deletePost/${isIndexDelete}`);
        const newDatabase = database.filter(detail => detail.id !== isIndexDelete);
        setDatabase(newDatabase)
        setIsIndexDelete(null)
        setIsModalDeleteOpen(false);
      }
    } catch (error) {
      console.log(error.message)
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
  const sortByTime = (a, b) => {
    const timeA = a.dateTime._seconds + a.dateTime._nanoseconds / 1e9;
    const timeB = b.dateTime._seconds + b.dateTime._nanoseconds / 1e9;
    return timeA - timeB; // Sorting in descending order (latest first)
  };

  return (
    <div className="mt-5">
      {database.map((detail, index) => (
        <div key={index} className="mt-4">
          <div className="flex-shrink-0 border-[1px] border-solid border-gray-300 rounded-[30px] p-6 bg-white">
            <div className="text-[#151C38] text-2xl font-[500] leading-normal flex justify-between">
              <span>{detail.titlename}</span>
              <div className="relative">
                {role == "admin" && (
                  <Menu placement="bottom-end">
                    <MenuHandler>
                      <div className="flex items-center cursor-pointer">
                        <Icon icon="prime:ellipsis-h" color="#151c38" width="22" height="22" />
                      </div>
                    </MenuHandler>
                    <MenuList className="bg-[#ffffff] border border-gray-200 shadow-md rounded-xl text-sm">
                      <MenuItem className="hover:bg-gray-200 cursor-pointer rounded-xl" onClick={() => toggleModalEdit(detail)}>
                        <div className="flex item-center py-3">
                          <Icon
                            icon="fluent:edit-24-regular"
                            color="#727272"
                            width="15"
                            height="15"
                          />
                          <span className="pl-3 text-gray-700">Edit Post</span>
                        </div>
                      </MenuItem>
                      <MenuItem className="hover:bg-gray-200 cursor-pointer rounded-xl" onClick={() => toggleModalDelete('openModal', detail.id)} >
                        <div className="flex item-center py-3">
                          <Icon
                            icon="mingcute:delete-3-line"
                            color="#727272"
                            width="15"
                            height="15"
                          />
                          <span className="pl-3 text-gray-700">Delete Post</span>
                        </div>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                )}
              </div>
            </div>

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
                          Edit Post
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
                        <input
                          type="text"
                          placeholder="New Title"
                          className="border-none outline-none p-2  w-full focus:ring-0 text-xl font-semibold"
                          value={newtitle}
                          onChange={(e) => setNewtitle(e.target.value)}
                        />
                        <textarea
                          rows="4"
                          cols="50"
                          placeholder="Text to something ..."
                          className="border-none outline-none p-2 mb-4 w-full resize-none focus:ring-0 text-base font-normal"
                          value={textPost}
                          onChange={handleInputPostChange}
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
                          Delete Post
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
                        <p>delete your Post?</p>
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

            <div className="mt-5 flex items-start">
              <div className="w-[50px] h-[50px] flex-shrink-0 rounded-full bg-[#151C38]"></div>
              <div className="ml-4">
                <p className="text-[#151C38] text-l font-[400]">
                  {detail.name}
                </p>
                <p className="text-[#A4A4A4] text-l font-[350]">
                  {convertTimestampToTime(detail.dateTime)} น.
                </p>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-black text-l font-light">{detail.message}</p>

              <Carousel slides={detail.image} />

              {/* {showFullScreen && (
                <div
                  className="fullscreen-overlay active"
                  onClick={handleCloseFullScreen}
                >
                </div>
              )} */}
            </div>

            <div className="mt-3 flex items-start">
              {/* Did you like it ? */}
              {detail.like.filter(user_id => user_id === user.uid).length === 1 ?
                (
                  // กรณี มีชื่อ user ใน 'like'
                  <button name="like" className="rotate-0" onClick={() => handleToggleLike(detail.id)}>
                    <Icon
                      icon="bxs:heart"
                      color="#D91818"
                      width="22"
                      height="22"
                    />
                  </button>
                ) : (
                  // กรณี ไม่มีชื่อ user ใน 'like'
                  <button name="like" className="rotate-0" onClick={() => handleToggleLike(detail.id)}>
                    <Icon
                      icon="bx:heart"
                      color="#151c38"
                      width="22"
                      height="22"
                    />
                  </button>
                )}
              <div className="ml-1 mt-[1px]">
                <p className="text-[#151C38] text-sm mr-3">{detail.like.length}</p>
              </div>
              <div className="mt-[1px]">
                <Icon
                  icon={showComments[index] ? "iconamoon:comment-fill" : "iconamoon:comment"}
                  color="#151c38"
                  width="20"
                  height="20"
                  onClick={() => handleToggleComments(index)}
                />
              </div>
              <div className="ml-1 mt-[1px]">
                <p className="text-[#151C38] text-sm">{detail.comments?.length}</p>
              </div>
            </div>
            {showComments[index] && (
              <div>
                <CommentBox data={detail} indexPost={index} database={database} setDatabase={setDatabase} postId={detail.id} sortByTime={sortByTime} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostDetailCard;