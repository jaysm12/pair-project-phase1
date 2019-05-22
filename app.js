const express = require('express')
const app = express()
const routerHome = require('./routes/routerHome')
const routerAboutus = require('./routes/routerAboutus')
const routerMarketplace = require('./routes/routerMarketplace')
const routerStudent = require('./routes/routerStudent')
const routerInstructor = require('./routes/routerInstructor')
const port = 3000

app.set("view engine", "ejs")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routerHome)
app.use('/aboutus', routerAboutus)
app.use('/marketplace', routerMarketplace)
app.use('/student', routerStudent)
app.use('/instructor', routerInstructor)

app.get('/*', (req, res) => {
  res.render('error')
})

app.listen(3000, () => console.log(`Server running in port : ${port}!`))