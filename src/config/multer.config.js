import multer from "multer";
import path from "path";
import fs from "fs";

const ensureUploadsFolder = (folderName, folderPath) => {
  const targetPath = path.join(folderPath, folderName);

  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  return targetPath;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = ensureUploadsFolder(
      "products",
      path.join(process.cwd(), "uploads")
    );

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(
      null,
      `${file.fieldname}-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}${ext}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, and WEBP are allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
