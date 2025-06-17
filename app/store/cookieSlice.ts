import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type libraryState = {
  sessionId: string | null;
}

const initialState: libraryState = {
  sessionId: null,
}

export const cookieSlice = createSlice({
  name: 'cookie',
  initialState,
  reducers: {
    setSessionId: (state, action: PayloadAction<string | null>) => {
      state.sessionId=action.payload;
    },
  },
})

export const {setSessionId} = cookieSlice.actions;

export default cookieSlice.reducer;