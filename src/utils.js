import { fileURLToPath  } from 'url'
import { dirname } from 'path'
import multer from 'multer'


export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
})
export const uploader = multer({storage:storage})
