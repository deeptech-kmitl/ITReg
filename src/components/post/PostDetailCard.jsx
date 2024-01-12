import React from "react";

const DetailCard = [
  {
    titlename: "ลงทะเบียนล่วงหน้า",
    name: "Punimmiki",
    date: "17/12/2023",
    time: "5.20 PM",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    titlename: "ชำระค่าเทอม",
    name: "Punimmiki",
    date: "18/12/2023",
    time: "6.30 AM",
    message:
      "Another exciting adventure awaits in this captivating book. Get ready for twists and turns that will keep you on the edge of your seat.",
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostDetailCard;
