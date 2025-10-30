import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { BusinessDetails, ContactDetails, PANValidation, GSTINValidation, LoginData } from '@/lib/schemas/auth'
import api from '@/lib/api'
import { toast } from '@/hooks/use-toast'

interface AuthState {
  // User session
  isAuthenticated: boolean
  user: User | null
  token: string | null
  
  // Onboarding state
  onboardingStep: 'business' | 'pan' | 'gstin' | 'contact' | 'complete'
  businessDetails: Partial<BusinessDetails>
  panDetails: Partial<PANValidation>
  gstinDetails: Partial<GSTINValidation>
  contactDetails: Partial<ContactDetails>
  
  // OTP state
  otpSent: boolean
  otpVerified: boolean
  otpExpiry: number | null
  verificationToken: string | null
  
  // Loading states
  isLoading: boolean
  isVerifyingPAN: boolean
  isVerifyingGSTIN: boolean
  isSendingOTP: boolean
  isVerifyingOTP: boolean
  
  // Actions
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  login: (data: LoginData) => Promise<{ user: User; token: string }>
  logout: () => void
  
  // Onboarding actions
  setOnboardingStep: (step: AuthState['onboardingStep']) => void
  updateBusinessDetails: (details: Partial<BusinessDetails>) => void
  updatePANDetails: (details: Partial<PANValidation>) => void
  updateGSTINDetails: (details: Partial<GSTINValidation>) => void
  updateContactDetails: (details: Partial<ContactDetails>) => void
  
  // OTP actions
  sendOTP: (mobile: string) => Promise<void>
  verifyOTP: (mobile: string, otp: string) => Promise<boolean>
  sendLoginOTP: (mobile: string) => Promise<void>
  verifyLoginOTP: (mobile: string, otp: string) => Promise<{ user: User; token: string } | false>
  register: (payload: {
    businessName: string
    email: string
    mobile: string
    pan: string
    gstin?: string
  }) => Promise<{ user: User; token: string }>
  checkUser: (payload: { mobile: string, email: string }) => Promise<{ exists: boolean }>
  sendRegistrationOTP: (payload: { mobile: string, email: string }) => Promise<void>
  verifyRegistrationOTP: (payload: { mobile: string, email: string, otp: string }) => Promise<boolean>
  
  // Verification actions
  verifyPAN: (pan: string) => Promise<boolean>
  verifyGSTIN: (gstin: string) => Promise<boolean>
  
  // Complete onboarding
  completeOnboarding: () => Promise<void>
  
  // Reset onboarding
  resetOnboarding: () => void
}

