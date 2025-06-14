import { configureStore } from '@reduxjs/toolkit'
import sideBarReducer from '../store/sideBarSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      sideBar:sideBarReducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']