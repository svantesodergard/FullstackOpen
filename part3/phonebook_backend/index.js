const Person = require('./models/person')

const express = require('express')
const app = express()
const morgan = require('morgan')

const cors = require('cors')

app.use(express.static('dist'))
app.use(cors())

app.use(express.json())
app.use(morgan('tiny'))


app.get('/api/persons', (_, response) => {
    Person.find({}).then(result => {
        response.json(result)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(id).then(person => {
        if (!person) {
            response.status(404).end()
            return
        }
        response.json(person)
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndDelete(id).then( person => {
        if (person) {
            response.status(204).end()
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))
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


const errorHandler = (error, _, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
