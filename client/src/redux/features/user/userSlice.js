import { createSlice } from "@reduxjs/toolkit";
import { register } from "./userAction";

const initialState = {
    isLoading:false,
    user:null,
    error:null,
    succss:false
}

const userSlice = createSlice({
name:'user',
initialState,
reducers:{},
extraReducers:{
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


}
})


export default userSlice.reducer;
