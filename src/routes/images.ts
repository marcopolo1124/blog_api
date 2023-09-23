import express from "express";
import multer from "multer";
import path from "path";
import crypto from "crypto";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(
            null,
            process.env.GALLERY_PATH
                ? process.env.GALLERY_PATH
                : "../gallery_images"
        );
    },
    filename: (req, file, cb) => {
        const fileName = crypto.randomUUID() + path.extname(file.originalname);
        cb(null, fileName);
        req.fileName = fileName;
    }
});

const upload = multer({ storage: storage });

const images = express.Router();

images.post("/upload", upload.single("image"));

export default images;
