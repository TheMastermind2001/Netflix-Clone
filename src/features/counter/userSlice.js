import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';
import { useSearchParams } from 'react-router-dom';

export const userSlice = createSlice({
  name: 'user',
  
  initialState:{
    user: null,
  }, 

  reducers: {
    login:(state,action)=>{
      state.user=action.payload;
    },
    logout:(state)=>{
      state.user=null;
    },
  }
});

export const {login,logout } = userSlice.actions;

export const selectUser=state=>state.user.user;   

//state."user slice check store"."user property"

export default userSlice.reducer;
// export default userSlice;
