import { configureStore, type Action, type ThunkAction } from '@reduxjs/toolkit'
import libraryReducer from './librarySlice'
import addVideoReducer from './addVideoSlice'
import cookieSlice from './cookieSlice'

const store = configureStore({
  reducer: {
      library:libraryReducer,
      addVideo:addVideoReducer,
      cookie: cookieSlice,
  },
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action>