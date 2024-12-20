const multer = require("multer");

// Set storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save uploaded files to 'uploads' directory
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Rename file to make it unique (adding timestamp)
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// File filter to ensure only images are uploaded
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const isValidFile = allowedFileTypes.test(file.mimetype);

  if (isValidFile) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, JPG, and PNG files are allowed."), false);
  }
};

// Multer upload setup
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
});

module.exports = upload;
