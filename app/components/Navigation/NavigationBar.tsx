import StoreProvider from "@/store/StoreProvider";
import SideBar from "./SideBar";
import logo from '@/public/logo.png';

const NavigationBar: React.FC = () =>{
    return (
        <StoreProvider>
            <div className= {`flex justify-start sticky w-full h-20 border-b-2 border-zinc-400/50`}>
                <nav>
                    <SideBar/>
                </nav>
                <div className="flex flex-row items-center ml-20">
                    <img src={logo} alt="logo" className="h-24 w-48" />
                    <p className="font-bold text-2xl font-bebas ">StreamPulse Notes</p>
                </div>
                <div></div>
            </div>
        </StoreProvider>
    )
}

export default NavigationBar;