import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "./PostDetailCard.css";
import { Carousel } from "@material-tailwind/react";

const DetailCard = [
  {
    titlename: "Admission dek63",
    name: "Punimmiki",
    date: "17/12/2023",
    time: "5.20 PM",
    message:
      "คณะเทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง เปิดรับสมัครเข้าศึกษาต่อระดับปริญญาตรี ประจำปีการศึกษา 2563 TCAS 63 รอบที่ 4 (Admission) 2 หลักสูตร 1) เทคโนโลยีสารสนเทศ (Information Technology : IT) รับจำนวน 15 คน 2) ข้อมูลและการวิเคราะห์เชิงธุรกิจ (Data Science and Business Analytics : DSBA) รับจำนวน 6 คน ยกเลิกการสอบสัมภาษณ์ เนื่องจากสถานการณ์เชื้อ COVID -19 ระบาด",
    image: [
      "https://www.it.kmitl.ac.th/wp-content/uploads/2020/05/1300x867pix-%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%AA%E0%B8%A1%E0%B8%B1%E0%B8%84%E0%B8%A3-TCAS63-4-Admission.jpg",
      "https://osda.kmitl.ac.th/storage/cover_image/qecgcbzJO7u35tV60AAcF5ihBI3M2n8wIJcVVlcb.jpeg",
      "https://osda.kmitl.ac.th/storage/cover_image/qecgcbzJO7u35tV60AAcF5ihBI3M2n8wIJcVVlcb.jpeg",
      "https://osda.kmitl.ac.th/storage/cover_image/qecgcbzJO7u35tV60AAcF5ihBI3M2n8wIJcVVlcb.jpeg",
    ],
    like: 145,
    comment: 76,
  },
  {
    titlename: "ชำระค่าเทอม",
    name: "Punimmiki",
    date: "18/12/2023",
    time: "6.30 AM",
    message:
      "ขั้นตอนการพิมพ์ใบชำระค่าธรรมเนียมการศึกษา นักศึกษาทุกชั้นปี (ป.ตรี/โท/เอก) สามารถพิมพ์ใบแจ้งชําระเงินจากระบบ แล้วนําไปยื่นชําระเงินผ่านเคาท์เตอร์ธนาคาร (หรือในนักศึกษาระดับป.ตรี สแกนบาร์โค้ดผ่านแอพธนาคาร) โดยไม่มีค่าปรับชำระเงินล่าช้า จนถึงวันศุกร์ที่ 7 พฤษภาคม 2564",
    image: ["https://engineer.kmitl.ac.th/wp-content/uploads/2021/08/4-4.jpg"],
    like: 235,
    comment: 91,
  },
];

const PostDetailCard = () => {
  const [likedPosts, setLikedPosts] = useState([]);

  const handleLikeClick = (index) => {
    if (likedPosts.includes(index)) {
      setLikedPosts(likedPosts.filter((i) => i !== index));
    } else {
      setLikedPosts([...likedPosts, index]);
    }
  };

  const [showFullScreen, setShowFullScreen] = useState(false);
  const [imgForFullScreen, setImgForFullScreen] = useState("");

  const handleImageClick = (item) => {
    setImgForFullScreen(item);
    console.log("img: ", item);
    setShowFullScreen(true);
  };

  const handleCloseFullScreen = () => {
    setShowFullScreen(false);
  };

  return (
    <div className="mt-5">
      {DetailCard.map((detail, index) => (
        <div key={index} className="mt-4">
          <div className="flex-shrink-0 border-[1px] border-solid border-gray-300 rounded-[30px] p-6 bg-white">
            <div className="text-[#151C38] text-2xl font-[500] leading-normal">
              {detail.titlename}
            </div>

            <div className="mt-5 flex items-start">
              <div className="w-[50px] h-[50px] flex-shrink-0 rounded-full bg-[#151C38]"></div>
              <div className="ml-4">
                <p className="text-[#151C38] text-l font-[400]">
                  {detail.name}
                </p>
                <p className="text-[#A4A4A4] text-l font-[350]">
                  {detail.date}, {detail.time}
                </p>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-black text-l font-light">{detail.message}</p>

              <React.Fragment key={index}>
                <Carousel className="rounded-xl">
                  {detail.image.map((item, i) => {
                    return (
                      <div key={i}>
                        <img
                          src={item}
                          className="object-center w-full h-[500px] object-cover rounded-[30px] border-[1px] border-solid border-gray-300 "
                          alt="post"
                          onClick={() => handleImageClick(item)}
                        />

                        {showFullScreen && (
                          <div
                            className="fullscreen-overlay active"
                            onClick={handleCloseFullScreen}
                          >
                            <div className="fullscreen-image">
                              <img
                                className="centered-image"
                                src={imgForFullScreen}
                                alt="Full Screen"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </Carousel>
              </React.Fragment>
            </div>

            <div className="mt-3 flex items-start">
              <Icon
                icon="bxs:heart"
                color={likedPosts.includes(index) ? "#d91818" : "#151c38"}
                width="22"
                height="22"
                onClick={() => handleLikeClick(index)}
              />
              <div className="ml-1 mt-[1px]">
                <p className="text-[#151C38] text-sm mr-3">{detail.like}</p>
              </div>
              <div className="mt-[2.5px]">
                <Icon
                  icon="fa:comment-o"
                  color="#151c38"
                  width="19"
                  height="19"
                />
              </div>
              <div className="ml-1 mt-[1px]">
                <p className="text-[#151C38] text-sm">{detail.comment}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostDetailCard;
