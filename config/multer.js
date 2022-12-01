const multer = require("multer");

const movieStorage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, "./public/images/movies") },
    filename: function (req, file, cb) { cb(null, file.originalname) }
})
const movieUpload = multer({ storage: movieStorage });


const sliderStorage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, "./public/images/slider") },
    filename: function (req, file, cb) { cb(null, file.originalname) }
})
const sliderUpload = multer({ storage: sliderStorage });

module.exports = { movieUpload, sliderUpload };


