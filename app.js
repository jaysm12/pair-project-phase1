const express = require('express')
const app = express()
// const session = require('express-session')

const routerHome = require('./routes/routerHome')
const routerAboutus = require('./routes/routerAboutus')
const routerMarketplace = require('./routes/routerMarketplace')
const routerStudent = require('./routes/routerStudent')
const routerInstructor = require('./routes/routerInstructor')

const port = 3000

app.set("view engine", "ejs")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set session
// app.set('trust proxy', 1) // trust first proxy
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { 
//     maxAge: 600000,
//     secure: true }
// }))

// app.use((req, res, next) => {
//   if (req.cookies.user_sid && !req.session.user) {
//       res.clearCookie('user_sid');        
//   }
//   next();
// });

// var sessionChecker = (req, res, next) => {
//   if (req.session.user && req.cookies.user_sid) {
//     res.redirect('/dashboard');
//   } else {
//     next();
//   }    
// };

app.use('/', routerHome)
app.use('/instructor', routerInstructor)
app.use('/aboutus', routerAboutus)
app.use('/marketplace', routerMarketplace)
app.use('/student', routerStudent)

app.get('/*', (req, res) => {
  res.render('error')
})

app.listen(3000, () => console.log(`Server running in port : ${port}!`))