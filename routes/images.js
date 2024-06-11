import express from 'express'
import {Image} from '../models/Image.js'
const router = express.Router()

//configuracoes da rotas 
router.post('/', async (req, res) =>{
    try{
        const {caption} = req.body
        const newImage = new Image ({
            caption, 
            filename: req.file.filename,
        })
        await newImage.save()
        res.json(newImage)
    }catch (err) {
        res.status(500).send('erro no servidor')
    }
}) 

router.get('/', async (req,  res) =>{
    try{
        const images = await Image.find()
        res.json(images)
    }catch (err) {
        res.status(500).send('erro no servidor!')
    }


})


router.put('/:id', async (req, res) =>{
    try{
        const {caption} = req.body
        const updatedImage = await Image.findByIdAndUpdate(
            req.params.id,
            {caption},
            {new: true}
        )
        res.json(updatedImage)
    }catch (err) {
        res.status(500).send('erro no servidor!')
    }
})

router.delete('/:id',async (req, res) =>{
    try{
        await Image.findByIdAndDelete(req.params.id)
        res.json({msm: 'imagem removida'})
    }catch (err){
        res.status(500).send('erro  no servidor')
    }

    
})

export default router