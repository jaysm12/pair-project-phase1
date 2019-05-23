const express = require('express')
const app = express()
const session = require('express-session')

const routerHome = require('./routes/routerHome')
const routerAboutus = require('./routes/routerAboutus')
const routerMarketplace = require('./routes/routerMarketplace')
const routerStudent = require('./routes/routerStudent')
const routerInstructor = require('./routes/routerInstructor')

const port = process.env.PORT || 3000
const capitalize = require('./helpers/capitalize')

app.set("view engine", "ejs")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'rahasia umum',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    maxAge: 6000000, 
  }
}))

app.use('/', routerHome)
app.use('/instructor', routerInstructor)
app.use('/aboutus', routerAboutus)
app.use('/marketplace', routerMarketplace)

app.use((req, res, next) => {
  res.locals.capitalize = capitalize
  next()
})

app.use('/student', routerStudent)

app.get('/*', (req, res) => {
  res.render('error')
})

app.listen(3000, () => console.log(`Server running in port : ${port}!`))