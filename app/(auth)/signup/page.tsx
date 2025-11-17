'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Label } from '@/components/ui/Label'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Building2, FileText, Phone, Mail, ArrowRight, Shield, CheckCircle, Sparkles, ArrowLeft, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useToast } from '@/hooks/use-toast'

type FormState = {
    businessName: string
    pan: string
    gstin: string
    mobile: string
    email: string
    otp: string
}

const ConsolidatedOnboarding = () => {
    const [step, setStep] = useState(1)
    const router = useRouter()
    const [formData, setFormData] = useState<FormState>({ businessName: '', pan: '', gstin: '', mobile: '', email: '', otp: '' })
    const [otpSent, setOtpSent] = useState(false)








    const [panVerified, setPanVerified] = useState<null | boolean>(null)
    const [gstVerified, setGstVerified] = useState<null | boolean>(null)
    const { verifyPAN, isVerifyingPAN, verifyGSTIN, isVerifyingGSTIN, register, isSendingOTP, isVerifyingOTP, isLoading, checkUser, sendOTP, verifyOTP, otpVerified, verificationToken } = useAuthStore()
    const { toast } = useToast()

    const updateField = (field: keyof FormState, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSendRegistrationOTP = async () => {
        if (!formData.mobile) return
        try {
            await sendOTP(
                formData.mobile,
                formData.email

            )
            setOtpSent(true)
            toast({ title: 'OTP sent successfully' })
        } catch (e: any) {
            const msg = e?.response?.data?.message || 'Failed to send OTP'
            toast({ title: msg })
        }
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/

    const handleValidatePAN = async () => {
        const isFormatValid = panRegex.test(formData.pan)
        setPanVerified(isFormatValid)
        if (!isFormatValid) return
        try {
            const isServerValid = await verifyPAN(formData.pan)
            setPanVerified(isServerValid)
        } catch {
            setPanVerified(false)
        }
    }

    const handleValidateGST = async () => {
        const isFormatValid = gstRegex.test(formData.gstin)
        setGstVerified(isFormatValid)
        if (!isFormatValid) return
        try {
            const isServerValid = await verifyGSTIN(formData.gstin)
            setGstVerified(isServerValid)
        } catch {
            setGstVerified(false)
        }
    }

    const handleContinue = async () => {
        const mobileOk = formData.mobile && formData.mobile.length === 10
        const emailOk = !!formData.email
        if (!formData.businessName || !mobileOk || !emailOk) return
        const existsResp = await checkUser({ mobile: formData.mobile, email: formData.email })
        if (existsResp?.exists) {
            router.push('/login')
            return
        }
        await handleSendRegistrationOTP()
        setStep(2)
    }

    const handleContinueToVerification = () => {
        if (!formData.businessName || !formData.pan || !formData.mobile || !formData.email) return
        setStep(2)
    }

    const handleComplete = async () => {
        if (!otpVerified) {
            if (!formData.otp || formData.otp.length !== 6) return
            const ok = await verifyOTP(formData.mobile, formData.otp)
            if (!ok) {
                return
            }
        }
        try {
            const result = await register({
                businessName: formData.businessName,
                email: formData.email,
                mobile: formData.mobile,
                pan: '',
                gstin: undefined,
            })

            // Redirect based on verification status
            if (result?.user) {
                if (!result.user.panVerified || !result.user.gstVerified) {
                    // Redirect to verification/onboarding if PAN or GST not verified
                    router.push('/onboarding')
                } else {
                    // Redirect to dashboard if all verifications are complete
                    router.push('/dashboard')
                }
            }
        } catch (error) {
            // Error handling is done in the auth store
            console.error('Registration failed:', error)
        }
    }

    const progress = (step / 3) * 100

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="max-w-3xl mx-auto p-6 py-12">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-8">
                    <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} className="inline-block mb-4">
                        <Sparkles className="w-12 h-12 text-blue-600 mx-auto" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to FundnFlow</h2>
                    <p className="text-gray-600">Get started in just 2 simple steps!</p>
                </motion.div>

                <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-gray-700">Step {step} of 3</span>
                        <span className="text-sm text-blue-600 font-medium">{Math.round(progress)}% Complete</span>
                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div initial={{ width: '0%' }} animate={{ width: `${progress}%` }} transition={{ duration: 0.6, ease: 'easeOut' }} className="h-full bg-gradient-to-r from-blue-500 to-blue-600" />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                            <Card className="p-8 shadow-xl">
                                <div className="text-center mb-6">
                                    <Building2 className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                                    <h3 className="text-2xl font-semibold">Business Information</h3>
                                    <p className="text-gray-600 text-sm mt-2">Tell us about your business</p>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <Label className="flex items-center gap-2 mb-2 text-sm font-semibold"><Building2 className="w-4 h-4 text-blue-600" />Business Name <span className="text-red-500">*</span></Label>
                                        <Input placeholder="e.g., Green Tech Solutions Pvt Ltd" value={formData.businessName} onChange={(e) => updateField('businessName', e.target.value)} />
                                    </div>



                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="flex items-center gap-2 mb-2 text-sm font-semibold"><Phone className="w-4 h-4 text-blue-600" />Mobile Number <span className="text-red-500">*</span></Label>
                                            <Input type="tel" placeholder="9876543210" maxLength={10} value={formData.mobile} onChange={(e) => updateField('mobile', e.target.value)} />
                                        </div>
                                        <div>
                                            <Label className="flex items-center gap-2 mb-2 text-sm font-semibold"><Mail className="w-4 h-4 text-blue-600" />Email Address <span className="text-red-500">*</span></Label>
                                            <Input type="email" placeholder="owner@company.com" value={formData.email} onChange={(e) => updateField('email', e.target.value)} />
                                        </div>

                                    </div>

                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <div className="flex gap-3">
                                            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-semibold text-blue-900 mb-1">Your information is secure</p>
                                                <p className="text-xs text-blue-700">We use bank-level encryption to protect your data.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <Button onClick={handleContinue} className="w-full" size="lg">
                                            Continue
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                            <Card className="p-8 shadow-xl">
                                <div className="text-center mb-6">
                                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                                    <h3 className="text-2xl font-semibold">Verify Your Mobile</h3>
                                    <p className="text-gray-600 text-sm mt-2">We'll send a verification code to {formData.mobile}</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                        <div className="flex justify-between text-sm"><span className="text-gray-600">Business Name:</span><span className="font-semibold">{formData.businessName}</span></div>
                                        <div className="flex justify-between text-sm"><span className="text-gray-600">Mobile:</span><span className="font-semibold">{formData.mobile}</span></div>
                                        <div className="flex justify-between text-sm"><span className="text-gray-600">Email:</span><span className="font-semibold">{formData.email}</span></div>
                                    </div>

                                    {!otpSent ? (
                                        <div className="text-center py-4">
                                            <p className="text-gray-600 mb-4">Click below to receive a verification code</p>
                                            <Button onClick={handleSendRegistrationOTP} disabled={isSendingOTP} size="lg" className="w-full max-w-xs">
                                                {isSendingOTP ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending OTP...</>) : (<><Phone className="w-4 h-4 mr-2" />Send Verification Code</>)}
                                            </Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <Label className="flex items-center gap-2 mb-2 text-sm font-semibold"><CheckCircle className="w-4 h-4 text-green-600" />Enter 6-Digit OTP <span className="text-red-500">*</span></Label>
                                            <Input type="text" maxLength={6} placeholder="● ● ● ● ● ●" className="tracking-widest text-center font-mono text-2xl h-14" value={formData.otp} onChange={(e) => updateField('otp', e.target.value)} />
                                            <p className="text-xs text-gray-500 mt-2 text-center">
                                                Didn't receive the code? <button onClick={handleSendRegistrationOTP} className="text-blue-600 hover:underline font-semibold">Resend</button>
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex gap-3 pt-4">
                                        <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                            Back
                                        </Button>
                                        <Button onClick={handleComplete} className="flex-1" disabled={!otpSent || !formData.otp || formData.otp.length !== 6 || isVerifyingOTP || isLoading}>
                                            {isVerifyingOTP || isLoading ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Verifying...</>) : 'Complete Setup'}
                                            <CheckCircle className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                <p className="text-center text-sm text-gray-500 mt-6">Need help? <a href="#" className="text-blue-600 hover:underline font-semibold">Contact Support</a></p>
            </div>
        </div>
    )
}

export default ConsolidatedOnboarding
