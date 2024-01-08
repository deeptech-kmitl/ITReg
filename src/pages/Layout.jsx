import React, { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom";
import { SideNavBar } from '../components/index'
import '../index.css'

function Layout() {

    const initialIsOpen = localStorage.getItem('isOpen') === 'false' ? false : true;
    const [isOpen, setIsOpen] = useState(initialIsOpen);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='flex flex-raw'>
            <div className={`layout ${isOpen === true ? 'active' : ''}`}>
                <SideNavBar toggle={toggle} isOpen={isOpen} setIsOpen={setIsOpen} location={location} />
            </div>
            <div className={`h-screen w-full p-10`}>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout