import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Star } from 'lucide-react'
import { User } from 'lucide-react'
import { Upload } from 'lucide-react'
import { BarChart3 } from 'lucide-react'
import { Wallet } from 'lucide-react'
import { Building2 } from 'lucide-react'
import { CreditCard } from 'lucide-react'
import { Award } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import Navigation from '@/components/ui/landing/navbar'
import HeroSection from '@/components/ui/landing/heroSection'
import Feature from '@/components/ui/landing/feature'
import Footer from '@/components/ui/landing/footer'
import { useState } from 'react'
import Testimonial from '../ui/landing/testimonial'
const LandingPage = () => {
    const [currentPage, setCurrentPage] = useState('landing')
    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            <HeroSection />

            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="py-16 bg-white"
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: '50+', label: 'Lending Partners' },
                            { value: '₹500Cr+', label: 'Loans Disbursed' },
                            { value: '10k+', label: 'SMEs Funded' },
                            { value: '24hrs', label: 'Avg. Approval Time' }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>
            <Feature />




            <motion.section
                id="how-it-works"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="py-20 bg-white"
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-blue-100 text-blue-700">How It Works</Badge>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Funded in 4 Steps</h2>
                        <p className="text-xl text-gray-600">From signup to disbursement in 24-48 hours</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { icon: User, title: 'Sign Up', desc: 'Create your account with business details', color: 'blue' },
                            { icon: Upload, title: 'Upload Docs', desc: 'Submit bank statements and GST returns', color: 'green' },
                            { icon: BarChart3, title: 'Get Score', desc: 'Receive instant GraphScore assessment', color: 'purple' },
                            { icon: Wallet, title: 'Get Funded', desc: 'Choose offers and receive funds', color: 'orange' }
                        ].map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="relative text-center"
                            >
                                <div className={`w-16 h-16 bg-${step.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                                    <step.icon className={`w-8 h-8 text-${step.color}-600`} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-gray-600">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            <motion.section
                id="who-we-serve"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="py-20 bg-gray-50"
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-indigo-100 text-indigo-700">Who We Serve</Badge>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Built for Indian SMEs</h2>
                        <p className="text-xl text-gray-600">Tailored for multiple industries and business stages</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { icon: Building2, title: 'Manufacturing' },
                            { icon: CreditCard, title: 'Retail & D2C' },
                            { icon: Wallet, title: 'Services' },
                            { icon: Award, title: 'Startups' },
                        ].map((seg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="p-6 hover:shadow-xl transition-shadow">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                        <seg.icon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold">{seg.title}</h3>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            <Testimonial />

            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 "
            >
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-4xl font-bold mb-4 text-white">Ready to Grow Your Business?</h2>
                    <p className="text-xl mb-8 text-blue-100">Join thousands of SMEs getting funded through FundanFlow</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">

                        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8" onClick={() => setCurrentPage('onboarding')}>
                            Get Started Now
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>

                        <Button
                            variant="outline"
                        >
                            Schedule a Demo
                        </Button>
                    </div>
                </div>
            </motion.section >
            <Footer />
        </div >

    )
}
export default LandingPage