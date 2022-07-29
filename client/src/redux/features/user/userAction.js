import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = "http://localhost:5000/api/auth/"
export const register = createAsyncThunk(
    'user/register',
    async ({username,email,password},{rejectWithValue})=>{
        try {
           const config = {
            headers:{
                'Content-Type':"application/json"
            },
           }
      const {data}  =   await axios.post(baseURL+'register',{username,email,password},config)
      localStorage.setItem('userToken', data.userToken)
      return data
        } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
        }
    }
)

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        '/api/user/login',
        { email, password },
        config
      )
      // store user's token in local storage
      localStorage.setItem('userToken', data.userToken)
      return data
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
