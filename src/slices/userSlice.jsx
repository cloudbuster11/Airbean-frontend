import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    role: null,
    name: null,
    email: null,
    userName: null,
    imgUrl: null,
    latestOrderId: null,
  },
  reducers: {
    setUser(state, action) {
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.imgUrl = action.payload.imgUrl;
    },
    setUserImgUrl(state, action) {
      state.imgUrl = action.payload.imgUrl;
    },
    setName(state, action) {
      state.name = action.payload.name;
    },
    setLatestOrderId(state, action) {
      state.latestOrderId = action.payload.latestOrderId;
    },
    clearUser(state) {
      state.isAuthenticated = false;
      state.role = null;
      state.name = null;
      state.email = null;
      state.userName = null;
      state.imgUrl = null;
      state.latestOrderId = null;
    },
  },
});

export const { setUser, setUserImgUrl, setLatestOrderId, setName, clearUser } = userSlice.actions;
