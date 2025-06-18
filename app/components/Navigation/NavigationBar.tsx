import StoreProvider from "@/store/StoreProvider";
import SideBar from "./SideBar";
import logo from '@/public/logo.png';
import { NavLink } from "react-router";
import { useAppSelector } from "~/store/hook";

const NavigationBar: React.FC = () =>{
    const sessionToken = useAppSelector((state) => state.cookie.sessionId);

    return (
        <StoreProvider>
            <div className= {`flex justify-start sticky w-full h-20 border-b-2 border-zinc-400/50`}>
                {!sessionToken || sessionToken.length === 0 && (
                    <nav>
                        <SideBar/>
                    </nav>
                )}
                <div className="flex flex-row items-center">
                    <NavLink to="/">
                        <img src={logo} alt="logo" className="h-24 w-48" />
                    </NavLink>
                    <p className="font-bold text-2xl font-bebas ">StreamPulse Notes</p>
                </div>
                <div></div>
            </div>
        </StoreProvider>
    )
}

export default NavigationBar;