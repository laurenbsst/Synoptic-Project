const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const users = require('./info')
const fs = require('fs')


app.use(express.static(__dirname + '/public'));

const initPP = require('./passport') //initialize passport
initPP( //initialise passport
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

app.engine('html', require('ejs').renderFile)
app.use(express.urlencoded({ //access forms within request in post methods
    extended: false 
}))
app.use(flash()) //allows messages to appear on screen (for emai and password not recognised in this case)
app.use(session({
    secret: 'sidjaidj', //hides credentials in environment variable - loads from here
    resave: false, //dont reset the session cookie
    saveUninitialized: false //dont store uninitialized data in session store
}))
app.use(passport.initialize()) //initialize passport
app.use(passport.session()) //alters req object and changes user value into a deserialized user object
app.use(methodOverride('_method'))

app.get('/', checkAuth, (req, res) => {
    res.render('home.html') //render index page
  })

app.get('/login', checkNotAuth, (req, res) => {
  res.render('log-in.html') //render index page
})

app.post('/login', checkNotAuth, passport.authenticate('local', {
  successRedirect: '/', //if successful redirect to /
  failureRedirect: '/login',//if unsuccessful redirect to /login (same page)
  failureFlash: true //shows flash message
}))

app.get('/register', checkNotAuth, (req, res) => {
    res.render('sign-up.html') //render register
})
  
app.post('/register', checkNotAuth, async (req, res) => {
    try {
      const EncryptedPassword = await bcrypt.hash(req.body.password, 5) //encrypt users password cost factor of 5
      users.push({
        id: Date.now().toString(), //unique id for each user - todays date
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email, //accesses the data from JSON - email
        normpassword: req.body.password, //" " - password
        password: EncryptedPassword,//" " - encrypted version of the password
      })
      console.log(Date.now().toString()) //display id on console
      console.log(req.body.email) //display email on console
      console.log(req.body.password) //display password on console
      console.log(EncryptedPassword) //display encrypted password on console
      
      res.redirect('/login') //redirect to the login page
      } catch {
      res.redirect('/register') //redirect to register if it doesnt work
    }
    fs.writeFile("info.json", JSON.stringify(users), err => {
      if (err){
          throw err
      }
      console.log("Written")
    })
    /*fs.readFile('./public/assets/man-laptop.jpg', function(err, data) {
      if (err) throw err // Fail if the file can't be read.
      http.createServer(function(req, res) {
        res.writeHead(200, {'Content-Type': 'image/jpeg'})
        res.end(data) // Send the file data to the browser.
      })
  })*/
})


app.get('/explore-page', (req, res) => {
    res.render('explore-page.html') //render index page
})

app.get('/main-feed', (req, res) => {
    res.render('main-feed.html', {name: req.user.firstName}) //render index page
})

app.get('/support', (req, res) => {
  res.render('support.html')
})

app.delete('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) { //check authentication
    return next()
  }
  res.redirect('/login') //redirect to login page
}
  
function checkNotAuth(req, res, next) {
  if (req.isAuthenticated()) { //if authenticated
    return res.redirect('/') //redirect to home page
  }
  next()
}

app.listen(3000)