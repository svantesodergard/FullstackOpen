import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseURL)
}

const create = (newPerson) => (
  axios
    .post(baseURL, newPerson)
)

const update = (id, newPerson) => axios.put(`${baseURL}/${id}`, newPerson)

const remove = (id) => axios.delete(`${baseURL}/${id}`)



export default {getAll, create, remove, update}
