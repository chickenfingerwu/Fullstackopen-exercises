import axios from 'axios'

const baseURL = 'http://localhost:3001/phones'

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseURL, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  console.log(id)
  const request = axios.put(`${baseURL}/${id}`, newObject)
  return request.then(response => data)
}

const del = (id) => {
  const request = axios.delete(`${baseURL}/${id}`)
  return request.then(response => response.data)
}

export default {
  getAll: getAll,
  create: create,
  update: update,
  del: del
}
