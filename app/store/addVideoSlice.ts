import { asyncThunkCreator, createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from './withTypes'

import isValidURL from '@/validation/urlValidator'

import { MESSAGE_EMPTY_URL, MESSAGE_NOT_YOUTUBE_URL } from '~/constants/constants'

export const addVideoToLibrary = createAppAsyncThunk('addVideo/AddVideoToLibrary', async (url:string, {rejectWithValue}) =>{

})

type addVideoState = {
  url: string,
  status: 'idle' | 'pending' | 'fulfiled' | 'rejected',
  error: string | null
}

const initialState: addVideoState = {
  url:"",
  status:'idle',
  error: null
}

export const addVideoSlice = createSlice({
  name: 'addVideo',
  initialState,
  reducers: {
    setURL: (state, action:PayloadAction<string>) => {
      state.url = action.payload;
    },
    setError: (state, action:PayloadAction<string>) => {
      state.error = action.payload;
    },
    resetState: (state) => {
        state.url = "";
        state.status = 'idle';
        state.error = null;
    },
   },
  extraReducers:(builder) => {
    builder
      .addCase(
      addVideoToLibrary.pending, (state, action)=>{
        state.status = 'pending';
      })
      .addCase(addVideoToLibrary.fulfilled, (state, action)=>{
        state.status = 'fulfiled';
      }).addCase(addVideoToLibrary.rejected, (state, action)=>{
        state.status = 'rejected';
        state.error = action.error.message ?? 'Unknown Error';
      })

  }
})

export const {setURL, setError, resetState} = addVideoSlice.actions;

export default addVideoSlice.reducer;