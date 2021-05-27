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
app.get('/users/:id', (req, res) => {
    const id = req.params.id
    /* let user = [] */
        /* console.log(id) */
        res.send(data.users[id])


// go through the users, if the input (/:id) matches the [i(ndex)] of a user, display their details.
// do you need to use a loop? Not searching each object for something

/*     for (let i = 0; i < data.users.length; i++) { //need to define i???
        console.log(i)      // this is counting the number of users

        let userId = data.users[i]
        if (userId === id)
            user.push(userId)
            console.log(user)
    }

    console.log(user)               //these lines are only logging [] because info
    res.send(user)    */             //from if statement is not logging???
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