import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"
//........trailers are sorted by UpdateDate and limited at 12
export const getTrailerComments=createAsyncThunk("comments/getTrailerComments",async function (commentINF,{rejectWithValue}) {
    try {  
    const {data}=await axios.get("/getTrailerComments/"+commentINF.TrailerId+"/"+commentINF.number)
    return data
    } catch (err) {
        return rejectWithValue(err.response.data.msg)
    }
})
export const postComment=createAsyncThunk("comments/postComment",async function (commentINF,{rejectWithValue}) {
  try { console.log(commentINF)
    const {data}=axios.post("/postComment"+commentINF.TrailerId,commentINF)
    return data
  } catch (err) {return rejectWithValue(err.response.data.msg) }
})
export const deleteComment=createAsyncThunk("comments/deleteComment",async function (TrailerId,{rejectWithValue}) {
  try { 
    const {data}=axios.delete("/deleteComment"+TrailerId)
    return data
  } catch (err) {return rejectWithValue(err.response.data.msg) }
})
const initialState={
 loading:true,
  errors:null,
  commentErreurs:null,
  Comments:[],
  newComment:null,
  deletedComment:null
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
     
   },
   [postComment.pending]:(state)=>{ state.loading=true},
   [postComment.fulfilled]:(state,{payload})=>{
     state.newComment=payload
    state.loading=false
    
  },
   [postComment.rejected]:(state,{payload})=>{
    state.errors=payload
    state.loading=false
    
  },
  [deleteComment.pending]:(state)=>{ state.loading=true},
  [deleteComment.fulfilled]:(state,{payload})=>{
   state.deletedComment=payload
   state.loading=false
   
 },
  [deleteComment.rejected]:(state,{payload})=>{
   state.errors=payload
   state.loading=false
   
 }
  }
})

  export const {}=commentSlice.actions
  
  export default commentSlice.reducer