import StoreProvider from "@/store/StoreProvider";
import SideBarDesktop from "./SideBarDesktop";
import SideBarMobile from "./SideBarMobile";
import { useMediaQuery } from 'react-responsive';

const SideBar: React.FC = () =>{
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    return(
    <StoreProvider>
      <div>
        {isMobile ? <SideBarMobile/>: <SideBarDesktop/>}
      </div>
    </StoreProvider>
    )
}

export default SideBar;