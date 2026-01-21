import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import route from './routes/index.js';
import multer from 'multer';
const app = express();
const PORT = process.env.PORT;
dotenv.config();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }));
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})
const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
})
route(app)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})