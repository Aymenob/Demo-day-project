const mongoose=require("mongoose")

const Comment=mongoose.Schema({
    text:{ type: String,trim: true,required: true},
    episodes:{type:String,required: true },
    TrailerId:{type:mongoose.Types.ObjectId},
    Owner:{
        type:mongoose.Types.ObjectId,
        ref:"Users"
    }
}, {
    timestamps: true
  })
module.exports=mongoose.model("Commment",Comment)