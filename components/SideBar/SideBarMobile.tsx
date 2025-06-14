import { sideBarItems } from "@/constants/constants";
import { FiHome } from "react-icons/fi";

const SideBarMobile: React.FC = () =>{
    return(
        <nav className= {`fixed h-full w-20 shadow-xl bg-black`}>
          <div className='px-4 py-4 flex justify-between items-center'>
            <FiHome size={35} className={`duration-500 cursor-pointer}`}/>
          </div>
            <ul>
                {sideBarItems.map((item) => { 
                    return (<li key = {item.title} className='px-4 py-4 hover:bg-blue-900 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group tooltip'>
                                <a href={item.route} className="flex w-full h-full py-2 items-center">
                                    <div className="w-16">
                                        {item.icon}                                  
                                    </div> 
                                    <p className={`tooltiptext`}>{item.title}</p>        
                                </a>
                            </li>)
                })}
            </ul>
         </nav>
    )
}

export default SideBarMobile;