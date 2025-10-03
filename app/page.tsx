'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/Progress'
import {
  Building2, Upload, Shield, TrendingUp, MessageCircle, FileText,
  CheckCircle, User, Phone, Mail, BarChart3, Clock, IndianRupee,
  Percent, Calendar, ArrowRight, Sparkles, Zap, Award,
  Users, Target, Menu, X, Star, Wallet, CreditCard
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const FundanFlowApp = () => {
  const [currentPage, setCurrentPage] = useState('landing')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    businessName: '',
    panGstin: '',
    mobile: '',
    email: '',
    otp: '',
    documents: []
  })

  const graphScoreData = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 68 },
    { month: 'Mar', score: 70 },
    { month: 'Apr', score: 69 },
    { month: 'May', score: 72 },
    { month: 'Jun', score: 72 }
  ]

  const loanOffers = [
    { lender: 'NBFC A', amount: '₹25L', rate: '14%', time: '3-5 days', type: 'Business Loan' },
    { lender: 'Bank B', amount: '₹20L', rate: '13.5%', time: '7-10 days', type: 'Working Capital' },
    { lender: 'NBFC C', amount: '₹15L', rate: '16%', time: '2-3 days', type: 'Equipment Loan' }
  ]

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 }
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  }

  const Navigation = () => (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentPage('landing')}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              FundanFlow
            </span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">How It Works</a>
            <a href="#who-we-serve" className="text-gray-700 hover:text-blue-600 transition-colors">Who We Serve</a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Testimonials</a>
            <Button variant="outline" onClick={() => setCurrentPage('login')}>Login</Button>
            <Button onClick={() => setCurrentPage('onboarding')}>Get Started</Button>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-gray-200"
            >
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-700 hover:text-blue-600">Features</a>
                <a href="#how-it-works" className="text-gray-700 hover:text-blue-600">How It Works</a>
                <a href="#who-we-serve" className="text-gray-700 hover:text-blue-600">Who We Serve</a>
                <a href="#testimonials" className="text-gray-700 hover:text-blue-600">Testimonials</a>
                <Button variant="outline" onClick={() => setCurrentPage('login')} className="w-full">Login</Button>
                <Button onClick={() => setCurrentPage('onboarding')} className="w-full">Get Started</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )

  const LandingPage = () => (
    <div className="min-h-screen bg-white">
      <Navigation />

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
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="text-lg px-8" onClick={() => setCurrentPage('onboarding')}>
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
        </div>
      </section>

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

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">FundanFlow</span>
              </div>
              <p className="text-sm">Empowering SMEs with instant credit access and smart financial solutions.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white">How It Works</a></li>
                <li><a href="#who-we-serve" className="hover:text-white">Who We Serve</a></li>
                <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
                <li><a href="#" className="hover:text-white">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© 2024 FundanFlow. All rights reserved. | RBI-AA Compliant Platform</p>
          </div>
        </div>
      </footer>

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
              Comprehensive tools and features to help SMEs access funding quickly and efficiently
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

      <motion.section
        id="testimonials"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700">Testimonials</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Thousands of SMEs</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Rajesh Kumar', company: 'Tech Solutions Pvt Ltd', text: 'FundanFlow helped us get ₹25L working capital in just 2 days. The process was incredibly smooth!', rating: 5 },
              { name: 'Priya Sharma', company: 'Fashion Boutique', text: 'Best platform for SME loans. The credit score feature helped me understand my eligibility clearly.', rating: 5 },
              { name: 'Amit Patel', company: 'Manufacturing Co', text: 'Transparent process, competitive rates, and excellent support. Highly recommended!', rating: 5 }
            ].map((review, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{review.text}"</p>
                <div>
                  <div className="font-bold">{review.name}</div>
                  <div className="text-sm text-gray-500">{review.company}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">Ready to Grow Your Business?</h2>
          <p className="text-xl mb-8 text-blue-100">Join thousands of SMEs getting funded through FundanFlow</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8" onClick={() => setCurrentPage('onboarding')}>
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8">
                Schedule a Demo
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  )

  const OnboardingPage = () => (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
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
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
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
                  value={formData.panGstin}
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
                    value={formData.mobile}
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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  onClick={() => setCurrentPage('dashboard')}
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

  const DashboardPage = () => (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {formData.businessName || 'Business Owner'}!</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-4"
            >
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Support
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { title: 'GraphScore', value: '72/100', icon: TrendingUp, color: 'blue' },
            { title: 'Available Offers', value: '3', icon: CreditCard, color: 'green' },
            { title: 'Max Loan Amount', value: '₹25L', icon: IndianRupee, color: 'purple' },
            { title: 'Best Interest Rate', value: '13.5%', icon: Percent, color: 'orange' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className={`p-6 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-${stat.color}-100 text-sm`}>{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className="w-8 h-8 opacity-80" />
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  GraphScore Trend
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={graphScoreData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[60, 80]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ r: 5, fill: '#3b82f6' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Top Loan Offers</CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <div className="space-y-4">
                  {loanOffers.map((offer, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{offer.lender}</span>
                        <Badge className="bg-blue-600 text-white">{offer.rate}</Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">{offer.amount} • {offer.type}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{offer.time}</span>
                        <Button size="sm">Apply</Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )

  const renderPage = () => {
    switch (currentPage) {
      case 'landing': return <LandingPage />
      case 'onboarding': return <OnboardingPage />
      case 'dashboard': return <DashboardPage />
      case 'login': return <OnboardingPage />
      default: return <LandingPage />
    }
  }

  return (
    <div className="font-sans">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default FundanFlowApp
