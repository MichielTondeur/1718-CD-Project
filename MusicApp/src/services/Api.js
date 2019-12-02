import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `https://fierce-gorge-44233.herokuapp.com/`
    //baseURL: `http://localhost:8081`
  })
}