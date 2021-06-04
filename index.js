const express = require('express')
const app = express()
const port = 3000
const data = require('./data.js') //accesses the information in the data.js file

//body parser for post requests
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

//sets the template to ejs
app.set('view engine', 'ejs')

// sets the public folder to be the start path of public view files
app.use(express.static('public'))



// HOMEPAGE
app.get('/', (req, res) => {
    res.render('index', { //tells you what ejs file to render
    })
})



// USERS PAGE
app.get('/users', (req, res) => {
    res.render('users', {

         /* const inputId = userid(req.body)
         console.log(inputId) */
        //res.redirect(`/users/${id}`)
    })
})



// FRONT END ADD NEW USER
app.get('/users/new', (req, res) => {
    res.render('newuser')
})

app.post('/users/new', (req, res) => {
    data.users.push(req.body)
        const id = data.users.length -1
    res.redirect(`/users/${id}`)
})



// SCHEDULES PAGE
app.get('/schedules', (req, res) => {
})



// FRONT END ADD NEW SCHEDULE
app.get('/schedules/new', (req, res) => {
    
    res.render('newschedule', {
        users: data.users
    })
})

app.post('/schedules/new', (req, res) => {
    const user = {
        user_id: Number(req.body.user_id),
        day: Number(req.body.day),
        start_at: req.body.start_at,
        end_at: req.body.end_at
    }
    data.schedules.push(user)
    console.log(data.schedules)
    
    const id = req.body.user_id
        //const id = document.getElementById('user_id') //how to reference the newschedule.ejs document to get the user_id for the redirection.
        res.redirect(`/users/${id}/schedules`)
        //res.redirect('/users')
})

// USER SPECIFIC (USER INFORMATION) PAGE
app.get('/users/:id', (req, res) => {
    const id = req.params.id
        //console.log(id)
        //res.send(data.users[id])

      res.render('usersid', {
        //usersLength: data.users.length,
        //users: data.users,
        firstname: data.users[id].firstname,
        lastname: data.users[id].lastname,
        email: data.users[id].email,
    }) 
})



// USER SPECIFIC (SCHEDULE) PAGE
app.get('/users/:id/schedules', (req, res) => { 
    const id = Number(req.params.id)
    let schedules = []
        console.log(id)

    for (let i = 0; i < data.schedules.length; i++) {
        let currentSchedule = data.schedules[i]
        if (currentSchedule.user_id === id) {
            schedules.push(currentSchedule)
        }
    }
    /* console.log(schedules)
    res.send(schedules) */

    res.render('userschedule', {
        schedules: schedules,
            // make a const to convert day numbers into day names?
        user_idFirst: data.users[id].firstname, 
        user_idLast: data.users[id].lastname,
        day: data.schedules[id].day,
        start_at: data.schedules[id].start_at,
        end_at:  data.schedules[id].end_at,
        //also need to show if there is more than one shift pesent. use a loop?

    })
})



// BACKEND ADD NEW SCHEDULE 
app.post('/schedules', (req, res) => {
    data.schedules.push(req.body) //push the respond part into the array
    res.send(req.body)
    // need to make curl request to add: curl -d "user_id=1&day=3&start_at=9AM&end_at=3PM" -X POST localhost:3000/schedules"
})



// BACKEND ADD NEW USER
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





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})