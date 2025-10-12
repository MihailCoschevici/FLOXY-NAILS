const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error('Credenziali Cloudinary mancanti o non caricate dal file .env!');
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'floxynails', 
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'pdf', 'doc', 'docx'],
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`, 
      resource_type: file.mimetype.includes('pdf') ? 'raw' : 'auto',
    };
  },
});

const upload = multer({ storage });

module.exports = upload;