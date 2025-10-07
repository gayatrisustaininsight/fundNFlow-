import { motion } from "framer-motion"
import { Badge } from "../badge"
import { Sparkles } from "lucide-react"
import { Button } from "../Button"
import { ArrowRight } from "lucide-react"
import { CheckCircle } from "lucide-react"
import { Building2 } from "lucide-react"
import { Progress } from "../Progress"
import { useState } from "react"

const HeroSection = () => {
    const [currentPage, setCurrentPage] = useState('landing')
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
                                <Sparkles className="w-3 h-3 mr-1" />
                                AI-Powered Credit Assessment
                            </Badge>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                        >
                            Instant Credit Access for{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Growing SMEs
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-xl text-gray-600 mb-8"
                        >
                            Get matched with the best loan offers in minutes. Upload your documents,
                            get instant credit scoring, and access funding from 50+ lenders.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >

                            <Button size="lg" className="text-lg px-8" onClick={() => setCurrentPage('onboarding')}>
                                Get Started Free
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </motion.div>

                        <Button size="lg" variant="outline" className="text-lg px-8">
                            Watch Demo
                        </Button>
                    </motion.div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-8 flex items-center gap-8"
                >
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-gray-600">No Hidden Fees</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-gray-600">Quick Approval</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-gray-600">Secure Platform</span>
                    </div>
                </motion.div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
            >
                <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-2xl p-8"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold">Credit Assessment</h3>
                        <Badge className="bg-green-100 text-green-700">Live</Badge>
                    </div>
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Building2 className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <div className="font-semibold">Business Verified</div>
                                    <div className="text-sm text-gray-500">PAN & GST Validated</div>
                                </div>
                            </div>
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 1 }}
                            className="text-center"
                        >
                            <div className="text-5xl font-bold text-blue-600 mb-2">72/100</div>
                            <div className="text-gray-600 mb-4">GraphScore</div>
                            <Progress value={72} className="h-3" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.2 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <div className="p-3 bg-green-50 rounded-lg text-center">
                                <div className="text-2xl font-bold text-green-600">₹45L</div>
                                <div className="text-sm text-gray-600">Max Amount</div>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg text-center">
                                <div className="text-2xl font-bold text-blue-600">13.5%</div>
                                <div className="text-sm text-gray-600">Best Rate</div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
            </div >
        </section >
    )
}

export default HeroSection