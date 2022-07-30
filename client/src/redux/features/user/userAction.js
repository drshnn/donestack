import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = "http://localhost:5000/api/"
export const register = createAsyncThunk(
    'user/register',
    async ({username,email,password},{rejectWithValue})=>{
        try {
           const config = {
            headers:{
                'Content-Type':"application/json"
            },
           }
      const {data}  =   await axios.post(baseURL+'auth/register',{username,email,password},config)
      localStorage.setItem('userToken', data.token)
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

export const login = createAsyncThunk(
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
        baseURL+'auth/login',
        { email, password },
        config
      )
      // store user's token in local storage
      localStorage.setItem('userToken', data.token)
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

export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState()

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      }
      const { data } = await axios.get(baseURL+'private', config)
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
