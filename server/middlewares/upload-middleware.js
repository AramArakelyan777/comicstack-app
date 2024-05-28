const multer = require("multer")
const path = require("path")
const crypto = require("crypto")

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/
    const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
    )
    const mimetype = fileTypes.test(file.mimetype)

    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb(new Error("Invalid file type. Only JPEG, JPG, and PNG are allowed."))
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 15 }, // 5MB limit
})

module.exports = upload
