let express = require('express')
let router = express.Router()

let multer = require('multer')
const path = require('path')
const { unlink } = require('fs-extra')
const uuid = require('uuid/v4')
const { ensureAuthenticated } = require('../helpers/auth')

const UserPhoto = require('../models/user')

const storage = multer.diskStorage({
    destination: path.join('./public/img/photo'),
    filename: (req, file, cb, filename) => {
        // console.log(file)
        cb(null, uuid() + path.extname(file.originalname))
    }
})

const upload = multer({storage})

router.post('/profil', ensureAuthenticated,upload.single('photo') , async (req, res) => {
    const us = req.user.id
    console.log(us)
    const photo = new UserPhoto()
    photo.filename = req.file.filename
    photo.originalname = req.file.originalname
    photo.mimetype = req.file.mimetype
    photo.path = '/img/photo/' + req.file.filename
    photo.size = req.file.size
    photo.user = us
    await photo.save()
    res.redirect('/profil')
})

router.get('/photo/:id',ensureAuthenticated, async (req, res) => {
    const { id } = req.params
    const photo = await UserPhoto.findById(id)
    res.render('photo', { photo })
})

router.get('/photo/:id/delete', ensureAuthenticated,async (req, res) => {
    const { id } = req.params
    const photoDeleted = await UserPhoto.findByIdAndDelete(id)
    await unlink(path.resolve('public' + photoDeleted.path))  
    res.redirect('/')
})

// router.post('/photo/:id',ensureAuthenticated, (req, res) => {
//     console.log(UserPhoto)
//     var id = req.params.id
//     storage.findById({_id: id}, {
//         filename : req.file.filename,
//         originalname : req.file.originalname,
//         mimetype : req.file.mimetype,
//         path : req.file.path,
//         size : req.file.size
//     }, (err, numRowAffected, rawResponse)=>{
//         if (err) {
//             throw err
//         }
//         res.redirect('profil')
//     })
// })
module.exports = router