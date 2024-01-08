import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom"
import Logo from '../../assets/Logo.png'
import './SideNavBarStyle.css'

function SideNavBar() {
    const initialIsOpen = localStorage.getItem('isOpen') === 'false' ? false : true;
    const [isOpen, setIsOpen] = useState(initialIsOpen);
    const location = useLocation();

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        localStorage.setItem('isOpen', isOpen);
    }, [isOpen]);

    return (
        <div className={`h-screen p-2`}>
            <div className={`sidebar ${isOpen ? '' : 'active'} bg-[#181754] h-full rounded-[30px] text-white py-10 flex flex-col justify-between`}>
                <div className='header flex justify-between items-center pl-10 pr-8 h-[50px]'>
                    <Link className='logo' to='/'><img src={Logo} alt="Logo" className='w-28' /></Link>
                    <button
                        className={`menuToggle ${isOpen ? '' : 'active'}`}
                        onClick={toggle}
                    >
                        <img width="35" height="35" src="https://img.icons8.com/sf-black/FFFFFF/menu.png" alt="menu" />
                    </button>
                </div>
                <ul className='pl-5'>
                    <li className={location.pathname === '/dashboard' ? 'active' : ''}>
                        <Link to='/dashboard'>
                            <img src={`https://img.icons8.com/fluency-systems-filled/${location.pathname === '/dashboard' ? '181754' : 'FFFFFF'}/home.png`} alt="home" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className={location.pathname === '/review' ? 'active' : ''}>
                        <Link to='/review'>
                            <img src={`https://img.icons8.com/fluency-systems-filled/${location.pathname === '/review' ? '181754' : 'FFFFFF'}/very-popular-topic.png`} alt="very-popular-topic" />
                            <span>Review</span>
                        </Link>
                    </li>
                    <li className={location.pathname === '/studyPlan' ? 'active' : ''}>
                        <Link to='/studyPlan'>
                            <img src={`https://img.icons8.com/material-rounded/${location.pathname === '/studyPlan' ? '181754' : 'FFFFFF'}/book.png`} alt="book" />
                            <span>Study Plan</span>
                        </Link>
                    </li>
                    <li className={location.pathname === '/howToRegister' ? 'active' : ''}>
                        <Link to='/howToRegister'>
                            <img src={`https://img.icons8.com/material-rounded/${location.pathname === '/howToRegister' ? '181754' : 'FFFFFF'}/idea--v1.png`} alt="idea--v1" />
                            <span>How To Register</span>
                        </Link>
                    </li>
                </ul>
                <div className='profile-detail pl-10 pr-8 flex justify-between items-center'>
                    <div className='profile-content flex items-center gap-4'>
                        <div className='bg-white w-12 h-12 rounded-[50px]'></div>
                        <span className='username text-[18px] font-light'>Username</span>
                    </div>
                    <Link className='logout' to='/'>
                        <img width='24' height='24' src="https://img.icons8.com/ios-filled/FFFFFF/logout-rounded.png" alt="logout-rounded" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SideNavBar