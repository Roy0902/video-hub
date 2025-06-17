import type { SideBarItem } from "app/types/SideBarItem";
import { MdVideoLibrary } from "react-icons/md";
import { TbNotes } from "react-icons/tb";
import { FaHistory } from "react-icons/fa";


export const sideBarItems: SideBarItem[] = [
  { icon: <MdVideoLibrary size={35}/>, 
    title: 'Library', 
    route: '/library' },
  { icon: <TbNotes  size={35}/>, 
    title: 'Notes', 
    route: '/notes' }, 
  { icon: <FaHistory  size={35}/>, 
    title: 'History', 
    route: '/history' }, 
]

export const MESSAGE_EMPTY_URL:string="Please enter the YouTube URL"
export const MESSAGE_NOT_YOUTUBE_URL:string="Invalid YouTube URL"