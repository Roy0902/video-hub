import { useAppSelector, useAppDispatch } from "@/store/hook"
import StoreProvider from "@/store/StoreProvider"

import EmptyLibrary from "@/components/Library/EmptyLibrary"

function library(){
    const empty = useAppSelector((state) =>  state.library.empty)

    return( 
    <div className="w-full h-full flex flex-col justify-start">
        <button type="button" 
                className="w-35 my-4 mx-10 py-3 px-4 flex-none text-white bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center">
                   <p className="font-bold">+ Add Video</p> 
        </button>
        <div className="w-full h-full flex flex-col flex-1 items-center">
           {empty?<EmptyLibrary/>:""}
        </div>

    </div>)
}

export default library