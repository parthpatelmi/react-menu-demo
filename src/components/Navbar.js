import React, { useState } from 'react'
import './Navbar.scss'
import ServicesModal from './ServicesModal'

const Navbar = () => {
const [showServices, setShowServices] = useState(false)

    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <span className='d-inline-block text-uppercase'>
                    logo text
                </span>
                <div className='navbar-main d-inline-block'>
                    <ul className='navbar-ul list-unstyled d-inline-flex'>
                        <li 
                        className='cp services-li'
                        onMouseEnter={() => setShowServices(true) }
                        onMouseLeave={() => setShowServices(false) }
                        >
                            <span className={`text-white${showServices ? 'active' : ""}`}>Services</span>
                    
                        <ServicesModal showServices={true} />
                        </li>
                        <li>Solutions</li>
                        <li>Hire Resources</li>
                        <li>Portfolio</li>
                        <li>About Us</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar