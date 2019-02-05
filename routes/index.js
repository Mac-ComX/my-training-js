let express = require('express')
let router = express.Router()


const multer = require('multer')
const path = require('path')
const { unlink } = require('fs-extra')
const uuid = require('uuid/v4')

const Image = require('../models/Image')
const UserPhoto = require('../models/user')

const storage = multer.diskStorage({
    destination: path.join('./public/img/uploads'),
    filename: (req, file, cb, filename) => {
        //  console.log(file)
        cb(null, uuid() + path.extname(file.originalname))
    }
})

const upload = multer({storage})

const { ensureAuthenticated } = require('../helpers/auth')

//Get Homepage
router.get('/', ensureAuthenticated, async (req, res) => {
    const photo = await UserPhoto.findOne({user: req.user.id}).sort({ field: 'asc', _id: -1 }).limit(1)
    const images = await Image.find({user: req.user.id})
    res.render('index',  {photo:photo, images:images})
})

router.get('/profil', ensureAuthenticated, async (req, res) => {
    const photo = await UserPhoto.findOne({user: req.user.id}).sort({ field: 'asc', _id: -1 }).limit(1)
    const images = await Image.find()
    res.render('profil',  {photo, images })
})


router.post('/upload', ensureAuthenticated,upload.single('image'), async (req, res) => {
    var test = req.user.id
    console.log(test)
    const image = new Image()
    image.title = req.body.title
    image.description = req.body.description
    image.filename = req.file.filename
    image.path = '/img/uploads/' + req.file.filename
    image.originalname = req.file.originalname
    image.mimetype = req.file.mimetype
    image.size = req.file.size
    image.user = req.user.id
    await image.save()
    res.redirect('/')
})

router.get('/image/:id',ensureAuthenticated, async (req, res) => {
    const { id } = req.params
    const image = await Image.findById(id)
    res.render('image', { image })
})

router.get('/image/:id/delete',ensureAuthenticated, async (req, res) => {
    const { id } = req.params
    const imageDeleted = await Image.findByIdAndDelete(id)
    await unlink(path.resolve('public' + imageDeleted.path))
    
    res.redirect('/')
})

module.exports = router