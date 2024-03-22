const Person = require('./models/person')

const express = require('express')
const app = express()
const morgan = require('morgan')

const cors = require('cors')

app.use(express.static('dist'))
app.use(cors())

app.use(express.json())
app.use(morgan('tiny'))

app.get('/info', (_, response) => {
    const date = new Date()    
    response.send(
        `<p>Phonebook has info for ${data.length} people</p>
<p>${date.toUTCString()}</p>`
    )
})

app.get('/api/persons', (_, response) => {
    Person.find({}).then(result => {
        response.json(result)
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person.find({ _id: id }).then(result => {
        const person = result[0]
        response.json(person)
    }).catch (
        () => response.status(404).end()
    )
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    data = data.filter(note => note.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const person = {
        ...request.body,
        id: Math.floor(Math.random() * 10_000)
    }    

    if (!person.name) {
        response.status(400)
        response.json({error: 'name must exist'})
        return
    }
    if (!person.number) {
        response.status(400)
        response.json({error: 'number must exist'})
        return
    }

    if(data.map(person => person.name).includes(person.name)) {
        response.status(400)
        response.json({error: 'name must be unique'})
        return
    }

    data.push(person)

    response.json(data[data.length - 1])
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
