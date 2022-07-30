import { createSlice } from "@reduxjs/toolkit";
import { getUserDetails,register,login } from "./userAction";

const userToken= localStorage.getItem('userToken') || null


const initialState = {
    isLoading:false,
    userToken,
    user:null,
    error:null,
    success:false
}

const userSlice = createSlice({
name:'user',
initialState,
reducers:{
 reset:(state)=>{
  state.isLoading= false
  state.success = false
  state.error =null
  }
},
extraReducers:{
  //for user Regsteration
    [register.pending]: (state) => {
      state.isLoading = true
    },
    [register.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.success = true // registration successful
      state.userToken = payload.token
      state.user = payload.userData

    },
    [register.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
      state.user = null
      state.token = null
      state.success=false
    },
  //for user Login
  [login.pending]:(state)=>{
    state.isLoading=true
    state.error = null
  },
  [login.fulfilled]: (state,{payload}) =>{
    state.isLoading = false
    state.success = true
    state.userToken = payload.token
    state.user = payload.userData
  },
  [login.rejected]:(state,{payload})=>{
    state.isLoading=false
    state.error = payload
    state.user = null
    state.userToken = null
  },
  //get user Details
  [getUserDetails.pending]: (state) => {
      state.isLoading = true
    },
    [getUserDetails.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.user = payload
      state.success = true
    },
    [getUserDetails.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.success=false
    },


}
})

export const {reset} = userSlice.actions;
export default userSlice.reducer;
