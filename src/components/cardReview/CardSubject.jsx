import React, { useState } from "react";

const ContentSubjectCard = [
    {
        subjectId: "06016321",
        subjectName: "วิศวกรรมซอฟต์แวร์",
        subjectNameEn: "SOFTWARE ENGINEERING",
        subjectCredit: "3(3-0-6)",
        subjectType: "หมวดบังคับ"
    },
    {
        subjectId: "06016366",
        subjectName: "การประมวลผลภาพ",
        subjectNameEn: "IMAGE PROCESSING",
        subjectCredit: "3(3-0-6)",
        subjectType: "หมวดเสรีบังคับ"
    },
];

const CardSubject = () => {
    return (
        <div>
        {ContentSubjectCard.map((detail, index) => (
            <div className="max-w mt-4 p-6 bg-white border border-gray-200 rounded-xl hover:bg-gray-100">
                <div className="grid grid-cols-3">
                    <h5 className="mb-2 text-lg font-bold text-[#151C38]">{detail.subjectId}</h5>
                    <div>
                        <h5 className="mb-2 text-lg font-bold text-[#151C38]">{detail.subjectName}</h5>
                        <h5 className="mb-2 text-lg font-bold text-[#151C38]">{detail.subjectNameEn}</h5>
                    </div>
                    <div className="text-right">
                        <h5 className="mb-2 text-lg font-bold text-[#151C38]">{detail.subjectCredit}</h5>
                    </div>
                </div>
                <div className="inline-flex items-center px-3 py-1 text-lg font-medium text-center text-white bg-[#151C38] rounded-xl">{detail.subjectType}</div>            
            </div>
        ))}
        </div>
    );
};

export default CardSubject;
