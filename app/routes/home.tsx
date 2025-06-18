import SideBar from '@/components/Navigation/SideBar'
import { useAppDispatch, useAppSelector } from '@/store/hook';
import EmptyLibrary from '@/components/Library/EmptyLibrary';
import { setSessionId } from '~/store/cookieSlice';
import { Navigate } from 'react-router-dom';

function getSessionTokenFromCookie():string | null {
  const cookieSplit = document.cookie.split('; ').find((row) => row.startsWith('session-id='));
  if(cookieSplit === undefined){
     return null;
  }

  return cookieSplit.split('=')[1];
}

export default function Home() {
  const dispatch = useAppDispatch();
  dispatch(setSessionId(getSessionTokenFromCookie()));
  
  const empty = useAppSelector((state) =>  state.library.empty);
  const sessionToken = useAppSelector((state) => state.cookie.sessionId);

  if(sessionToken === null){
    return<Navigate to="/login" />
  }
  
  return (<div className="w-full h-full flex flex-col flex-1 items-center">
               {empty?<EmptyLibrary/>:""}
          </div>)
}
