import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type addVideoState = {
  validURL:boolean;
  errorMessage?:string;
}

const initialState: addVideoState = {
  validURL: true,
}

export const addVideoSlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    setValidURL: (state, action: PayloadAction<boolean>) => {
      state.validURL=action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>)=>{
      state.errorMessage=action.payload;
    }
  },
})

export const {setValidURL, setErrorMessage} = addVideoSlice.actions;

export default addVideoSlice.reducer;