const express = require('express');
const path = require('path');
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: 'c02195e5da154bfea06f028332fcb1fc',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const students = []

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
    rollbar.info('html file served successfully')
});

app.post('/api/student', (req, res) => {
    const { name } = req.body
    name = name.trim()
    students.push(name)

    rollbar.log('Student added sucessfully', {author: 'Carston', type: "manual entry"})


    res.status(200).send(students)
})

const port = process.env.PORT || 4545;
app.use(express.json())

app.use(rollbar.errorHandler())


app.listen(port, () => {
    console.log(`running on port ${port}`)
});

