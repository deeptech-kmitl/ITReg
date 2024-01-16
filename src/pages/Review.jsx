import React from 'react'
import CardSubject from '../components/cardReview/CardSubject'
import CardAnnouncement from '../components/cardReview/CardAnnouncement';

function Review() {

  const ContentSubjectCard = [
    {
      subjectId: "06016321",
      subjectName: "วิศวกรรมซอฟต์แวร์",
      subjectNameEn: "SOFTWARE ENGINEERING",
      subjectCredit: "3(3-0-6)",
      subjectType: "หมวดบังคับ",
      subjectContent: "ความรู้เบื้องต้นเกี่ยวกับวิศวกรรมซอฟต์แวร์ กลุ่มซอฟต์แวร์และแนวโน้มความเปลี่ยนแปลง กรอบงานของกระบวนการวิศวกรรมซอฟต์แวร์ กระบวนการพัฒนาซอฟต์แวร์แบบอไจล์ แม่แบบสำหรับการ ออกแบบ วิธีปฏิบัติด้านวิศวกรรมซอฟต์แวร์ สภาพแวดล้อมการพัฒนาซอฟต์แวร์โดยใช้เวอร์ชั่นคอนโทรล แบบจำลองวุฒิภาวะและความสามารถเชิงบูรณาการ (ซีเอ็มเอ็มไอ) วิศวกรรมความต้องการ วิศวกรรมการวิเคราะห์และออกแบบ ความรู้เบื้องต้นเกี่ยวกับการทดสอบซอฟต์แวร์ กระบวนการยูนิฟาย์ การประเมินกระบวนการ และแบบจำลองกระบวนการเชิงบัญญัติและเชิงวิวัฒน์"
    },
    {
      subjectId: "06016366",
      subjectName: "การประมวลผลภาพ",
      subjectNameEn: "IMAGE PROCESSING",
      subjectCredit: "3(3-0-6)",
      subjectType: "หมวดเสรีคณะ",
      subjectContent: "องค์ประกอบของระบบประมวลผลภาพ การสร้างภาพและรูปแบบการจัดเก็บข้อมูลภาพ เทคนิคพื้นฐานสำหรับการวิเคราะห์และประมวลผลข้อมูลภาพ การรับภาพ การแปลงภาพ การปรับปรุงภาพโดยใช้หลักการของเอ็นฮานสเม้นท์และรีสทอเรชัน การบีบอัดข้อมูลภาพ การวิเคราะห์ภาพ เช่น การตัดแยกวัตถุ การวัดคุณสมบัติของวัตถุในภาพ การวิเคราะห์ฟูเรีย"
    },
]

  return (
    <>
      <div className='w-full h-auto flex'>
        <div className='w-[70%] pr-5'>
          <div className='flex flex-row gap-3'>
            <h1 className='text-[26px] font-medium text-[#151C38]'>รายวิชาเรียน</h1>
            <select className="text-white bg-[#151C38] rounded-lg text-lg px-2" name='selectYear'>
              <option value="year" disabled selected>ชั้นปี</option>
              <option value="year1">1</option>
              <option value="year2">2</option>
              <option value="year3">3</option>
              <option value="year4">4</option>
            </select>
            <select className="text-white bg-[#151C38] rounded-lg text-lg px-2" name='selectType'>
              <option value="type" disabled selected>ประเภทวิชา</option>
              <option value="type1">วิชาบังคับ</option>
              <option value="type2">วิชาเสรีทั่วไป</option>
              <option value="Type3">วิชาเสรีคณะ</option>
              <option value="Type4">ทั้งหมด</option>
            </select>
          </div>
          <div className='inputSearch flex flex-row mt-4 gap-3 drop-shadow-sm	'>
            <img width="35" height="35" src='https://img.icons8.com/fluency-systems-filled/48/c0c0c0/search.png' className='icon mt-1 ml-2'></img>
            <input type='text' name='email' placeholder='Type to search ...' className='w-full h-[45px] font-light'></input>
            <button className='bg-[#FFFFFF] w-[60px] rounded-xl border-[1px] border-[#D9D9D9] drop-shadow-sm'>
              <img width="20" height="20" src='https://img.icons8.com/material-rounded/24/737373/delete-sign.png' className='icon top-3 ml-4'></img>
            </button>
          </div>
          <CardSubject item={ContentSubjectCard} />
        </div>
        
        <div className='w-[30%] border-l-[1px] border-[#00000052] pl-5'>
          <h1 className='text-[26px] font-medium'>Announcement</h1>
          <CardAnnouncement />
        </div>
      </div>
    </>
  )
}

export default Review