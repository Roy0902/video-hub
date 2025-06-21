import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from './withTypes'
import { validateYouTubeUrl, extractVideoId } from '@/validation/urlSchema'
import { MESSAGE_NOT_YOUTUBE_URL } from '@/constants/constants'

export const addVideoToLibrary = createAppAsyncThunk('addVideo/AddVideoToLibrary', async (url: string, { rejectWithValue }) => {
  try {
    const validation = validateYouTubeUrl(url);
    
    if (!validation.isValid) {
      return rejectWithValue(validation.error || MESSAGE_NOT_YOUTUBE_URL);
    }

    // Extract video ID for further processing
    const videoId = extractVideoId(url);
    if (!videoId) {
      return rejectWithValue('Could not extract video ID from URL');
    }

    
    return { url, videoId };
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to add video');
  }
})

type addVideoState = {
  url: string,
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected',
  error: string | null,
  videoId: string | null
}

const initialState: addVideoState = {
  url: "",
  status: 'idle',
  error: null,
  videoId: null
}

export const addVideoSlice = createSlice({
  name: 'addVideo',
  initialState,
  reducers: {
    setURL: (state, action: PayloadAction<string>) => {
      state.url = action.payload;

      if (state.error) {
        state.error = null;
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    resetState: (state) => {
      state.url = "";
      state.status = 'idle';
      state.error = null;
      state.videoId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addVideoToLibrary.pending, (state, action) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(addVideoToLibrary.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.videoId = action.payload.videoId;
        state.error = null;
      })
      .addCase(addVideoToLibrary.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message ?? 'Unknown Error';
      })
  }
})

export const { setURL, setError, resetState } = addVideoSlice.actions;

export default addVideoSlice.reducer;