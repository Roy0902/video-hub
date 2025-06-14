import { createSlice } from '@reduxjs/toolkit'

interface sideBarState {
  open: boolean;
}

const initialState: sideBarState = {
  open: false,
}

export const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    isOpen: (state) => {
      const o = state.open
      state.open = !o;
    },
  },
})

export const {isOpen} = sideBarSlice.actions;

export default sideBarSlice.reducer;