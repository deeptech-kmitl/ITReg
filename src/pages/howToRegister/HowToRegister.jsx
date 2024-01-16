import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import './HowToRegisterStyle.css';
import { TypeAnimation } from 'react-type-animation';
import Plx from "react-plx";

import HowToRegister01 from '../../assets/register/HowToRegister01.png';
import {
  BG01,
  BG02,
  BG03,
  BG04,
  BG05,
  BG06,
  BG07,
  BG08
} from '../../assets/register/index';

function HowToRegister() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className='relative'>
      <div className='p-2 fixed z-10'>
        <div className='w-[70px] max-2xl:w-[65px] h-[70px] max-2xl:h-[65px] bg-[#181754] rounded-[20px] max-2xl:rounded-[16px] flex justify-center items-center'>
          <button onClick={() => { navigate(-1) }}>
            <img className='w-[40px] max-2xl:w-[35px]' src="https://img.icons8.com/sf-black/FFFFFF/back.png" alt="back" />
          </button>
        </div>
      </div>
      <div className='px-28 relative h-auto'>
        <div className='absolute left-0 z-0 bg-auto bg-no-repeat bg-[#181754] w-full'>
          <img src={BG01} alt="BG01" />
          <img className='pt-[15rem] max-2xl:w-[75%]' src={BG02} alt="BG02" />
          <img className='animTitle pt-[25rem] max-2xl:pt-[15rem] pl-[36rem] max-2xl:pl-[25rem] max-2xl:w-[55rem]' src={BG03} alt="BG03" />
          <img className='' src={BG04} alt="BG04" />
          <img className='pl-[36rem] max-2xl:pl-[20rem] max-2xl:w-[60rem]' src={BG05} alt="BG05" />
          <img className='pt-[5rem]' src={BG06} alt="BG06" />
          <img className='pt-[16rem] pl-[36rem] max-2xl:pl-[20rem] max-2xl:w-[60rem]' src={BG07} alt="BG07" />
          <img className='pt-[5rem]' src={BG08} alt="BG08" />
        </div>

        <Plx
          className='title h-screen flex flex-col justify-center items-center text-white'
          tagName={'div'}
          parallaxData={[
            {
              start: 0,
              end: 2000,
              properties: [
                {
                  startValue: 0,
                  endValue: 100,
                  property: "translateY",
                },
                {
                  startValue: 1,
                  endValue: 0,
                  property: "opacity",
                },
              ],
            },
          ]}
        >
          <h1 className='font-semibold text-[120px] max-2xl:text-[76px] tracking-[2px] uppercase'>
            <TypeAnimation
              sequence={[
                'How To Register',
                2000,
                'How To ',
                1500,
              ]}
              wrapper="span"
              repeat={Infinity}
            />
          </h1>
          <span className='font-light text-[24px] max-2xl:text-[18px] text-center'>
            <p>There are several steps to help you get ready for your college experience,</p>
            <p>here are some tips on how to register for college classes.</p>
          </span>
        </Plx>

        <div className='h-auto z-10 relative flex justify-between pt-52'>
          <span className='text-white'>
            <h1>Login</h1>
            <p>เข้าสู่ระบบได้ 2 ช่องทาง</p>
            <p>1. ยืนยันตัวตนด้วยบริการของ Google</p>
            <p>2. ยืนยันตัวตนด้วยบริการของสถาบันฯ</p>
            <p>ใช้อีเมล @kmitl.ac.th</p>
          </span>
          <img className='w-[50%]' src={HowToRegister01} alt="HowToRegister01" />
        </div>
      </div>

      {/* <div className='px-28 relative h-auto bg-[#181754] w-full'>
        <Plx
          className='absolute left-0 z-0 bg-auto bg-no-repeat'
          tagName={'div'}
          parallaxData={[
            {
              start: 0,
              end: 2000,
              properties: [
                {
                  startValue: 0,
                  endValue: 1,
                  property: "opacity",
                },
              ],
            },
          ]}
        >
          <img src={BG02} alt="BG02" />
        </Plx>

        <div className='h-auto z-10 relative flex justify-between pt-80'>
          <img className='w-[50%]' src={HowToRegister02} alt="HowToRegister02" />
          <span className='text-white'>
            <h1>Login</h1>
            <p>เข้าสู่ระบบได้ 2 ช่องทาง</p>
            <p>1. ยืนยันตัวตนด้วยบริการของ Google</p>
            <p>2. ยืนยันตัวตนด้วยบริการของสถาบันฯ</p>
            <p>ใช้อีเมล @kmitl.ac.th</p>
          </span>
        </div>
      </div> */}

    </div >
  )
}

export default HowToRegister