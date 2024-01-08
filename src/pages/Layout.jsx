import React from 'react'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { SideNavBar } from '../components/index'

function Layout() {
    return (
        <div className='flex flex-raw'>
            <SideNavBar />
            <div className='h-screen w-full p-10'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout