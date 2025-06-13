import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
import FullShop from './FullShop'

export default function Shop() {
    return (
        
        <div>
             <NavBar />
            <FullShop/>
            <Footer/>
        </div>
    )
}
