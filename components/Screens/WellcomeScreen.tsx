
"use client"
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Building, User, Shield, ArrowRight, CheckCircle } from 'lucide-react'
import { useAppStore } from '@/store/appStore'

export function WelcomeScreen() {
    const { setCurrentStep } = useAppStore()

    const features = [
        "Instant Credit Assessment",
        "50+ Bank & NBFC Partners",
        "RBI Compliant & Secure",
        "24-48 Hour Processing"
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex justify-center mb-6"
                    >
                        <Building className="w-16 h-16 text-blue-600" />
                    </motion.div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        SME Financial Platform
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Get instant credit assessment and loan matches for your business
                    </p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex items-center justify-center gap-2 mb-8"
                    >
                        <Shield className="w-6 h-6 text-blue-600" />
                        <span className="text-sm text-gray-600">RBI-AA Powered & Secure</span>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ y: -5 }}
                    >
                        <Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
                            <CardHeader className="text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <Building className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                                </motion.div>
                                <CardTitle>Sign up as SME</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-6 text-center">
                                    New to our platform? Register your business and get started with credit assessment.
                                </p>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        className="w-full"
                                        size="lg"
                                        onClick={() => setCurrentStep('onboarding')}
                                    >
                                        <div className="flex items-center gap-2">
                                            Get Started
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </Button>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        whileHover={{ y: -5 }}
                    >
                        <Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
                            <CardHeader className="text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                >
                                    <User className="w-12 h-12 text-green-600 mx-auto mb-4" />
                                </motion.div>
                                <CardTitle>Login</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-6 text-center">
                                    Already have an account? Access your dashboard and loan applications.
                                </p>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        size="lg"
                                        onClick={() => setCurrentStep('dashboard')}
                                    >
                                        <div className="flex items-center gap-2">
                                            Sign In
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </Button>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center"
                >
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">Why Choose Us?</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm"
                            >
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                <span className="text-sm font-medium text-gray-700">{feature}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}