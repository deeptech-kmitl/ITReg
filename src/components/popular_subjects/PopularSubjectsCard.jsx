import React from "react";
import { Icon } from "@iconify/react";

const DetailSubjectsCard = [
  {
    coursecode: "060630716",
    subjectname: "DISCRETE MATHEMATICS (คณิตศาสตร์ไม่ต่อเนื่อง)",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut...",
  },
  {
    coursecode: "020310512",
    subjectname: "Engineering Material",
    description: "วิชานี้ภาษาไทยชื่อวัสดุวิศวกรรม หรือเด็กวิศวะจะเรียนสั้นๆว่า Material",
  }
];

const PopularSubjectsCard = () => {
  return (
    <div className="mt-8 relative">
      {DetailSubjectsCard.map((subject, index) => (
        <div key={index} className="relative">
          {/* กล่องเล็กที่จะทับข้างบน */}
          <div className="absolute top-[-13px] left-4 w-[120px] h-[27px] flex-shrink-0 z-10 rounded-[10px] bg-[#151C38] flex items-center justify-center">
            <p className="text-[15px] font-semibold text-white">{subject.coursecode}</p>
          </div>

          {/* กล่องหลัก */}
          <div className="flex-shrink-0 z-0 border-[1.5px] border-solid border-gray-300 rounded-[15px] p-6 bg-white">
            <div className=" justify-center text-base font-semibold text-gray-800 mb-2">
              {subject.subjectname}
            </div>
            <div className="text-black font-light text-sm">{subject.description}</div>
            <div className="mt-2">
                <Icon icon="bi:star-fill" color="#fec60f" width="22" height="22" />
              </div>
          </div>

          {/* ระยะห่างกล่อง */}
          <div className="mb-6" />
        </div>
      ))}
    </div>
  );
};

export default PopularSubjectsCard;
