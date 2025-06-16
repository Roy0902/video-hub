import { configureStore } from '@reduxjs/toolkit'
import sideBarReducer from './sideBarSlice'
import libraryReducer from './librarySlice'

const store = configureStore({
  reducer: {
      sideBar:sideBarReducer,
      library:libraryReducer,
  },
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch