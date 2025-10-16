import axios, { AxiosHeaders } from 'axios'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + '/api' || 'http://localhost:5000/api',
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
    if (token) {
        if (!config.headers) {
            config.headers = new AxiosHeaders()
        }
        if (config.headers instanceof AxiosHeaders) {
            config.headers.set('Authorization', `Bearer ${token}`)
        } else {
            ;(config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
        }
    }
    return config
})

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('auth_token')
            }
        }
        return Promise.reject(error)
    }
)

export default api

