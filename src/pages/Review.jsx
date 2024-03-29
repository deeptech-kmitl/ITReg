import React, { useEffect, useState } from 'react'
import CardSubject from '../components/cardReview/CardSubject'
import CardAnnouncement from '../components/cardReview/CardAnnouncement';
// import { SubjectDetail } from '../dummyData/SubjectDetail';
import { useDispatch, useSelector } from 'react-redux';

function Review() {
  const [textSearch, setTextSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const subjectDetail = useSelector((state) => state.subjects)


  const handleFilterChange = (e) => {
    setTextSearch(e.target.value);
  };


  const filteredList = subjectDetail.filter(item =>
    (item.subjectId.toLowerCase().includes(textSearch.toLowerCase()) ||
      item.thaiSubjectsName.toLowerCase().includes(textSearch.toLowerCase()) ||
      item.engSubjectsName.toLowerCase().includes(textSearch.toLowerCase())) && (item.year == selectedYear || selectedYear == '' || !item.hasOwnProperty("year")) &&
    (item.category == selectedType || selectedType == "")
  );
  // && item.category.includes(selectedType)
  return (
    <>
      <div className='w-full h-auto flex'>
        <div className='pr-5'>
          <div className='flex flex-row gap-3'>
            <h1 className='text-[26px] font-medium text-[#151C38]'>รายวิชาเรียน</h1>
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value)}
              className="text-white bg-[#151C38] rounded-lg text-lg px-2" name='selectYear'>
              <option value="year" disabled selected>ชั้นปี</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="text-white bg-[#151C38] rounded-lg text-lg px-2" name='selectType'>
              <option value="type" disabled selected>ประเภทวิชา</option>
              <option value="หมวดวิชาบังคับ">วิชาบังคับ</option>
              <option value="หมวดวิชาเลือก">วิชาเลือกคณะ</option>
              <option value="หมวดวิชาเสรี">วิชาเสรีทั่วไป</option>
              <option value="">ทั้งหมด</option>
            </select>
          </div>
          <div className='inputSearch flex flex-row mt-4 gap-3 drop-shadow-sm	'>
            <img width="35" height="35" src='https://img.icons8.com/fluency-systems-filled/48/c0c0c0/search.png' className='icon mt-1 ml-2'></img>
            <input type='text' name='email' placeholder='Type to search ...' className='w-full h-[45px] font-light' value={textSearch} onChange={handleFilterChange}></input>
            <button className='bg-[#FFFFFF] w-[60px] rounded-xl border-[1px] border-[#D9D9D9] drop-shadow-sm' onClick={() => setTextSearch('')}>
              <img width="20" height="20" src='https://img.icons8.com/material-rounded/24/737373/delete-sign.png' className='icon top-3 ml-4'></img>
            </button>
          </div>

          {subjectDetail && <CardSubject item={filteredList} />}

        </div>

        {/* <div className='w-[30%] border-l-[1px] border-[#00000052] pl-5'>
          <h1 className='text-[26px] font-medium'>Announcement</h1>
          <CardAnnouncement />
        </div> */}
      </div>
    </>
  )
}

export default Review