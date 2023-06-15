const multer = require('multer');

let uploadImage = (carpeta) => {

    const storage = multer.diskStorage({
        destination: `public/images/${carpeta}`,
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null, uniqueSuffix + '-' + file.originalname)
        }
      })

      const upload = multer({ storage: storage }).single("img");

      return upload;
}

module.exports = uploadImage;