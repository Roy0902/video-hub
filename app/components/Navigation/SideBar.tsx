import { sideBarItems } from "@/constants/constants";

import { useAppDispatch, useAppSelector } from "@/store/hook";

import { MdMenuOpen } from "react-icons/md";

import { NavLink } from "react-router";
import { useRef, useState } from "react";

const SideBar: React.FC = () => {
    
    const [open, setOpen] = useState(false);

    const toggleSidebar = () => {
        setOpen(prev => !prev);
    };

    return(
        <div className="me-20">
            <div 
                className={`fixed inset-0 bg-black/30 z-10 ${open ? 'visible' : 'hidden'}`}  
                onClick={toggleSidebar}
            />       
            <nav className={`fixed z-20 ${open ? 'w-60 h-full shadow-xl bg-black bg-opacity-100' : 'w-20 h-20'}`}>
                <MdMenuOpen 
                    size={40} 
                    className={`duration-500 cursor-pointer m-4 ${!open && 'rotate-180'}`} 
                    onClick={toggleSidebar}
                />
                <ul>
                    {sideBarItems.map((item) => { 
                        return (
                            <li 
                                key={item.title} 
                                className={`px-4 py-2 hover:bg-blue-900 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group tooltip ${open ? 'visible' : 'hidden'}`}
                            >
                                <NavLink 
                                    to={item.route} 
                                    className={({ isActive }) => [
                                        'flex w-full h-10 my-2 items-center',
                                        (isActive) ? 'border-l-5 border-blue-400 rounded-md' : null
                                    ].join(' ')}
                                >
                                    <div className="cursor-pointer p-2 w-16">
                                        {item.icon}                         
                                    </div> 
                                    <p className={`text-lg`}>{item.title}</p>            
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}

export default SideBar;