interface User {
  id: string
  businessName: string
  mobile: string
  email: string
  pan: string
  gstin?: string
  panVerified: boolean
  gstVerified: boolean
  isVerified: boolean
  onboardingCompleted: boolean
  createdAt: string
  updatedAt: string
}

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  onboardingStep: 'business' as const,
  businessDetails: {},
  panDetails: {},
  gstinDetails: {},
  contactDetails: {},
  otpSent: false,
  otpVerified: false,
  otpExpiry: null,
  verificationToken: null,
  isLoading: false,
  isVerifyingPAN: false,
  isVerifyingGSTIN: false,
  isSendingOTP: false,
  isVerifyingOTP: false,
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      
      login: async (data) => {
        set({ isLoading: true })
        try {
          const base = (process.env.NEXT_PUBLIC_BACKEND_URL || '') + '/api/auth'
          const { data: response } = await api.post('/login', data, { baseURL: base, withCredentials: false })
          const { user, token } = response.data
          set({ user, token, isAuthenticated: true })
          if (typeof document !== 'undefined' && token) {
            document.cookie = `auth_token=${token}; path=/; SameSite=Lax`
          }
          toast({ title: 'Login successful!', variant: 'default' })
          return { user, token }
        } catch (error: any) {
          const msg = error?.response?.data?.message || 'Login failed'
          toast({ title: msg, variant: 'destructive' })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },
      
      logout: () => {
        set({ ...initialState })
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-storage')
          document.cookie = 'auth_token=; path=/; Max-Age=0; SameSite=Lax'
        }
      },
      
      setOnboardingStep: (step) => set({ onboardingStep: step }),
      
      updateBusinessDetails: (details) => 
        set((state) => ({ businessDetails: { ...state.businessDetails, ...details } })),
      
      updatePANDetails: (details) => 
        set((state) => ({ panDetails: { ...state.panDetails, ...details } })),
      
      updateGSTINDetails: (details) => 
        set((state) => ({ gstinDetails: { ...state.gstinDetails, ...details } })),
      
      updateContactDetails: (details) => 
        set((state) => ({ contactDetails: { ...state.contactDetails, ...details } })),
      
      sendOTP: async (mobile) => {
        set({ isSendingOTP: true })
        try {
          const base = (process.env.NEXT_PUBLIC_BACKEND_URL || '') + '/api/auth'
          const { data: { expiry } } = await api.post('/send-otp', { mobile }, { baseURL: base, withCredentials: false })
          set({ otpSent: true, otpExpiry: expiry })
        } catch (error: any) {
          const msg = error?.response?.data?.message || 'Failed to send OTP'
          toast({ title: msg, variant: 'destructive' })
          throw error
        } finally {
          set({ isSendingOTP: false })
        }
      },

      checkUser: async ({ mobile, email }) => {
        return { exists: false }
      },

      sendRegistrationOTP: async ({ mobile, email }) => {
        set({ isSendingOTP: true })
        try {
          const base = (process.env.NEXT_PUBLIC_BACKEND_URL || '') + '/api/auth'
          await api.post('/send-registration-otp', { mobile, email }, { baseURL: base, withCredentials: false })
          set({ otpSent: true })
        } catch (error: any) {
          const msg = error?.response?.data?.message || 'Failed to send registration OTP'
          toast({ title: msg, variant: 'destructive' })
          throw error
        } finally {
          set({ isSendingOTP: false })
        }
      },

      verifyRegistrationOTP: async ({ mobile, email, otp }) => {
        set({ isVerifyingOTP: true })
        try {
          const base = (process.env.NEXT_PUBLIC_BACKEND_URL || '') + '/api/auth'
          const { data } = await api.post('/verify-registration-otp', { mobile, email, otp }, { baseURL: base, withCredentials: false })
          const verificationToken = data?.verificationToken || null
          set({ otpVerified: true, verificationToken })
          return true
        } catch (error: any) {
          const msg = error?.response?.data?.message || 'Invalid or expired OTP'
          toast({ title: msg, variant: 'destructive' })
          return false
        } finally {
          set({ isVerifyingOTP: false })
        }
      },
      
      verifyOTP: async (mobile, otp) => {
        set({ isVerifyingOTP: true })
        try {
          const base = (process.env.NEXT_PUBLIC_BACKEND_URL || '') + '/api/auth'
          const { data } = await api.post('/verify-otp', { mobile, otp }, { baseURL: base, withCredentials: false })
          const verificationToken = data?.data?.verificationToken || null
          set({ otpVerified: true, verificationToken })
          toast({ title: 'OTP verified successfully!', variant: 'default' })
          return true
        } catch (error: any) {
          const msg = error?.response?.data?.message || 'Invalid or expired OTP'
          toast({ title: msg, variant: 'destructive' })
          return false
        } finally {
          set({ isVerifyingOTP: false })
        }
      },

      sendLoginOTP: async (mobile) => {
        set({ isSendingOTP: true })
        try {
          const base = (process.env.NEXT_PUBLIC_BACKEND_URL || '') + '/api/auth/login'
          await api.post('/send-otp', { mobile }, { baseURL: base, withCredentials: false })
          set({ otpSent: true })
          toast({ title: 'Login OTP sent successfully!', variant: 'default' })
        } catch (error: any) {
          const msg = error?.response?.data?.message || 'Failed to send login OTP'
          toast({ title: msg, variant: 'destructive' })
          throw error
        } finally {
          set({ isSendingOTP: false })
        }
      },

      verifyLoginOTP: async (mobile, otp) => {
        set({ isVerifyingOTP: true })
        try {
          const base = (process.env.NEXT_PUBLIC_BACKEND_URL || '') + '/api/auth/login'
          const { data } = await api.post('/verify-otp', { mobile, otp }, { baseURL: base, withCredentials: false })
          const { user, token } = data.data
          set({ user, token, isAuthenticated: true, otpVerified: true })
          if (typeof document !== 'undefined' && token) {
            document.cookie = `auth_token=${token}; path=/; SameSite=Lax`
          }
          
          toast({ title: 'Login successful!', variant: 'default' })
          return { user, token }
        } catch (error: any) {
          const msg = error?.response?.data?.message || 'Invalid or expired OTP'
          toast({ title: msg, variant: 'destructive' })
          return false
        } finally {
          set({ isVerifyingOTP: false })
        }
      },

      register: async (payload) => {
        set({ isLoading: true })
        try {
          const state = get()
          const base = (process.env.NEXT_PUBLIC_BACKEND_URL || '') + '/api/auth'
          const registrationPayload = {
            ...payload,
            verificationToken: state.verificationToken
          }
          const { data } = await api.post('/register', registrationPayload, { baseURL: base, withCredentials: false })
          const { user, token } = data.data
          set({ user, token, isAuthenticated: true })
          if (typeof document !== 'undefined' && token) {
            document.cookie = `auth_token=${token}; path=/; SameSite=Lax`
          }
          
          toast({ title: 'Registration completed successfully!', variant: 'default' })
          return { user, token }
        } catch (error: any) {
          const msg = error?.response?.data?.message || 'Registration failed'
          toast({ title: msg, variant: 'destructive' })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },
      
      verifyPAN: async (pan) => {
        set({ isVerifyingPAN: true })
        try {
          const { data: { isValid, details } } = await api.post('/verify-status/pan', { pan }, { baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/verification', withCredentials: false })
          if (isValid) {
            set((state) => ({ 
              panDetails: { ...state.panDetails, pan, verified: true, details }
            }))
          }
          return isValid
        } catch (error: any) {
          const msg = error?.response?.data?.message || 'PAN verification failed'
          toast({ title: msg, variant: 'destructive' })
          return false
        } finally {
          set({ isVerifyingPAN: false })
        }
      },
      
      verifyGSTIN: async (gstin) => {
        set({ isVerifyingGSTIN: true })
        try {
          const base = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/verification' || 'http://localhost:5000/api/verification'
          const { data: { isValid, details } } = await api.post('/verify-status/gst', { gstin }, { baseURL: base, withCredentials: false })
          if (isValid) {
            set((state) => ({ 
              gstinDetails: { ...state.gstinDetails, gstin, verified: true, details }
            }))
          }
          return isValid
        } catch (error: any) {
          const msg = error?.response?.data?.message || 'GSTIN verification failed'
          toast({ title: msg, variant: 'destructive' })
          return false
        } finally {
          set({ isVerifyingGSTIN: false })
        }
      },
      
      completeOnboarding: async () => {
        set({ isLoading: true })
        try {
          const state = get()
          const onboardingData = {
            businessDetails: state.businessDetails,
            pan: state.panDetails.pan,
            gstin: state.gstinDetails.gstin,
            contactDetails: state.contactDetails,
          }
          const { data: { user, token } } = await api.post('/api/auth/complete-onboarding', onboardingData)
          set({ 
            user, 
            token, 
            isAuthenticated: true, 
            onboardingStep: 'complete' 
          })
        } catch (error) {
          console.error('Complete onboarding error:', error)
          throw error
        } finally {
          set({ isLoading: false })
        }
      },
      
      resetOnboarding: () => set({
        onboardingStep: 'business',
        businessDetails: {},
        panDetails: {},
        gstinDetails: {},
        contactDetails: {},
        otpSent: false,
        otpVerified: false,
        otpExpiry: null,
      }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        onboardingStep: state.onboardingStep,
        businessDetails: state.businessDetails,
        panDetails: state.panDetails,
        gstinDetails: state.gstinDetails,
        contactDetails: state.contactDetails,
      }),
    }
  )
)
