import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: '',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      const { song, data, i } = action.payload;

      state.activeSong = song;
      state.currentSongs = Array.isArray(data) ? data : [];
      state.currentIndex = i ?? 0;
      state.isActive = !!song?.id;
    },

    nextSong: (state, action) => {
      const nextSong = state.currentSongs[action.payload];
      if (nextSong) {
        state.activeSong = nextSong;
        state.currentIndex = action.payload;
        state.isActive = true;
      }
    },

    prevSong: (state, action) => {
      const prevSong = state.currentSongs[action.payload];
      if (prevSong) {
        state.activeSong = prevSong;
        state.currentIndex = action.payload;
        state.isActive = true;
      }
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const {
  setActiveSong,
  nextSong,
  prevSong,
  playPause,
  selectGenreListId,
} = playerSlice.actions;

export default playerSlice.reducer;
