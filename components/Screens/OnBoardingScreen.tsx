'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Building, FileText, Phone, Mail, ArrowRight, CheckCircle } from 'lucide-react'
import { useAppStore } from '@/store/appStore'
import { useToast } from '@/hooks/use-toast'

export function OnboardingScreen() {
    const { businessData, updateBusinessData, setCurrentStep, setLoading, isLoading } = useAppStore()
    const { toast } = useToast()
    const [otpSent, setOtpSent] = useState(false)

    const handleInputChange = (field: string, value: string) => {
        updateBusinessData({ [field]: value })
    }

    const sendOTP = async () => {
        if (!businessData.mobile) {
            toast({
                title: "Error",
                description: "Please enter mobile number first",
                variant: "destructive",
            })
            return
        }

        setLoading(true)
        // Simulate API call
        setTimeout(() => {
            setLoading(false)
            setOtpSent(true)
            toast({
                title: "OTP Sent",
                description: `OTP has been sent to ${businessData.mobile}`,
            })
        }, 1500)
    }

    const handleContinue = () => {
        if (!businessData.businessName || !businessData.panGstin || !businessData.mobile || !businessData.email) {
            toast({
                title: "Error",
                description: "Please fill all required fields",
                variant: "destructive",
            })
            return
        }

        if (!businessData.otp) {
            toast({
                title: "Error",
                description: "Please enter OTP to verify your mobile number",
                variant: "destructive",
            })
            return
        }

        setCurrentStep('consent')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex justify-center mb-4"
                    >
                        <Building className="w-12 h-12 text-blue-600" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Business Onboarding</h2>
                    <p className="text-gray-600">Please provide your business details to continue</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <Card className="p-8 shadow-lg">
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <Label htmlFor="businessName" className="flex items-center gap-2 mb-2">
                                    <Building className="w-4 h-4" />
                                    Business Name *
                                </Label>
                                <Input
                                    id="businessName"
                                    placeholder="Enter your business name"
                                    value={businessData.businessName}
                                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <Label htmlFor="panGstin" className="flex items-center gap-2 mb-2">
                                    <FileText className="w-4 h-4" />
                                    PAN/GSTIN *
                                </Label>
                                <Input
                                    id="panGstin"
                                    placeholder="Enter PAN or GSTIN number"
                                    value={businessData.panGstin}
                                    onChange={(e) => handleInputChange('panGstin', e.target.value)}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <Label htmlFor="mobile" className="flex items-center gap-2 mb-2">
                                    <Phone className="w-4 h-4" />
                                    Mobile Number *
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="mobile"
                                        placeholder="Enter mobile number"
                                        value={businessData.mobile}
                                        onChange={(e) => handleInputChange('mobile', e.target.value)}
                                    />
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button onClick={sendOTP} disabled={isLoading}>
                                            {isLoading ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    Sending...
                                                </div>
                                            ) : (
                                                'Send OTP'
                                            )}
                                        </Button>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {otpSent && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Label htmlFor="otp" className="mb-2 flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        Mobile OTP *
                                    </Label>
                                    <Input
                                        id="otp"
                                        placeholder="Enter 6-digit OTP"
                                        value={businessData.otp}
                                        onChange={(e) => handleInputChange('otp', e.target.value)}
                                    />
                                </motion.div>
                            )}

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                                    <Mail className="w-4 h-4" />
                                    Email Address *
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter email address"
                                    value={businessData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    className="w-full"
                                    size="lg"
                                    onClick={handleContinue}
                                >
                                    <div className="flex items-center gap-2">
                                        Continue to Consent
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </Button>
                            </motion.div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}
