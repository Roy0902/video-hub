import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type libraryState = {
  empty: boolean;
  addVideo: boolean;
}

const initialState: libraryState = {
  empty: true,
  addVideo: false,
}

export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    setEmpty: (state, action: PayloadAction<boolean>) => {
      state.empty=action.payload;
    },
    setAddVideo: (state, action: PayloadAction<boolean>)=>{
      state.addVideo=action.payload;
    }
  },
})

export const {setEmpty, setAddVideo} = librarySlice.actions;

export default librarySlice.reducer;