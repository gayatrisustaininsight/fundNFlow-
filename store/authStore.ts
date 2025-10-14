import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { BusinessDetails, ContactDetails, PANValidation, GSTINValidation, LoginData } from '@/lib/schemas/auth'
import api from '@/lib/api'

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
  
  // Loading states
  isLoading: boolean
  isVerifyingPAN: boolean
  isVerifyingGSTIN: boolean
  isSendingOTP: boolean
  isVerifyingOTP: boolean
  
  // Actions
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  login: (data: LoginData) => Promise<void>
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
          const { data: { user, token } } = await api.post('/api/auth/login', data)
          set({ user, token, isAuthenticated: true })
        } catch (error) {
          console.error('Login error:', error)
          throw error
        } finally {
          set({ isLoading: false })
        }
      },
      
      logout: () => {
        set({ ...initialState })
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token')
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
          const { data: { expiry } } = await api.post('/api/auth/send-otp', { mobile })
          set({ otpSent: true, otpExpiry: expiry })
        } catch (error) {
          console.error('Send OTP error:', error)
          throw error
        } finally {
          set({ isSendingOTP: false })
        }
      },
      
      verifyOTP: async (mobile, otp) => {
        set({ isVerifyingOTP: true })
        try {
          await api.post('/api/auth/verify-otp', { mobile, otp })
          set({ otpVerified: true })
          return true
        } catch (error) {
          console.error('Verify OTP error:', error)
          return false
        } finally {
          set({ isVerifyingOTP: false })
        }
      },
      
      verifyPAN: async (pan) => {
        set({ isVerifyingPAN: true })
        try {
          const { data: { isValid, details } } = await api.post('/api/auth/verify-pan', { pan })
          if (isValid) {
            set((state) => ({ 
              panDetails: { ...state.panDetails, pan, verified: true, details }
            }))
          }
          return isValid
        } catch (error) {
          console.error('PAN verification error:', error)
          return false
        } finally {
          set({ isVerifyingPAN: false })
        }
      },
      
      verifyGSTIN: async (gstin) => {
        set({ isVerifyingGSTIN: true })
        try {
          const { data: { isValid, details } } = await api.post('/api/auth/verify-gstin', { gstin })
          if (isValid) {
            set((state) => ({ 
              gstinDetails: { ...state.gstinDetails, gstin, verified: true, details }
            }))
          }
          return isValid
        } catch (error) {
          console.error('GSTIN verification error:', error)
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
