import { configureStore } from '@reduxjs/toolkit'
import sideBarReducer from '../store/sideBarSlice'

const store = configureStore({
  reducer: {
      sideBar:sideBarReducer
  },
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch