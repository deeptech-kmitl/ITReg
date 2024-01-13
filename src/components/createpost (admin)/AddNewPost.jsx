import React from "react";
import { Icon } from "@iconify/react";

const AddNewPost = () => {
  return (
    <div className="flex-shrink-0 bg-white border-[2px] border-solid border-gray-300 rounded-[20px] p-4 relative">
      <p className="text-[#A4A4A4] text-l font-[350] ml-2">Add new post ...</p>
      
      <button
        className="w-[40px] h-[40px] flex-shrink-0 bg-gradient-to-br from-[#0D0B5F] to-[#029BE0] rounded-[15px] absolute top-1/2 right-[-6px] transform -translate-x-1/2 -translate-y-1/2"
        style={{ border: "none", outline: "none" }}
      >
        {/* Your button content goes here */}
        <Icon icon="charm:plus" style={{ fontSize: "20px", color: "#fff", margin: "auto" }} />
      </button>
    </div>
  );
};

export default AddNewPost;
