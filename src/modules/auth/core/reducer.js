import { createSlice } from '@reduxjs/toolkit';
import { getAuth } from '../authHelper';

const initialState = {
  user : {},
  userPermission : [],   
  isAuth : getAuth()

};

const authSlice = createSlice({

  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
    },
    rememberAuth : (state , action) => {
      state.user = action.payload.user.data
      state.isAuth = action.payload.token
    },
    logout: (state) => {
      state.user = {}
      state.userPermission = []
      state.isAuth = false
      localStorage.removeItem('token')
    },
    storePermission : (state , action) => {
      state.userPermission = action.payload
    }
    ,
    setisAuth : (state , action) => {
      state.isAuth = action.payload
    }
  },
});

export const { login, logout  ,storePermission ,rememberAuth , setisAuth } = authSlice.actions;
export default authSlice.reducer;
