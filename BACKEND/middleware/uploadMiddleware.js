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
  params: (req, file) => {
    let folder = 'floxynails/generici'; 
    let resource_type = 'auto'; 
    if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
      folder = 'floxynails/media';
    } else if (file.mimetype.includes('pdf') || file.mimetype.includes('document')) {
      folder = 'floxynails/cvs';
      resource_type = 'raw';
    }

    return {
      folder: folder,
      resource_type: resource_type,
      allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'mp4', 'mov', 'pdf', 'doc', 'docx'],
    };
  },
});

const upload = multer({ storage: storage });

module.exports = upload;