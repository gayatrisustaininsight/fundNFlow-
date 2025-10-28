'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Card, CardContent } from '@/components/ui/Card'
import { Building2, Mail, Phone, ArrowRight, ArrowLeft, CheckCircle, Loader2, Sparkles } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [step, setStep] = useState(1)
    const [emailOrMobile, setEmailOrMobile] = useState('')
    const [otp, setOtp] = useState('')
    const [otpSent, setOtpSent] = useState(false)
    const router = useRouter()

    const { sendLoginOTP, verifyLoginOTP, isSendingOTP, isVerifyingOTP, isLoading } = useAuthStore()
    const { toast } = useToast()

    const isEmail = emailOrMobile.includes('@')
    const isMobile = /^\d{10}$/.test(emailOrMobile)

    const handleSendOTP = async () => {
        if (!emailOrMobile) {
            toast({
                title: "Error",
                description: "Please enter your email or mobile number",
                variant: "destructive",
            })
            return
        }

        if (!isEmail && !isMobile) {
            toast({
                title: "Error",
                description: "Please enter a valid email or 10-digit mobile number",
                variant: "destructive",
            })
            return
        }

        try {
            if (isMobile) {
                await sendLoginOTP(emailOrMobile)
            } else {
                // For email, you might need a different API endpoint
                // For now, treating it as mobile for consistency
                toast({
                    title: "Info",
                    description: "Email OTP will be sent to your registered email",
                    variant: "default",
                })
            }
            setOtpSent(true)
            setStep(2)
        } catch (error) {
            console.error('Failed to send OTP:', error)
        }
    }

    const handleVerifyOTP = async () => {
        if (!otp || otp.length !== 6) {
            toast({
                title: "Error",
                description: "Please enter a valid 6-digit OTP",
                variant: "destructive",
            })
            return
        }

        try {
            if (isMobile) {
                const result = await verifyLoginOTP(emailOrMobile, otp)
                if (result) {
                    // Redirect based on user verification status
                    if (result.user) {
                        if (!result.user.panVerified || !result.user.gstVerified) {
                            // Redirect to verification/onboarding if PAN or GST not verified
                            router.push('/onboarding')
                        } else {
                            // Redirect to dashboard if all verifications are complete
                            router.push('/dashboard')
                        }
                    }
                }
            } else {
                // Handle email OTP verification if needed
                toast({
                    title: "Error",
                    description: "Email login not supported yet. Please use mobile number.",
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.error('OTP verification failed:', error)
        }
    }


    const progress = (step / 2) * 100

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-center mb-8"
                >
                    <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} className="inline-block mb-4">
                        <Sparkles className="w-12 h-12 text-blue-600 mx-auto" />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to continue your loan application</p>
                </motion.div>

                <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-gray-700">Step {step} of 2</span>
                        <span className="text-sm text-blue-600 font-medium">{Math.round(progress)}% Complete</span>
                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                        />
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card className="p-8">
                        <CardContent className="p-0">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <div className="text-center mb-6">
                                            <Building2 className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                                            <h3 className="text-xl font-semibold">Enter Your Details</h3>
                                            <p className="text-gray-600 text-sm mt-2">We'll send a verification code</p>
                                        </div>

                                        <div>
                                            <Label htmlFor="emailOrMobile" className="flex items-center gap-2 mb-2">
                                                {isEmail ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                                                {isEmail ? 'Email Address' : isMobile ? 'Mobile Number' : 'Email or Mobile'}
                                            </Label>
                                            <Input
                                                id="emailOrMobile"
                                                type={isEmail ? "email" : "tel"}
                                                placeholder={isEmail ? "Enter your email" : "Enter your mobile number"}
                                                value={emailOrMobile}
                                                onChange={(e) => setEmailOrMobile(e.target.value)}
                                                className="w-full"
                                            />
                                        </div>

                                        <Button
                                            onClick={handleSendOTP}
                                            className="w-full"
                                            size="lg"
                                            disabled={isSendingOTP || !emailOrMobile}
                                        >
                                            {isSendingOTP ? (
                                                <div className="flex items-center gap-2">
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Sending OTP...
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    Send Verification Code
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            )}
                                        </Button>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <div className="text-center mb-6">
                                            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                                            <h3 className="text-xl font-semibold">Verify Your {isEmail ? 'Email' : 'Mobile'}</h3>
                                            <p className="text-gray-600 text-sm mt-2">
                                                We sent a 6-digit code to {isEmail ? emailOrMobile : `+91 ${emailOrMobile}`}
                                            </p>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">{isEmail ? 'Email:' : 'Mobile:'}</span>
                                                <span className="font-semibold">{isEmail ? emailOrMobile : `+91 ${emailOrMobile}`}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="otp" className="flex items-center gap-2 mb-2">
                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                                Enter 6-Digit OTP
                                            </Label>
                                            <Input
                                                id="otp"
                                                type="text"
                                                maxLength={6}
                                                placeholder="● ● ● ● ● ●"
                                                className="tracking-widest text-center font-mono text-2xl h-14"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                            />
                                            <p className="text-xs text-gray-500 mt-2 text-center">
                                                Didn't receive the code?{' '}
                                                <button
                                                    onClick={handleSendOTP}
                                                    className="text-blue-600 hover:underline font-semibold"
                                                    disabled={isSendingOTP}
                                                >
                                                    Resend
                                                </button>
                                            </p>
                                        </div>

                                        <div className="flex gap-3">
                                            <Button
                                                variant="outline"
                                                onClick={() => setStep(1)}
                                                className="flex-1"
                                            >
                                                <ArrowLeft className="w-4 h-4 mr-2" />
                                                Back
                                            </Button>
                                            <Button
                                                onClick={handleVerifyOTP}
                                                className="flex-1"
                                                disabled={!otp || otp.length !== 6 || isVerifyingOTP || isLoading}
                                            >
                                                {isVerifyingOTP || isLoading ? (
                                                    <div className="flex items-center gap-2">
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        Verifying...
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        Sign In
                                                        <CheckCircle className="w-4 h-4" />
                                                    </div>
                                                )}
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                                className="mt-6 text-center"
                            >
                                <p className="text-gray-600">
                                    Don't have an account?{' '}
                                    <Link href="/signup" className="text-blue-600 hover:underline font-medium">
                                        Sign up here
                                    </Link>
                                </p>
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="text-center mt-8"
                >
                    <Link href="/">
                        <Button variant="outline" className="w-full">
                            Back to Home
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    )
}
