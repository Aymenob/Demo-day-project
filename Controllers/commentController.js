const Comment =require("../modules/commentSchema")
const { validationResult } = require('express-validator');

//------------------------------posting a comment
const postComment = async function (req, res) {
   
    const {text,episodes,Owner}=req.body;
    const {id}=req.params;
   try {
      const addComment=await new Comment({episodes:episodes,text:text,TrailerId:id,Owner:Owner})
      const newComment=await addComment.save()
     return res.status(200).json(newComment)
   }
   catch (err) {
      return  res.status(500).json({ msg: err })
   }
}
//------------------------------delete a comment
const deleteComment = async function (req, res) {
   const commentId = req.params.id;console.log(commentId)
   
   try {
       const comment = await Comment.findOneAndDelete({ _id: commentId })
       return res.status(200).json(comment)
   } catch (err) { return res.status(500).json({ msg: err }) }
}
//------------------------------delete a comment
const getComments = async function (req, res) {
   try {
       const comments = await Comment.find({}).populate({path:"Owner",select:"-Password -__v"})
              return res.status(200).json(comments)
   } catch (err) { return res.status(500).json({ msg: err }) }
}
//------------------------------delete a comment
const getTrailerComments = async function (req, res) {
   try {
       const {id,number} = req.params;
       const comments = await Comment.find({TrailerId: id}).lean().populate({path:"Owner",select:"-Password -__v"}).find({episodes:number}).sort({rate:-1 })
              return res.status(200).json(comments)
   } catch (err) { return res.status(500).json({ msg: err }) }
}
//------------------------------delete a comment
const modifyComment=async function (req,res) {
   const id=req.params.id;console.log(req.body)
   const {text}=req.body
   try {
      const modifiedComment=await Comment.findByIdAndUpdate(id,{text:text})
      return res.status(200).json(modifiedComment)
   } catch (err) {return res.status(500).json({mgs:err})
      
   }
}
//------------------------------toggle Likes
const toggleLike=async function (req,res) {
   const {commentId,userId}=req.params
   
  try {
   const exist2=await Comment.findOne({ _id:commentId ,"deslikes": userId })
   if(exist2){
      
      const toggle1=await Comment.findOneAndUpdate({ _id:commentId }, { $pull: { "deslikes": userId  }},{new:true,timestamps:false})
      const toggle2=await Comment.findOneAndUpdate({ _id: commentId},{$addToSet: { "likes": userId } },{new:true,timestamps:false})
      //const rate=await Comment.findOneAndUpdate({ _id: commentId},{$inc : {'Comments.rate' : 2}} ,{new:true,timestamps:false})
      //exist2.likes.length-exist2.deslikes.length+2
      return res.status(200).json(toggle2)
   }
      const exist=await Comment.findOne({ _id:commentId ,"likes": userId })
      if(exist){
         
         const toggle1=await Comment.findOneAndUpdate({ _id:commentId }, { $pull: { "likes": userId  } },{new:true,timestamps:false})
         return res.status(200).json(toggle1)
      }
      const toggle=await Comment.findOneAndUpdate({ _id: commentId},{$addToSet: { "likes": userId } },{new:true,timestamps:false})
     
      return res.status(200).json(toggle)
   } catch (err) {
      return res.status(500).json({mgs:err})
   }
}
//------------------------------toggle desLikes
const toggleDeslike=async function (req,res) {
  const {commentId,userId}=req.params
   try {
      const exist2=await Comment.findOne({ _id:commentId ,"likes": userId })
      if(exist2){
      
         const toggle1=await Comment.findOneAndUpdate({ _id:commentId }, { $pull: { "likes": userId  } },{new:true,timestamps:false})
         const toggle2=await Comment.findOneAndUpdate({ _id: commentId},{$addToSet: { "deslikes": userId }},{new:true,timestamps:false})

         return res.status(200).json(toggle2)
      }
      const exist=await Comment.findOne({ _id:commentId ,"deslikes": userId })
      if(exist){
         
         const toggle=await Comment.findOneAndUpdate({ _id:commentId }, { $pull: { "deslikes": userId  }},{new:true,timestamps:false})
         return res.status(200).json(toggle)
      }
      const toggle=await Comment.findOneAndUpdate({ _id: commentId},{$addToSet: { "deslikes": userId }},{new:true,timestamps:false})
     
      return res.status(200).json(toggle)
   } catch (err) {
      return res.status(500).json({msg:err})
   }
}
//------------------------------update Rate
const handleRate=async function (req,res) {
   const {commentId,rate}=req.params;
   
   try {
      const modifiedComment=await Comment.findByIdAndUpdate(commentId,{rate:rate},{new:true})
      return res.status(200).json(modifiedComment)
   } catch (err) {return res.status(500).json({mgs:err})
      
   }
}
module.exports = { postComment,deleteComment,getComments,getTrailerComments,modifyComment,toggleLike,toggleDeslike,handleRate}