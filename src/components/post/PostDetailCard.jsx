import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./PostDetailCard.css";
import CommentBox from "./CommentBox";
import CommentInput from "./CommentInput";
import { parse, compareDesc } from "date-fns";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
// import PostDetail from "../../dummyData/PostDetail";


function PostDetailCard({ database, setDatabase, user }) {
  const [likedPosts, setLikedPosts] = useState([]);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [imgForFullScreen, setImgForFullScreen] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showComments, setShowComments] = useState([]);
  // const [database, setDatabase] = useState(PostDetail);

  const sortedDetailCard = database.slice().sort((a, b) => {
    const dateTimeA = parse(`${a.date} ${a.time}`, "dd/MM/yyyy HH.mm", new Date());
    const dateTimeB = parse(`${b.date} ${b.time}`, "dd/MM/yyyy HH.mm", new Date());
    return compareDesc(dateTimeA, dateTimeB);
  });

  const handleToggleLike = (postId) => {
    console.log("กด like", postId)
    setDatabase(
      (dumyDatabase) => {
        const updatedDatabase = [...dumyDatabase];
        const indexQuestion = updatedDatabase.findIndex(post => post.id === postId)
        const likeByUser = updatedDatabase[indexQuestion].like.includes(user);
        console.log('user มีข้อมูลใน like >>> ', likeByUser)

        // user ไม่มีข้อมูลใน like >>> จะใส่สี
        if (!likeByUser) {

          // เพิ่ม user ลง 'like'
          updatedDatabase[indexQuestion].like.push(user);
        }
        // user มีข้อมูลใน like >>> จะลบสี
        else {
          updatedDatabase[indexQuestion].like = updatedDatabase[indexQuestion].like.filter(user_id => user_id !== user);
        }
        return [...updatedDatabase];;
      }
    )
  }

  const handleImageClick = (item, index) => {
    setImgForFullScreen(item);
    setCurrentImageIndex(index);
    setShowFullScreen(true);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % database.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + database.length) % database.length
    );
  };

  const handleCloseFullScreen = () => {
    setShowFullScreen(false);
  };

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

  const toggleModalEdit = (detail) => {
    const currentDate = new Date();
    if (detail == "save") {
      console.log("Save toggle Edit")
      // ค้นหา index ของข้อมูลที่ต้องการอัพเดท
      const dataIndex = database.findIndex((item) => item.id === clonePost.id);
      setDatabase((prevDatabase) => {
        const updatedDatabase = [...prevDatabase];
        updatedDatabase[dataIndex].message = textPost;
        updatedDatabase[dataIndex].titlename = newtitle;
        updatedDatabase[dataIndex].date = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        updatedDatabase[dataIndex].time = currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        // updatedDatabase[dataIndex].edit = true;
        return updatedDatabase;
      })
      setClonePost('')
      setTextPost('')
    }
    else {
      setClonePost(detail)
      setTextPost(detail.message)
      setNewtitle(detail.titlename)
    }
    setIsModalEditOpen(!isModalEditOpen);
  };

  // Modal delete open
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isIndexDelete, setIsIndexDelete] = useState(null)
  const toggleModalDelete = (command, index) => {
    // console.log(command, index)
    if (command === 'X' || command === 'cancle') {
      setIsIndexDelete(null)
      setIsModalDeleteOpen(false);
    } else if (command === 'openModal') {
      setIsIndexDelete(index)
      setIsModalDeleteOpen(true);
    } else if (command === 'delete') {
      const newDatabase = database.filter(detail => detail.id !== isIndexDelete);
      setDatabase(newDatabase)
      setIsIndexDelete(null)
      setIsModalDeleteOpen(false);
    }
  };

  return (
    <div className="mt-5">
      {sortedDetailCard.map((detail, index) => (
        <div key={index} className="mt-4">
          <div className="flex-shrink-0 border-[1px] border-solid border-gray-300 rounded-[30px] p-6 bg-white">
            <div className="text-[#151C38] text-2xl font-[500] leading-normal flex justify-between">
              <span>{detail.titlename}</span>
              <div className="relative">
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
                        <span className="pl-3 text-gray-700">Edit Review</span>
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
                        <span className="pl-3 text-gray-700">Delete Review</span>
                      </div>
                    </MenuItem>
                  </MenuList>
                </Menu>
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
                  {detail.date}, {detail.time} น.
                </p>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-black text-l font-light">{detail.message}</p>

              {detail.image.length === 1 ? (
                <img
                  src={detail.image[0]}
                  className="object-cover w-full rounded-lg cursor-pointer"
                  alt={`post-${index}`}
                  onClick={() => handleImageClick(detail.image[0], index)}
                />
              ) : (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {detail.image.slice(0, 4).map((item, i) => (
                    <div key={i}>
                      <img
                        src={item}
                        className="object-cover w-full h-44 rounded-lg cursor-pointer"
                        alt={`post-${index}-${i}`}
                        onClick={() => handleImageClick(item, index)}
                      />
                    </div>
                  ))}
                  {detail.image.length > 4 && (
                    <div
                      className="object-cover w-full h-44 rounded-lg cursor-pointer"
                      onClick={() => handleImageClick(detail.image[4], index)}
                    >
                      <p className="text-white text-lg font-bold">
                        +{detail.image.length - 4}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {showFullScreen && (
                <div
                  className="fullscreen-overlay active"
                  onClick={handleCloseFullScreen}
                >
                  <div className="fullscreen-image">
                    <Icon
                      icon="fluent:chevron-left-24-filled"
                      color="white"
                      width="32"
                      height="32"
                      className="absolute top-1/2 left-4 cursor-pointer"
                      onClick={handlePrevImage}
                    />
                    <img
                      className="centered-image"
                      src={imgForFullScreen}
                      alt="Full Screen"
                    />
                    <Icon
                      icon="fluent:chevron-right-24-filled"
                      color="white"
                      width="32"
                      height="32"
                      className="absolute top-1/2 right-4 cursor-pointer"
                      onClick={handleNextImage}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3 flex items-start">
              {/* Did you like it ? */}
              {detail.like.filter(user_id => user_id === user).length === 1 ?
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
                <p className="text-[#151C38] text-sm">{detail.comment.length}</p>
              </div>
            </div>
            {showComments[index] && (
              <div>
                <CommentBox data={detail} user={user} indexPost={index} database={database} setDatabase={setDatabase} postId={detail.id} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostDetailCard;