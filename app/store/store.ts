import { configureStore } from '@reduxjs/toolkit'
import sideBarReducer from './sideBarSlice'
import libraryReducer from './librarySlice'
import addVideoReducer from './addVideoSlice'

const store = configureStore({
  reducer: {
      sideBar:sideBarReducer,
      library:libraryReducer,
      addVideo:addVideoReducer
  },
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch