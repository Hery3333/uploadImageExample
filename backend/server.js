import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import Upload from './models/uploadModel.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('Connected to database')
}).catch(err => console.log(err.message))

//Create Server
const app = express();
app.use(express.json())
app.use(cors())

//get all data
app.get("/all", async(req,res) => {
    try {
        const images = await Upload.find({}).sort({_id: -1});
         res.status(200).json(images)
    } catch (error) {
         res.status(404).json({message: "Error occured when fetching data"})
    }
})

//add data
app.post("/", async(req,res) => {
    try {
        const {title,image} = req.body
        const createImages = {
            title, image
        }
        if(createImages){
            const newImages = await Upload.create(createImages)
            res.status(201).json(newImages);
        }

    } catch (error) {
        return res.status(404).json({message: "Error occured while posting data"})
    }
})


const port = process.env.PORT || 5000

app.listen(port,() =>{
    console.log(`server running on port: ${port}`)
})