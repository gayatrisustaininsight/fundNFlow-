'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Label } from '@/components/ui/Label'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import {
    Building2, FileText, Phone, Mail, ArrowRight, Shield,
    EyeOff, Eye, Lock, CheckCircle, Sparkles
} from 'lucide-react'
import { useAppStore } from '@/store/appStore'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const OnboardingPage = () => {
    const router = useRouter()
    const { toast } = useToast()
    const [step, setStep] = useState<1 | 2>(1) // Track which step we're on
    const [otpSent, setOtpSent] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        businessName: '',
        panGstin: '',
        mobile: '',
        email: '',
        password: '',
        otp: ''
    })

    // Handle OTP sending
    const handleSendOTP = () => {
        if (!formData.mobile || formData.mobile.length !== 10) {
            toast({
                title: "Invalid Mobile",
                description: "Please enter a valid 10-digit mobile number",
                variant: "destructive"
            })
            return
        }

        // TODO: Call your OTP API here
        setOtpSent(true)
        toast({
            title: "OTP Sent!",
            description: `Verification code sent to ${formData.mobile}`
        })
    }

    // Handle Step 1 submission
    const handleStep1Continue = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.mobile || !formData.otp || !formData.businessName) {
            toast({
                title: "Missing Fields",
                description: "Please fill all required fields",
                variant: "destructive"
            })
            return
        }

        // Verify OTP here (TODO: Add your OTP verification)
        toast({
            title: "Mobile Verified! ✓",
            description: "Let's complete your profile"
        })

        setStep(2)
    }

    // Handle final submission
    const handleFinalSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.panGstin || !formData.email) {
            toast({
                title: "Missing Fields",
                description: "Please fill all required fields",
                variant: "destructive"
            })
            return
        }

        // Save to store or API
        toast({
            title: "Success!",
            description: "Redirecting to dashboard..."
        })

        setTimeout(() => {
            router.push('/dashboard')
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="max-w-2xl mx-auto p-6 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        className="inline-block mb-4"
                    >
                        <Sparkles className="w-12 h-12 text-blue-600 mx-auto" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome to FundanFlow
                    </h2>
                    <p className="text-gray-600 ">
                        {step === 1
                            ? "Quick start - just 3 fields! ⚡"
                            : "Almost there! Complete your profile 🎯"
                        }
                    </p>
                </motion.div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-gray-700">
                            Step {step} of 2
                        </span>
                        <span className="text-sm text-blue-600 font-medium">
                            {step === 1 ? '50%' : '100%'} Complete
                        </span>
                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: '0%' }}
                            animate={{ width: step === 1 ? '50%' : '100%' }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg"
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        ⏱️ About {step === 1 ? '1' : '2'} minute remaining
                    </p>
                </div>

                {/* Forms with Animation */}
                <AnimatePresence mode="wait">
                    {step === 1 ? (
                        /* ============================================
                           STEP 1: QUICK START (Mobile + Business Name)
                           ============================================ */
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="p-8 shadow-xl">
                                <form onSubmit={handleStep1Continue} className="space-y-6">

                                    {/* Business Name */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <Label htmlFor="businessName" className="flex items-center gap-2 mb-2 text-sm font-semibold">
                                            <Building2 className="w-4 h-4 text-blue-600" />
                                            Business Name
                                            <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="businessName"
                                            placeholder="e.g., Green Tech Solutions"
                                            value={formData.businessName}
                                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                            className=""
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-1.5">
                                            Use your registered business name
                                        </p>
                                    </motion.div>

                                    {/* Mobile Number */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <Label htmlFor="mobile" className="flex items-center gap-2 mb-2 text-sm font-semibold">
                                            <Phone className="w-4 h-4 text-blue-600" />
                                            Mobile Number
                                            <span className="text-red-500">*</span>
                                        </Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="mobile"
                                                type="tel"
                                                maxLength={10}
                                                placeholder="9876543210"
                                                value={formData.mobile}
                                                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                                className=""
                                                required
                                            />
                                            <Button
                                                type="button"
                                                onClick={handleSendOTP}
                                                disabled={otpSent}
                                                className={otpSent ? 'bg-green-600 hover:bg-green-700' : ''}
                                            >
                                                {otpSent ? '✓ Sent' : 'Send OTP'}
                                            </Button>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                                            🔒 We'll send a 6-digit verification code
                                        </p>
                                    </motion.div>

                                    {/* OTP Field (shows after Send OTP clicked) */}
                                    {otpSent && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Label htmlFor="otp" className="flex items-center gap-2 mb-2 text-sm font-semibold">
                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                                Enter OTP
                                                <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="otp"
                                                type="text"
                                                maxLength={6}
                                                placeholder="123456"
                                                value={formData.otp}
                                                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                                                className=" tracking-widest text-center font-mono"
                                                required
                                            />
                                            <p className="text-xs text-gray-500 mt-1.5">
                                                Didn't receive? <button type="button" onClick={handleSendOTP} className="text-blue-600 font-semibold hover:underline">Resend OTP</button>
                                            </p>
                                        </motion.div>
                                    )}

                                    {/* Continue Button */}
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            size="lg"
                                            disabled={!otpSent || !formData.otp || !formData.businessName}
                                        >
                                            Continue
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </Button>
                                    </motion.div>

                                    {/* Security Badge */}
                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 pt-4 border-t">
                                        <Shield className="w-4 h-4" />
                                        <span>Your data is encrypted and secure</span>
                                    </div>
                                </form>
                            </Card>
                        </motion.div>
                    ) : (
                        /* ============================================
                           STEP 2: COMPLETE PROFILE (PAN, Email, Password)
                           ============================================ */
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="p-8 shadow-xl">
                                {/* Success Message */}
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-center gap-3"
                                >
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-green-900">Mobile Verified! 🎉</p>
                                        <p className="text-sm text-green-700">Just 3 more fields to go</p>
                                    </div>
                                </motion.div>

                                <form onSubmit={handleFinalSubmit} className="space-y-6">

                                    {/* PAN/GSTIN */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <Label htmlFor="panGstin" className="flex items-center gap-2 mb-2 text-sm font-semibold">
                                            <FileText className="w-4 h-4 text-blue-600" />
                                            PAN/GSTIN
                                            <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="panGstin"
                                            placeholder="ABCDE1234F or 22ABCDE1234F1Z5"
                                            value={formData.panGstin}
                                            onChange={(e) => setFormData({ ...formData, panGstin: e.target.value.toUpperCase() })}
                                            className=" uppercase"
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-1.5">
                                            Enter your PAN or GSTIN number
                                        </p>
                                    </motion.div>

                                    {/* Email */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <Label htmlFor="email" className="flex items-center gap-2 mb-2 text-sm font-semibold">
                                            <Mail className="w-4 h-4 text-blue-600" />
                                            Email Address
                                            <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="your.email@company.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className=""
                                            required
                                        />
                                    </motion.div>

                                    {/* Password (Optional) */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <Label htmlFor="password" className="flex items-center gap-2 mb-2 text-sm font-semibold">
                                            <Lock className="w-4 h-4 text-blue-600" />
                                            Password
                                            <span className="text-gray-500 text-xs font-normal">(Optional - use OTP login)</span>
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Create a password (optional)"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                className=" pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1.5">
                                            Skip this to always use OTP-based login
                                        </p>
                                    </motion.div>

                                    {/* Buttons */}
                                    <div className="flex gap-3 pt-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setStep(1)}
                                            className="flex-1"
                                        >
                                            ← Back
                                        </Button>
                                        <motion.div
                                            className="flex-1"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button
                                                type="submit"
                                                className="w-full"
                                                size="lg"
                                            >
                                                Continue to Dashboard
                                                <ArrowRight className="w-5 h-5 ml-2" />
                                            </Button>
                                        </motion.div>
                                    </div>

                                    {/* Security Badge */}
                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 pt-4 border-t">
                                        <Shield className="w-4 h-4" />
                                        <span>256-bit SSL encryption</span>
                                    </div>
                                </form>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default OnboardingPage