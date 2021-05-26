// Step 1
const express = require('express')
const app = express()
const port = 3000
//accesses the information in the data.js file
const data = require('./data.js')

//body passer
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))


// Step 2
app.get('/', (req, res) => {
    res.send('Welcome to our schedule website')
})

app.get('/users', (req, res) => {
    console.log(data.users)
})

app.get('/schedules', (req, res) => {
    console.log(data.schedules)
})


// Step 3
app.get('/users/:id', (req,res) => {
    const id = req.params.id
    let user = []

// go through the users, if the input (/:id) matches the [i] of a user, display their details.
    for (let i = 0; i < data.users.length; i++) {

        if (data.users[i] === id) {      //something is happening these lines to stop it
            console.log(data.users[i])     //from bringing up information found in loop
        }
    }

    console.log(user)               //these lines are only logging [] because info
    res.send(user)                  //from if statement is not logging.

})


app.get('/users/:id/schedules', (req, res) => { //change id param to only digits - tdl
    const id = Number(req.params.id)
    let schedules = []

    for (let i = 0; i < data.schedules.length; i++) {
        let currentSchedule = data.schedules[i]
        if (currentSchedule.user_id === id) {
            schedules.push(currentSchedule)
        }
    }
    console.log(schedules)
    res.send(schedules)
})


// Step 4
app.post('/schedules', (req, res) => {
    data.schedules.push(req.body) //push the respond part into the array
    res.send(req.body)
})

app.post('/users', (req, res) => {
    const plainTextPassword = req.body.password
        console.log(plainTextPassword)
    bcrypt.hash(plainTextPassword, saltRounds, (eer, hash) => {
        res.send('Testing')
    })
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)

})