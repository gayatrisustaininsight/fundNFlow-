// Global API Configuration
export const API_CONFIG = {
  // Base URLs
  FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:6001',
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000',
  
  // CORS Settings
  CORS_ENABLED: process.env.NEXT_PUBLIC_CORS_ENABLED === 'true',
  CORS_ORIGIN: process.env.NEXT_PUBLIC_CORS_ORIGIN || 'http://localhost:6001',
  
  // API Settings
  TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
  RETRY_ATTEMPTS: parseInt(process.env.NEXT_PUBLIC_API_RETRY_ATTEMPTS || '3'),
  
  // Environment
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
}

// CORS Error Messages
export const CORS_ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network Error - Check CORS configuration',
  PREFLIGHT_FAILED: 'CORS preflight request failed',
  ORIGIN_NOT_ALLOWED: 'Origin not allowed by CORS policy',
  CREDENTIALS_MISMATCH: 'Credentials mismatch with CORS policy',
}

// Helper function to detect CORS errors
export const isCorsError = (error: any): boolean => {
  return (
    error?.code === 'ERR_NETWORK' ||
    error?.message === 'Network Error' ||
    error?.message?.includes('CORS') ||
    error?.message?.includes('cross-origin')
  )
}

// Helper function to get CORS error message
export const getCorsErrorMessage = (error: any): string => {
  if (isCorsError(error)) {
    return `CORS Error: ${error.message}. Backend should allow origin: ${API_CONFIG.FRONTEND_URL}`
  }
  return error?.message || 'Unknown error'
}
