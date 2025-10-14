import { z } from 'zod'

// PAN validation regex (Indian PAN format)
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/

// GSTIN validation regex (Indian GST format)
const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/

// Indian mobile number validation
const mobileRegex = /^[6-9]\d{9}$/

export const businessDetailsSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters').max(100),
  businessType: z.enum(['sole_proprietorship', 'partnership', 'llp', 'private_limited', 'public_limited', 'other']),
  industry: z.string().min(2, 'Industry must be specified'),
  businessAddress: z.string().min(10, 'Complete business address required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, 'Invalid pincode'),
})

export const panValidationSchema = z.object({
  pan: z.string()
    .regex(panRegex, 'Invalid PAN format')
    .transform(val => val.toUpperCase()),
})

export const gstinValidationSchema = z.object({
  gstin: z.string()
    .regex(gstinRegex, 'Invalid GSTIN format')
    .transform(val => val.toUpperCase()),
})

export const contactDetailsSchema = z.object({
  mobile: z.string()
    .regex(mobileRegex, 'Invalid mobile number')
    .transform(val => val.replace(/\D/g, '')),
  email: z.string().email('Invalid email address'),
  alternateMobile: z.string()
    .regex(mobileRegex, 'Invalid alternate mobile number')
    .optional()
    .transform(val => val ? val.replace(/\D/g, '') : undefined),
})

export const otpVerificationSchema = z.object({
  mobile: z.string().regex(mobileRegex),
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

export const loginSchema = z.object({
  mobile: z.string()
    .regex(mobileRegex, 'Invalid mobile number')
    .transform(val => val.replace(/\D/g, '')),
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

export const completeOnboardingSchema = z.object({
  businessDetails: businessDetailsSchema,
  pan: panValidationSchema.shape.pan,
  gstin: gstinValidationSchema.shape.gstin,
  contactDetails: contactDetailsSchema,
  consent: z.boolean().refine(val => val === true, 'You must accept terms and conditions'),
})

export type BusinessDetails = z.infer<typeof businessDetailsSchema>
export type PANValidation = z.infer<typeof panValidationSchema>
export type GSTINValidation = z.infer<typeof gstinValidationSchema>
export type ContactDetails = z.infer<typeof contactDetailsSchema>
export type OTPVerification = z.infer<typeof otpVerificationSchema>
export type LoginData = z.infer<typeof loginSchema>
export type CompleteOnboarding = z.infer<typeof completeOnboardingSchema>
