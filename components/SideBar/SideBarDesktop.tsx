import { sideBarItems } from "@/constants/constants";

import type { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { isOpen } from "@/store/sideBarSlice";

import { MdMenuOpen } from "react-icons/md";
import { FiHome } from "react-icons/fi";

const SideBarDesktop: React.FC = () =>{
    const open = useAppSelector((state: RootState) =>  state.sideBar.open)
    const dispatch = useAppDispatch()
    
    return(
        <nav className= {`fixed h-full ${open ? 'w-60' : 'w-20'} shadow-xl bg-black`}>
          <div className=' px-4 py-4 flex justify-between items-center'>
            <FiHome size={35} className={`${open ? 'visible':'hidden'}`}/>
            <MdMenuOpen size={35} className={`duration-500 cursor-pointer ${!open && 'rotate-180'}`} onClick={() => dispatch(isOpen())}/>
          </div>
            <ul>
                {sideBarItems.map((item) => { 
                    return (<li key = {item.title} className='px-4 py-2 hover:bg-blue-900 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group tooltip'>
                                <a href={item.route} className="flex w-full h-16 py-2 items-center">
                                    <div className="cursor-pointer w-16">
                                        {item.icon}                                  
                                    </div> 
                                    <p className={`tooltiptext ${open ? 'hidden':'visible'}`}>{item.title}</p>  
                                    <p className={`text-lg ${open ? 'visible':'hidden'}`}>{item.title}</p>            
                                </a>
                            </li>)
                })}
            </ul>
         </nav>
    )
}

export default SideBarDesktop;