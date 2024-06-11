import mongoose from "mongoose";


const ImageSchema = new mongoose.Schema({
    caption:{
        type: String,
        required: true,
    },
    filename:{
        type: String,
        required: true,
    }
    
})

const Image = mongoose.model('Image', ImageSchema)
export  {Image}