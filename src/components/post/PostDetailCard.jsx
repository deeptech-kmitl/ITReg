import React from "react";

const DetailCard = [
  {
    titlename: "Admission dek63",
    name: "Punimmiki",
    date: "17/12/2023",
    time: "5.20 PM",
    message:
      "คณะเทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง เปิดรับสมัครเข้าศึกษาต่อระดับปริญญาตรี ประจำปีการศึกษา 2563 TCAS 63 รอบที่ 4 (Admission) 2 หลักสูตร 1) เทคโนโลยีสารสนเทศ (Information Technology : IT) รับจำนวน 15 คน 2) ข้อมูลและการวิเคราะห์เชิงธุรกิจ (Data Science and Business Analytics : DSBA) รับจำนวน 6 คน ยกเลิกการสอบสัมภาษณ์ เนื่องจากสถานการณ์เชื้อ COVID -19 ระบาด",
    image: "https://www.it.kmitl.ac.th/wp-content/uploads/2020/05/1300x867pix-%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%AA%E0%B8%A1%E0%B8%B1%E0%B8%84%E0%B8%A3-TCAS63-4-Admission.jpg",
  },
  {
    titlename: "ชำระค่าเทอม",
    name: "Punimmiki",
    date: "18/12/2023",
    time: "6.30 AM",
    message:
      "ขั้นตอนการพิมพ์ใบชำระค่าธรรรมเนียมการศึกษา นักศึกษาทุกชั้นปี (ป.ตรี/โท/เอก) สามารถพิมพ์ใบแจ้งชําระเงินจากระบบ แล้วนําไปยื่นชําระเงินผ่านเคาท์เตอร์ธนาคาร (หรือในนักศึกษาระดับป.ตรี สแกนบาร์โค้ดผ่านแอพธนาคาร) โดยไม่มีค่าปรับชำระเงินล่าช้า จนถึงวันศุกร์ที่ 7 พฤษภาคม 2564",
    image: "",
  },
];

const PostDetailCard = () => {
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
              {/* เช็คว่ามีรูปภาพหรือไม่ ถ้ามีให้แสดง */}
              {detail.image && (
                <img
                  src={detail.image}
                  alt="Post Image"
                  className="mt-4 w-full rounded-[30px] border-[1px] border-solid border-gray-300"
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostDetailCard;
