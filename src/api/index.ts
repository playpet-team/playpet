import axios from 'axios'

export const Api = axios.create({
    baseURL: __DEV__ ? 'http://localhost:3000/api' : 'https://playpet.me/api',
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
});
