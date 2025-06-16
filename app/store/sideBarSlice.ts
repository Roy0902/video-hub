import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type sideBarState = {
  open: boolean;
}

const initialState: sideBarState = {
  open: false,
}

export const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    setOpen: (state, action:PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
})

export const {setOpen} = sideBarSlice.actions;

export default sideBarSlice.reducer;