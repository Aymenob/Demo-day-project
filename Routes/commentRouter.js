const express=require("express")
const {postComment,getComments,deleteComment,getTrailerComments}=require("../Controllers/commentController")
const router=express.Router()
router.post("/postComment:id",postComment)
router.get("/getComments",getComments)
router.get("/getTrailerComments/:id/:number",getTrailerComments)
router.delete("/deleteComment:id",deleteComment)
module.exports=router