import { useAppDispatch } from "@/store/hook";
import { setAddVideo } from "@/store/librarySlice";

import isValidURL from "@/validation/urlValidator"
import { useState } from "react";

import { RxVideo } from "react-icons/rx";

const AddVideo: React.FC =() =>{
    const dispatch = useAppDispatch();
    const [validURL, setValidURL] = useState(true);
    const [errorMessage, setErrorMessage] = useState();

    return(
        <div className="flex flex-col justify-start">
            <div className={`fixed inset-0 bg-black/75 z-10`} onClick={() => dispatch(setAddVideo(false))}/>       
            <div className="w-[25%] h-[32%] z-20 bg-[#1e293b] bg-opacity-100 rounded-3xl p-4 fixed start-[50%] left-[50%] -translate-[50%]">
                <div className="flex flex-row pb-2 mb-2 items-center justify-start gap-4 border-b-2 border-gray-400">
                    <RxVideo size={50} className="ml-4" />
                    <p className="font-bold text-2xl">Add to Library</p>

                </div>
                <form>
                    <label htmlFor="url" className="text-lg text-gray-400/90"><p className="my-3">YouTube URL</p></label>
                    <input
                            placeholder="https://www.youtube.com/"
                            type="url"
                            value={inputURL.url}
                            className="flex h-10 w-full my-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    <p className={`my-1 ml-1 text-lg text-red-600 ${!validURL?'visible':'invisible'}`}>{errorMessage}</p>
                    <div className="flex flex-row justify-end mt-8">
                        <button type="button" 
                                className="w-30 mx-4 py-3 px-4 flex-none text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-lg text-sm text-center"
                                onClick={() => dispatch(setAddVideo(false))}>
                                <p>Cancel</p> 
                        </button>
                        <button type="button" 
                                className="w-30 mx-4 py-3 px-4 flex-none text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center"
                                onClick={()=> addVideo()}>
                                <p>Add</p> 
                        </button>
                    </div>
                </form>
            </div>
        </div>)
}

export default AddVideo;

