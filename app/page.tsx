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
import Navigation from '@/components/ui/landing/navbar'
import Footer from '@/components/ui/landing/footer'
import HeroSection from '@/components/ui/landing/heroSection'
import Feature from '@/components/ui/landing/feature'
import LandingPage from '@/components/Screens/LandingScreen'


const FundnFlowApp = () => {
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
      // case 'onboarding': return <OnboardingPage />
      case 'dashboard': return <DashboardPage />
      // case 'login': return <OnboardingPage />
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
        // transition={pageTransition}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default FundnFlowApp
