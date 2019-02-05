let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
let exphbs = require('express-handlebars')
let expressValidator = require('express-validator')
let flash = require('connect-flash')
let session = require('express-session')
let passport = require('passport')
let localStrategy = require('passport-local').Strategy
let morgan = require('morgan')
require('./database.js')

let indexRoutes = require('./routes/index')
let usersRoutes = require('./routes/users')
let photoRoutes = require('./routes/photo')
let verifyRoutes = require('./routes/verify')

//Initialisation d'App
let app = express()

//Moteur de Vue (views)
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', exphbs({defaultLayout: 'layout'}))
app.set('view engine', 'handlebars')

//BodyParser Middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

// middlewares
// app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))


//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

//Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}))

//Passport init
app.use(passport.initialize())
app.use(passport.session())

// Express Validator
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']'
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    }
  }
}))

//Connect Flash
app.use(flash())

//Locals 
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  res.locals.user = req.user || null
  next()
})

var handlebars = require('handlebars')
handlebars.registerHelper('timeago', require('helper-timeago'))

//Routes 
app.use('/', indexRoutes)
app.use('/', photoRoutes)
app.use('/users', usersRoutes)
app.use('/users', verifyRoutes)

//Set Port
app.set('port', (process.env.PORT || 8000))

app.listen(app.get('port'), () => {
  console.log('Server started sur le port' + app.get('port'))
})