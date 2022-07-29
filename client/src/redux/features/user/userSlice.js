import { createSlice } from "@reduxjs/toolkit";
import { register } from "./userAction";

const initialState = {
    loading:false,
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
      state.loading = true
    },
    [register.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true // registration successful
      state.user = payload

    },
    [register.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
      state.user = null
    },
}
})


export default userSlice.reducer;
