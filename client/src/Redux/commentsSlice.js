import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"
//........trailers are sorted by UpdateDate and limited at 12
export const getTrailerComments=createAsyncThunk("comments/getTrailerComments",async function (commentINF,{rejectWithValue}) {
    try {
        console.log(commentINF)
    const {data}=await axios.get("/getTrailerComments/"+commentINF.TrailerId+"/"+commentINF.number)
    console.log(data[0])
    return data
    } catch (err) {
        return rejectWithValue(err.response.data.msg)
    }
})

const initialState={
 loading:true,
  errors:null,
  commentErreurs:null,
  Comments:[],
  }

  export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
  },
  extraReducers:{
    [getTrailerComments.pending]:(state)=>{ state.loading=true},
    [getTrailerComments.fulfilled]:(state,{payload})=>{
      state.Comments=payload
     state.loading=false
     
   },
    [getTrailerComments.rejected]:(state,{payload})=>{
     state.errors=payload
     state.loading=false
     
   }
  }
})

  export const {}=commentSlice.actions
  
  export default commentSlice.reducer