import { createAction } from '@reduxjs/toolkit';

const setUser = createAction('user/setUser');
const setUserImgUrl = createAction('user/setUserImgUrl');
const setLatestOrderId = createAction('user/setLatestOrderId');
const setName = createAction('user/setName');

const clearUser = createAction('user/clearUser');

export { setUser, setUserImgUrl, setLatestOrderId, setName, clearUser };
