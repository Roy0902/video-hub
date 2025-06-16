import { useAppSelector, useAppDispatch } from "@/store/hook"
import { setAddVideo } from "@/store/librarySlice";
import { MdVideoLibrary } from "react-icons/md"

import AddVideo from "./AddVideo";

const EmptyLibrary: React.FC = () =>{
    const addVideo = useAppSelector(state=>(state.library.addVideo));
    const dispatch = useAppDispatch();

    return(
        <div className={`w-[95%] min-h-full p-4 m-4 flex flex-col gap-4 items-center`}>
            <MdVideoLibrary size={50}/>
            <p className="text-4xl font-bold">Your library is empty</p>
            <p className="text-xl text-gray-400">To start your learning, add the first video to the library.</p>
            <button type="button" 
                className="w-[25%] my-4 mx-10 py-3 px-4 text-white bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center">
            <p className="font-bold text-2xl" onClick={()=> dispatch(setAddVideo(true))}>Add Your First Video</p>       
        </button>
        {addVideo?<AddVideo/>:""}
        </div>
    )
}

export default EmptyLibrary