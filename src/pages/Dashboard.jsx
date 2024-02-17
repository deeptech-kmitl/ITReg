import React, { useEffect, useState } from "react";
import PostDetailCard from '../components/post/PostDetailCard'
import PopularSubjectsCard from '../components/popular_subjects/PopularSubjectsCard'
import Layout from './Layout'
import PostDetail from "../dummyData/PostDetail";
import { Icon } from "@iconify/react";
import { UserAuth } from "../context/AuthContext";
import axios from "axios";


function Dashboard() {
  const user = "Admin"
  const { role } = UserAuth();
  const [database, setDatabase] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const {instance} = UserAuth()
  const handleModalToggle = () => {
    setModalVisible(!modalVisible);
  };

  // const handlePost = () => {
  //   // ทำงานที่ต้องการเมื่อผู้ใช้กด Accept
  //   setModalVisible(false); // ปิด Modal
  // };

  useEffect(()=>{
    instance.get("http://localhost:3001/post")
      .then((res) => {
        setDatabase(res.data);
      })
      .catch((err) => console.log(err.message))
  }, [])
  
  const [newtitle, setNewtitle] = useState('');
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImageFiles(selectedFiles);

    // Generate preview URLs for selected images
    const previewURLs = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewURLs);
  };

  // เพิ่มข้อมูลลงฐานข้อมูล
  const newPost = () => {
    const currentDate = new Date();
    const formData = new FormData();
    for (const file of imageFiles) {
      formData.append('images', file);
    }
    const newQuestion = {
      titlename: newtitle,
      name: user,
      message: message,
      image: imageFiles,
      like: [],
      comment: []
    };
    Object.entries(newQuestion).forEach(([key, value]) => {
      formData.append(key, value);
    });
    axios.post(`http://localhost:3001/newPost`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((res) => {
        // เอาข้อมูลเก่า + ข้อมูลใหม่
        console.log(res.data)
        const newDatabase = [...database, {...res.data}];
        // Update the state with the new array
        setDatabase(newDatabase);
        setModalVisible(false); // ปิด Modal
        setImageFiles([]); // Clear the selected image files
        setPreviewImages([]); // Clear image previews
        setNewtitle('')
        setMessage('')
      })
      .catch((err) => { 
        console.log(err);
        setModalVisible(false); // ปิด Modal
        setImageFiles([]); // Clear the selected image files
        setPreviewImages([]); // Clear image previews
        setNewtitle('')
        setMessage('')
      })
  }

  const sortByTime = (a, b) => {
    const timeA = a.dateTime._seconds + a.dateTime._nanoseconds / 1e9;
    const timeB = b.dateTime._seconds + b.dateTime._nanoseconds / 1e9;
    return timeB - timeA; // Sorting in descending order (latest first)
  };

  return (
    <div className='w-full h-full'>
      <header className='text-[40px] max-2xl:text-[34px] font-semibold bg-gradient-to-br from-[#0D0B5F] from-[12.5%] to-[#029BE0] to-[100%] inline-block text-transparent bg-clip-text'>
        Public relations
      </header>
      <div className='w-full h-auto flex mt-5'>
        <div className='w-[70%] mr-10'>
          {role == "admin" && (
            <div className="flex-shrink-0 bg-white border-[2px] border-solid border-gray-300 rounded-[20px] p-4 relative">
              <p className="text-[#A4A4A4] text-l font-[350] ml-2">{role}</p>
              <button
                onClick={handleModalToggle}
                className="w-[40px] h-[40px] flex-shrink-0 bg-gradient-to-br from-[#0D0B5F] to-[#029BE0] hover:from-[#029BE0] hover:to-[#0D0B5F] rounded-[15px] absolute top-1/2 right-[-6px] transform -translate-x-1/2 -translate-y-1/2"
                type="button"
                style={{
                  border: "none",
                  outline: "none",
                  zIndex: modalVisible ? 1000 : 1,
                }}
              >
                <Icon
                  icon="charm:plus"
                  style={{ fontSize: "20px", color: "#fff", margin: "auto" }}
                />
              </button>

              {modalVisible && (
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
                      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>

                    <span
                      className="hidden sm:inline-block sm:align-middle sm:h-screen"
                      aria-hidden="true"
                    >
                      &#8203;
                    </span>
                    {/* Pop up */}
                    <div className="inline-block align-bottom bg-white rounded-[20px] text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                      <div className="bg-white rounded-[30px]">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 rounded-t">
                          <h5 className="text-[27px] font-semibold bg-gradient-to-br from-[#0D0B5F] from-[12.5%] to-[#029BE0] to-[100%] inline-block text-transparent bg-clip-text text-center w-full">
                            Create Post
                          </h5>

                          <button
                            type="button"
                            onClick={handleModalToggle}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-300 hover:text-white"
                          >
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
                            <span className="sr-only">Close modal</span>
                          </button>
                        </div>

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
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center p-4 md:p-5 rounded-b mt-[-20px]">
                          <input
                            type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={handleImageChange}
                            className="flex items-center text-gray-900 bg-white border border-gray-400 focus:outline-none hover:border-[#0D0B5F] font-normal rounded-lg text-sm px-5 py-2 me-2 mb-2"
                            multiple
                          />
                        </div>
                        {/* Display image previews */}
                        <div className="flex space-x-2 p-4 md:p-5">
                          {previewImages.map((previewURL, index) => (
                            <img
                              key={index}
                              src={previewURL}
                              alt={`Image Preview ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                        <div className="flex items-center p-4 md:p-5 rounded-b mt-[-20px]">
                          <button
                            onClick={newPost}
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
            </div>)}
          <PostDetailCard database={database.sort(sortByTime)} setDatabase={setDatabase} role={role} />
        </div>
        <div className='w-[30%] border-l-[1px] border-[#00000052] pl-10'>
          <h1 className='text-[26px] max-2xl:text-[20px] font-medium'>Popular subjects</h1>
          <PopularSubjectsCard />
        </div>
      </div>
    </div>
  )
}

export default Dashboard