import React from "react";

const DetailSubjectsCard = [
  {
    coursecode: "060630716",
    subjectname: "DISCRETE MATHEMATICS (คณิตศาสตร์ไม่ต่อเนื่อง)",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut...",
  },
];

const PopularSubjectsCard = () => {
  return (
    <div className="mt-5 relative">
      {DetailSubjectsCard.map((subject, index) => (
        <div key={index} className=" flex-shrink-0 border-[1.5px] border-solid border-gray-300 rounded-[15px] p-4 bg-white">
          <div className="text-lg font-semibold text-gray-800 mb-2">{subject.subjectname}</div>
          <div className="text-black">{subject.description}</div>
          <div className="mt-4 flex items-center justify-between">
            {/* <span className="text-gray-500">Course Code: {subject.coursecode}</span>
            ตรวจสอบเงื่อนไขเพื่อแสดงปุ่มหรือข้อมูลอื่น ๆ ตามต้องการ */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularSubjectsCard;
