import axios from 'axios'
import { UserAuth } from '../context/AuthContext';

const instance = axios.create({
    baseURL: 'http://localhost:3001',
})
const { user } = UserAuth()
instance.interceptors.request.use(
    function (config) {
        const token = user.accessToken
        if (token) {
            config.headers['Authorization'] = `${token}`
        }
        // console.log(config)
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance