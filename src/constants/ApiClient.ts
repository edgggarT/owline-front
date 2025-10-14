import axios from 'axios'
import {encode} from 'base-64'
import { API_URLS } from './ApiConfig'

const HOST_USER = 'owline500'
const HOST_PASSWORD = 'tJQE5ibc8oHN'

const credentials = encode(`${HOST_USER}:${HOST_PASSWORD}`)

const ApiClient = axios.create({
    baseURL: API_URLS.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`
    }
})

export default ApiClient;


