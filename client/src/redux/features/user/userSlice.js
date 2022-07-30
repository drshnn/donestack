import { createSlice } from "@reduxjs/toolkit";
import { register,login } from "./userAction";

const user = localStorage.getItem('user') || null


const initialState = {
    isLoading:false,
    user,
    error:null,
    succss:false
}

const userSlice = createSlice({
name:'user',
initialState,
reducers:{},
extraReducers:{
  //for user Regsteration
    [register.pending]: (state) => {
      state.isLoading = true
    },
    [register.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.success = true // registration successful
      state.user = payload

    },
    [register.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
      state.user = null
    },
  //for user Login
  [login.pending]:(state)=>{
    state.isLoading=true
    state.error = null
  },
  [login.fulfilled]: (state,{payload}) =>{
    state.isLoading = false
    state.success = true
    state.user = payload
  },
  [login.rejected]:(state,{payload})=>{
    state.isLoading=false
    state.error = payload
    state.user = null
  }


}
})


export default userSlice.reducer;
