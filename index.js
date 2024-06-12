import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";


import mongoose from "mongoose";
import multer from "multer";
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

//configuração do middlewere
app.use(cors());
app.use(express.json());
app.use(cors({ origin: 'https://genuine-zabaione-d0ba71.netlify.app/' }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//configuração do mongoose
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('mongoDB conectado'))
  .catch(err => console.log(err))

//confihuração do multer

const storage = multer.diskStorage({
  destination: (req,  file, cb) =>{
    cb(null, 'uploads/')
  },
  filename: (req, file,cb) =>{
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({storage})

//configuração das Rotas
import imageRoutes from "./routes/images.js";
app.use("/api/images", upload.single('image'), imageRoutes);

app.get("/", (req, res) => {
  res.send("hello world!");
});
app.listen(PORT, () => {
  console.log(` servidor rodando na porta ${PORT}`);
});
