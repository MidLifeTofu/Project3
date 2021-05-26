const express = require('express')
const app = express()
const port = 3000
const data = require('./data.js')

app.get('/', (req, res) => {
    res.send('Welcome to our schedule website')
})

app.get('/users', (req, res) => {
    console.log(data.users)
})

app.get('/schedules', (req, res) => {
    console.log(data.schedules)
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)

})