import axios, { AxiosHeaders } from 'axios'
import { API_CONFIG, isCorsError, getCorsErrorMessage } from './config/api'

// Global CORS configuration based on environment
const getCorsConfig = () => {
    return {
        baseURL: API_CONFIG.BACKEND_URL + '/api',
        withCredentials: false, // Always false for CORS compatibility
        timeout: API_CONFIG.TIMEOUT,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        // Development-specific headers
        ...(API_CONFIG.IS_DEVELOPMENT && {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            }
        })
    }
}

const api = axios.create(getCorsConfig())

api.interceptors.request.use((config) => {
    let token = null
    
    if (typeof window !== 'undefined') {
        try {
            const authStorage = localStorage.getItem('auth-storage')
            if (authStorage) {
                const authData = JSON.parse(authStorage)
                token = authData?.state?.token || null
            }
        } catch (error) {
            console.error('Error parsing auth storage:', error)
        }
    }
    
    console.log('API Request Interceptor - Token:', token ? 'Present' : 'Missing')
    console.log('API Request Interceptor - URL:', config.url)
    console.log('API Request Interceptor - Method:', config.method)
    console.log('API Request Interceptor - Full URL:', (config.baseURL || '') + (config.url || ''))
    console.log('API Request Interceptor - Data type:', typeof config.data)
    if (config.data instanceof FormData) {
        console.log('API Request Interceptor - FormData entries:')
        for (let [key, value] of config.data.entries()) {
            console.log(`  ${key}:`, value)
        }
        // Remove Content-Type header for FormData to let browser set boundary
        if (config.headers) {
            config.headers.delete('Content-Type')
        }
    }
    
    if (token) {
        if (!config.headers) {
            config.headers = new AxiosHeaders()
        }
        if (config.headers instanceof AxiosHeaders) {
            config.headers.set('Authorization', `Bearer ${token}`)
        } else {
            ;(config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
        }
        console.log('API Request Interceptor - Authorization header added')
    } else {
        console.log('API Request Interceptor - No token found, request will be unauthenticated')
    }
    
    // Ensure CORS headers are not set by client (they should come from server)
    if (config.headers) {
        config.headers.delete('Access-Control-Allow-Origin')
        config.headers.delete('Access-Control-Allow-Methods')
        config.headers.delete('Access-Control-Allow-Headers')
    }
    
    return config
})

api.interceptors.response.use(
    (res) => {
        console.log('API Response Interceptor - Success:', res.status, res.config.url)
        return res
    },
    async (error) => {
        console.log('API Response Interceptor - Error:', error.response?.status, error.config?.url)
        console.log('API Response Interceptor - Error data:', error.response?.data)
        
        // Handle CORS errors specifically
        if (isCorsError(error)) {
            console.error('🚨 CORS Error Detected:', error.message)
            console.error('🚨 This usually means the backend CORS configuration needs to be updated')
            console.error('🚨 Backend should allow origin:', API_CONFIG.FRONTEND_URL)
            console.error('🚨 CORS Error Details:', getCorsErrorMessage(error))
        }
        
        // Handle authentication errors
        if (error.response?.status === 401) {
            console.log('API Response Interceptor - 401 error, removing auth storage')
            if (typeof window !== 'undefined') {
                localStorage.removeItem('auth-storage')
            }
        }
        
        return Promise.reject(error)
    }
)

export default api

