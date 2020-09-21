import axios from 'axios'
console.log("__DEV__ ? 'http://10.10.20.56:3000/api' : 'https://playpet.me/api'", __DEV__ ? 'http://10.10.20.56:3000/api' : 'https://playpet.me/api')
export const Api = axios.create({
    baseURL: __DEV__ ? 'http://10.10.20.56:3000/api' : 'https://playpet.me/api',
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
})
