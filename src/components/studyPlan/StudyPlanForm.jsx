import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function StudyPlanForm() {
    const navigate = useNavigate();

    const [selectedYear, setSelectedYear] = useState('2566');
    const [selectedTerm, setSelectedTerm] = useState('1');
    const [selectedCoop, setSelectedCoop] = useState('coop');
    const [selectedCourse, setSelectedCourse] = useState('it');
    const [selectedYearStudy, setSelectedYearStudy] = useState('1');

    const yearOptions = ['2566', '2565', '2564', '2563']
    const courseOptions = [
        { name: 'เทคโนโลยีสารสนเทศ', value: 'it' },
        { name: 'วิทยาการข้อมูลและการวิเคราะห์เชิงธุรกิจ', value: 'dsba' },
        { name: 'เทคโนโลยีสารสนเทศทางธุรกิจ (หลักสูตรนานาชาติ)', value: 'bit' },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        const formData = {
            selectedYear,
            selectedTerm,
            selectedCoop,
            selectedCourse,
            selectedYearStudy,
        };
        console.log('Search', formData);
        getStudyPlan(formData);
    };

    function getStudyPlan(formData) {

        console.log(formData.selectedYear);

        let apiUrl = '';
        if ((formData.selectedYear === '2565' || formData.selectedYear === '2566') && (formData.selectedYearStudy === '1' || formData.selectedYearStudy === '2')) {
            apiUrl = `http://localhost:3001/getStudyPlan/2565`;
        } else {
            apiUrl = `http://localhost:3001/getStudyPlan/2560`;
        }
        console.log(apiUrl);

        axios.get(apiUrl, {
            params: {
                year: formData.selectedYear,
                term: formData.selectedTerm,
                coop: formData.selectedCoop,
                course: formData.selectedCourse,
                yearStudy: formData.selectedYearStudy,
            }
        })
            .then((res) => {
                navigate('/studyPlan/result', {
                    state: {
                        subjects: res.data,
                        year: selectedYear,
                        course: courseOptions.find(opt => opt.value === selectedCourse)?.name,
                        yearStudy: selectedYearStudy,
                        term: selectedTerm,
                    }
                });
            })
            .catch((err) => console.log(err.message))
    }

    return (
        <form className="w-[65%] max-2xl:w-[75%] mt-10 max-2xl:mt-2 h-auto p-12 max-2xl:p-8 bg-white border border-gray-200 rounded-[30px]"
            onSubmit={handleSearch}
        >
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase text-[16px] max-2xl:text-[14px] mb-2" htmlFor="year">
                        ปีการศึกษา
                    </label>
                    <select
                        className='bg-[#F4F4F4] border border-gray-200 rounded-[10px] text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500'
                        name="selectedYear"
                        onChange={e => setSelectedYear(e.target.value)}
                        value={selectedYear}>
                        {yearOptions.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase text-[16px] max-2xl:text-[14px] mb-2" htmlFor="semester">
                        ภาคการศึกษา
                    </label>
                    <select
                        className='bg-[#F4F4F4] border border-gray-200 rounded-[10px] text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500'
                        name="selectedSemester"
                        onChange={e => setSelectedTerm(e.target.value)}
                        value={selectedTerm}>
                        <option value="1">ภาคเรียนที่ 1</option>
                        <option value="2">ภาคเรียนที่ 2</option>
                    </select>
                </div>
                <div className="w-full px-3 mt-5 max-2xl:mt-3">
                    <label className="block uppercase text-[16px] max-2xl:text-[14px] mb-2" htmlFor="faculty">
                        คณะ
                    </label>
                    <select
                        className='bg-[#F4F4F4] border border-gray-200 rounded-[10px] text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500'
                        name="selectedFaculty"
                        disabled>
                        <option value="it">คณะเทคโนโลยีสารสนเทศ</option>
                    </select>
                </div>
                <div className="w-full px-3 mt-5 max-2xl:mt-3">
                    <label className="block uppercase text-[16px] max-2xl:text-[14px] mb-2" htmlFor="department">
                        ภาควิชา
                    </label>
                    <select
                        className='bg-[#F4F4F4] border border-gray-200 rounded-[10px] text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500'
                        name="selectedDepartment"
                        disabled>
                        <option value="it">คณะเทคโนโลยีสารสนเทศ</option>
                    </select>
                </div>
                <div className="w-full px-3 mt-5 max-2xl:mt-3">
                    <label className="block uppercase text-[16px] max-2xl:text-[14px] mb-2" htmlFor="cooperative">
                        สหกิจ / ไม่สหกิจ
                    </label>
                    <select
                        className='bg-[#F4F4F4] border border-gray-200 rounded-[10px] text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500'
                        name="selectedCooperative"
                        onChange={e => setSelectedCoop(e.target.value)}
                        value={selectedCoop}>
                        <option value="coop">สหกิจ</option>
                        <option value="nonCoop">ไม่สหกิจ</option>
                    </select>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-5">
                    <label className="block uppercase text-[16px] max-2xl:text-[14px] mb-2" htmlFor="course">
                        หลักสูตร
                    </label>
                    <select
                        className='bg-[#F4F4F4] border border-gray-200 rounded-[10px] text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500'
                        name="selectedCourse"
                        onChange={e => setSelectedCourse(e.target.value)}
                        value={selectedCourse}>
                        {courseOptions.map((item, index) => (
                            <option key={index} value={item.value}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-5">
                    <label className="block uppercase text-[16px] max-2xl:text-[14px] mb-2" htmlFor="yearStudy">
                        ชั้นปี
                    </label>
                    <select
                        className='bg-[#F4F4F4] border border-gray-200 rounded-[10px] text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500'
                        name="selectedYearStudy"
                        onChange={e => setSelectedYearStudy(e.target.value)}
                        value={selectedYearStudy}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
            </div>
            <div className='px-3 mt-8 max-2xl:mt-5'>
                <button
                    className='py-2 tracking-[1px] rounded-[10px] text-white text-[16px] max-2xl:text-[15px] uppercase w-full bg-gradient-to-br from-[#0D0B5F] from-[12.5%] to-[#029BE0] to-[100%]'
                    type="submit"
                >
                    Search
                </button>
            </div>
        </form>
    )
}

export default StudyPlanForm
