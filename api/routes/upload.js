import express from "express";
import multer from "multer";
import { fileURLToPath } from 'url';
import path from 'path';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Correctly navigate from 'api/routes' up to the root, then to 'client/public/upload'
    const uploadPath = path.join(__dirname, '../../../client/public/upload');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

export default router;

