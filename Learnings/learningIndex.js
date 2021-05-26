const express = require('express')
const app = express() //creates an express function
const port = 3000
const data = require('./learningData.js') //creates a variable to access information found in the data.js file


app.get('/', (req, res) => {  // '/' = path eg ...com/author    req = request, res = response
    res.send('Hello World!') //to send back text saying "Hello World!", so when you go to this link it will send you "Hello World!"
})

app.get('/test', (req, res) => {
    console.log(data) // will console.log the information in the data variable
    console.log(data.users) // will console.log the information under the 'users' data
    console.log(data.streetAddress) //will console.log the information under the 'streetAddress' data
    res.send(data.users[0].firstname) // to get first of each object use a loop.
})

// THIS WILL ALWAYS BE AT THE BOTTOM
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`) //ideally have a console.log to know something is happening.
})