const mongoose=require("mongoose")

const Comment=mongoose.Schema({
    text:{ type: String,trim: true,required: true},
    episodes:{type:String,required: true },
    TrailerId:{type:String},
    Owner:{
        type:mongoose.Types.ObjectId,
        ref:"Users"
    },
    likes: [{ type: 'String', unique: true }],
    deslikes: [{ type: 'String', unique: true }]
}, {
    timestamps: true
  })
module.exports=mongoose.model("Commment",Comment)