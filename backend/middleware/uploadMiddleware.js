// backend/middleware/uploadMiddleware.js
import multer from "multer";
import path from "path";
import fs from "fs";

// ensure uploads folder exists
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

/*
  Storage config: save files to /uploads with a timestamp + original name
*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    cb(null, `${Date.now()}_${name}${ext}`);
  },
});

// File filter: allow only images
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpeg, jpg, png, gif)"), false);
  }
};

const limits = {
  fileSize: 5 * 1024 * 1024, // 5 MB
};

export const upload = multer({ storage, fileFilter, limits });
