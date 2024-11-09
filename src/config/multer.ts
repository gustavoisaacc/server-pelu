import multer from "multer";
import path from "path";
import fs from "fs";

const uploadPath = path.join(__dirname, "../uploads/avatars");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, uploadPath);
  },
  filename: (req, file, next) => {
    next(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, next) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    next(null, true);
  } else {
    next(new Error("El archivo debe ser .jpg o .png"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export const uploadAvatar = upload.single("image");
