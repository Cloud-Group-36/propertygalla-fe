import axios from "axios"

const api = axios.create({
  baseURL: "http://propertygalla-dev.us-east-1.elasticbeanstalk.com/api", 
  headers: {
    "Content-Type": "application/json",
  },
})

export default api
