const mongoose = require("mongoose")
const Schema = mongoose.Schema

const MomentSchema = new Schema({
   
    caption:{
        type:String,
        required:true,
        
    },
    description:{
        type:String,
        required:true,

    },
    tag:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:""
    }

},{timestamps:true})
module.exports = mongoose.model("Moment", MomentSchema)