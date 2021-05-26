const express = require('express')
const app = express()
const port = 3000
const data = require('./data.js')

// Step 1
app.get('/', (req, res) => {
    res.send('Welcome to our schedule website')
})

app.get('/users', (req, res) => {
    console.log(data.users)
})

app.get('/schedules', (req, res) => {
    console.log(data.schedules)
})

// Step 2


// Step 3
app.get('/users/:id/schedules', (req, res) => { //change id param to only digits - tdl
    const id = Number(req.params.id)
    let schedules = []

    for (let i = 0; i < data.schedules.length; i++) {
        let currentSchedule = data.schedules[i]
        if (currentSchedule.user_id === id) {
            schedules.push(currentSchedule)
        }
    }
    res.send(schedules)
})


// Step 4

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)

})