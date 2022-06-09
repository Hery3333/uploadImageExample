import mongoose from "mongoose";

const uploadSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true //for date
})

const Upload = mongoose.model('Upload', uploadSchema)

export default Upload;