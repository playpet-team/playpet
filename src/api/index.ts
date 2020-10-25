import axios from 'axios'
export const Api = axios.create({
    // baseURL: __DEV__ ? 'http://10.10.20.56:3000/api' : 'https://playpet.me/api',
    baseURL: __DEV__ ? 'http://192.168.1.35:3000/api' : 'https://playpet.me/api',
    // baseURL: __DEV__ ? 'http://192.168.1.4:3000/api' : 'https://playpet.me/api',
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
})
