import React, { useState, useEffect } from 'react'
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { SideNavBar } from '../components/index'
import '../index.css'
import BG01 from '../assets/register/BG01.png'

function Layout() {

    const location = useLocation();
    const initialIsOpen = localStorage.getItem('isOpen') === 'false' ? false : true;
    const [isOpen, setIsOpen] = useState(initialIsOpen);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`flex flex-raw ${location.pathname === '/howToRegister' && 'bg-no-repeat bg-[#181754] text-white'}`}
            style={location.pathname === '/howToRegister' ? { backgroundImage: `url(${BG01})` } : { backgroundImage: '' }}
        >
            <div className={`layout ${isOpen === true ? 'active' : ''}`}>
                <SideNavBar toggle={toggle} isOpen={isOpen} setIsOpen={setIsOpen} location={location} />
            </div>
            <div className={`h-auto w-full m-10`}>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout