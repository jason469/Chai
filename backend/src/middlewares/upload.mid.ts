const multer = require('multer')

// Multer File upload settings
const DIR = './public/media';
const storage = multer.diskStorage({
    destination: (req:Request, file:any, cb:any) => {  // Specify where to store the file
        cb(null, DIR);
    },
    filename: (req:Request, file:any, cb:any) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

// Middleware upload object
const uploadMid = multer({
    storage: storage,  // Defines storage limits
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req:Request, file:any, cb:any) => {  // MIME type validation
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

module.exports = uploadMid;