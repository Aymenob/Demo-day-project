const Comment =require("../modules/commentSchema")
const { validationResult } = require('express-validator');

//------------------------------posting a comment
const postComment = async function (req, res) {
   
    const {text,episodes,Owner}=req.body;console.log(text)
    const {id}=req.params;console.log(id)
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
   const commentId = req.params.id
   
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
       const comments = await Comment.find({TrailerId: id}).lean().populate({path:"Owner",select:"-Password -__v"}).find({episodes:number})
              return res.status(200).json(comments)
   } catch (err) { return res.status(500).json({ msg: err }) }
}


module.exports = { postComment,deleteComment,getComments,getTrailerComments }