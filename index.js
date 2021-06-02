// Step 1
const express = require('express')
const app = express()
const port = 3000
//accesses the information in the data.js file
const data = require('./data.js')


//body passer
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

//sets the template to ejs
app.set('view engine', 'ejs')

// sets the public folder to be the start path of public view files
app.use(express.static('public'))


// HOMEPAGE
app.get('/', (req, res) => {
    res.render('index', { //tells you what ejs page to render
    documentTitle: "Schedule Website",
    })
})


// USERS PAGE
app.get('/users', (req, res) => {
    res.render('users', {
        documentTitle: "Schedule Website",
        name: "Jay Porter",
        day: "Wednesday",
        users: data.users,
        //usersLength: data.users.length,
        firstname: data.users[0].firstname,
        lastname: data.users[0].lastname,
        email: data.users[0].email,
    })
})

// SCHEDULES PAGE
app.get('/schedules', (req, res) => {
})


// Step 3 - show data for specific user
app.get('/users/:id', (req, res) => {
    const id = req.params.id
        res.send(data.users[id])
})


app.get('/users/:id/schedules', (req, res) => { 
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


// Step 4 - add in new user or schedule 
app.post('/schedules', (req, res) => {
    data.schedules.push(req.body) //push the respond part into the array
    res.send(req.body)
    // need to make curl request to add: curl -d "user_id=1&day=3&start_at=9AM&end_at=3PM" -X POST localhost:3000/schedules"
})



app.post('/users', (req, res) => {

    const bcrypt = require('bcrypt')
    const saltRounds = 10
    const plainTextPassword = req.body.password
        
        bcrypt.hash(plainTextPassword, saltRounds, (eer, hash) => {
              
            res.send('Password has been hashed')
            console.log(hash)

            const user = req.body
            user['password'] = hash //changes the pasword section of the req.body to the hash
            data.users.push(req.body) //pushes the data with the new password as hash into the users data
        
    })

    })

/* 
app.post('/users', (req, res) => {
    const bcrypt = require('bcrypt')
    const salt = 10
    const data = req.body.password

        data.users.push(req.body)
        bcrypt.hash(data, salt, req.body)       //hash(data, salt, callback)???
}) */



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)

})