import axios from 'axios'

export default axios.create({
  baseURL: 'http://api.nc-realty.dev/api/v1'
})
