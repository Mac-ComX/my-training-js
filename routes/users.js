let express = require('express')
let router = express.Router()
let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy
let randomstring = require('randomstring')

let User = require('../models/user')
let mailer = require('../helpers/mailer')

//Register
router.get('/register', function (req, res) {
    res.render('login')
})

//Login
router.get('/login', function (req, res) {
    res.render('login')
})

//Register User
router.post('/register', function (req, res) {
    var name = req.body.name
    var email = req.body.email
    var username = req.body.username
    var password = req.body.password
    var password2 = req.body.password2
    var Token = randomstring.generate()
    var active = false

    //Validation
    req.checkBody('name', 'Name is required').notEmpty()
    req.checkBody('email', 'Email is required').notEmpty()
    req.checkBody('email', 'Email is not valid').isEmail()
    req.checkBody('username', 'Username is required').notEmpty()
    req.checkBody('password', 'Password is required').notEmpty()
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password)

    var errors = req.validationErrors()

    if (errors) {
        res.render('login', {
            errors: errors
        })
    } else {
        let newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password,
            Token: Token,
            active: active
        })

        User.createUser(newUser, function (err, user) {
            if (err) throw err
            // console.log(user)
        })

        link = "http://" + req.get('host') + "/users/verify?id=" + Token
        //localhost:8000/verify?id=jyHxUah8I8WuAYtHHFLr5xoOeEqaSoG1

        // Compose email
        const html = `Hi there ${name},
            <br/>
            Thank you for registering!
            <br/><br/>
            Please check your email by clicking on the following link:
            <br/>
            On the following page:
            <a href="${link}">http://localhost:8000/users/verify</a>
            <br/><br/>
            Have a pleasant day.`
        // Send email
        mailer.sendEmail('admin@gmail.com', req.body.email, 'Please verify your email!', html);

        req.flash('success_msg', 'You are registered and can now login')

        res.redirect('/users/login')
    }
})

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.getUserByUsername(username, function (err, user) {
            if (err) throw err
            if (!user) {
                return done(null, false, {
                    message: 'Unknown User'
                })
            }
            // console.log(user.active)

            User.comparePassword(password, user.password, function (err, isValid) {
                if (err) throw err
                if (!isValid) {
                    return done(null, false, {message: 'Invalid password'})
                }
                if (!user.active) {
                    return done(null, false, {message: 'Active email'})
                }
                return done(null, user)
            })
        })
    }))

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    }),
    function (req, res) {
        res.redirect('/')
    })

router.get('/deconnect', function (req, res) {
    req.logout()

    req.flash('success_msg', 'You are logged out')

    res.redirect('/users/login')
})


module.exports = router