'use client'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Label } from '@/components/ui/Label'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Building2, FileText, Phone, Mail, ArrowRight, Shield, EyeOff, Eye, Lock } from 'lucide-react'
import { useAppStore } from '@/store/appStore'
import { useToast } from '@/hooks/use-toast'
import Navigation from '@/components/ui/landing/navbar'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const OnboardingPage = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        businessName: '',
        panGstin: '',
        mobile: '',
        email: '',
        password: '',
        otp: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState('')

    return (
        <div className="min-h-screen bg-gray-50">
            {/* <Navigation /> */}
            <div className="max-w-2xl mx-auto p-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to FundanFlow</h2>
                    <p className="text-gray-600">Let's get your business onboarded in just 2 minutes</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <Card className="p-8">
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <Label htmlFor="businessName" className="flex items-center gap-2 mb-2">
                                    <Building2 className="w-4 h-4 text-blue-600" />
                                    Business Name *
                                </Label>
                                <Input
                                    id="businessName"
                                    placeholder="Enter your registered business name"
                                // value={formData.businessName}
                                // onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <Label htmlFor="panGstin" className="flex items-center gap-2 mb-2">
                                    <FileText className="w-4 h-4 text-blue-600" />
                                    PAN/GSTIN *
                                </Label>
                                <Input
                                    id="panGstin"
                                    placeholder="Enter PAN or GSTIN number"
                                    // value={formData.panGstin}
                                    onChange={(e) => setFormData({ ...formData, panGstin: e.target.value })}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <Label htmlFor="mobile" className="flex items-center gap-2 mb-2">
                                    <Phone className="w-4 h-4 text-blue-600" />
                                    Mobile Number *
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="mobile"
                                        placeholder="Enter 10-digit mobile number"
                                        // value={formData.mobile}
                                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                    />
                                    <Button>Send OTP</Button>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                                    <Mail className="w-4 h-4 text-blue-600" />
                                    Email Address *
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your.email@company.com"
                                    // value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <Label htmlFor="password" className="flex items-center gap-2 mb-2">
                                    <Lock className="w-4 h-4 text-blue-600" />
                                    Password *
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
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
                                    onClick={() => router.push('/dashboard')}
                                >
                                    Continue to Dashboard
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                                className="flex items-center justify-center gap-2 text-sm text-gray-500"
                            >
                                <Shield className="w-4 h-4" />
                                <span>Your data is encrypted and secure</span>
                            </motion.div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}

export default OnboardingPage