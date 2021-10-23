import axios from 'axios'

export default axios.create({
    baseURL: "http://localhost:8000/api",
    timeout: 0,
    headers: { token: localStorage.getItem("token") }
})