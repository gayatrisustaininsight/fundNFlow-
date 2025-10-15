import { motion } from "framer-motion"
import { Badge } from "../badge"
import { MessageCircle, Shield, Target, User, Zap } from "lucide-react"
import { Upload } from "lucide-react"
import { BarChart3 } from "lucide-react"
import { Wallet } from "lucide-react"
import { useState } from "react"
import { Card } from "../Card"

const Feature = () => {
    const [currentPage, setCurrentPage] = useState('landing')
    return (

        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            id="features"
            className="py-20 bg-gray-50"
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <Badge className="mb-4 bg-purple-100 text-purple-700">Features</Badge>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Grow</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Comprehensive Tools and Features to help SMEs access Funding Quickly and Efficiently
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: Zap, title: 'Instant Credit Scoring', desc: 'Get your GraphScore in minutes using AI-powered analysis of your financial documents', color: 'blue' },
                        { icon: Target, title: 'Smart Loan Matching', desc: 'AI matches you with the best loan offers from 50+ banks and NBFCs based on your profile', color: 'green' },
                        { icon: Shield, title: 'Bank-Grade Security', desc: '256-bit encryption and RBI-AA compliance ensures your data is completely secure', color: 'purple' },
                        { icon: Upload, title: 'Easy Document Upload', desc: 'Simple drag-and-drop interface with automatic OCR extraction and validation', color: 'orange' },
                        { icon: BarChart3, title: 'Real-time Analytics', desc: 'Track your applications, monitor credit score trends, and get improvement tips', color: 'indigo' },
                        { icon: MessageCircle, title: '24/7 Support', desc: 'Chat with our experts anytime for assistance with your loan applications', color: 'pink' }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                        >
                            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
                                <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                                    <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}

export default Feature