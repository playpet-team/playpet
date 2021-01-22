import axios from 'axios'
export const Api = axios.create({
    // baseURL: __DEV__ ? 'http://10.10.20.86:3000/api' : 'https://playpet.me/api',
    // baseURL: __DEV__ ? 'http://192.168.1.24:3000/api' : 'https://playpet.me/api',
    baseURL: __DEV__ ? 'http://192.168.1.27:3000/api' : 'https://playpet.me/api',
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
})
