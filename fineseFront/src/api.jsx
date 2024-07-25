import axios from "axios";


const api = axios.create ({
    baseURL:import.meta.env.VITE_API_URL
})

api.interceptors.request.use (
    (config) => {
        const authTokens = localStorage.getItem("authTokens")

        if(authTokens) {
            const token = JSON.parse(authTokens).access;
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default api;