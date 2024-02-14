import React, { useState, useEffect } from 'react'
import { Outlet, Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { SideNavBar } from '../components/index'
import '../index.css'
import BG01 from '../assets/register/BG01.png'
import { useDispatch } from "react-redux";
import { saveAllSubject, show } from '../../redux/subjectSlice';
import axios from 'axios';
import { baseURL } from '../../baseURL';

function Layout() {
    const dispatch = useDispatch()

    const fecthSubject = async () => {
        try {
            const res = await axios.get(baseURL + "getAllSubjects")
            dispatch(saveAllSubject(res.data))
        }
        catch (e) {
            console.log(e)
        }
    }
    fecthSubject()


    const location = useLocation();
    const initialIsOpen = localStorage.getItem('isOpen') === 'false' ? false : true;
    const [isOpen, setIsOpen] = useState(initialIsOpen);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`flex flex-raw`}>
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