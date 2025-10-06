'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/badge'
import { Clock, TrendingUp, Building2, Banknote, Percent, CheckCircle, ArrowRight, Star } from 'lucide-react'
import { useAppStore } from '@/store/appStore'
import { formatCurrency } from '@/lib/utils'
import { LoanOffer } from '@/types'

const mockLoanOffers: LoanOffer[] = [
  {
    id: '1',
    lenderName: 'NBFC A',
    lenderType: 'NBFC',
    amount: 2500000,
    interestRate: 14,
    processingTime: '3-5 days',
    loanType: 'Business Loan',
    features: ['Quick Processing', 'Minimal Documentation', 'Flexible Repayment'],
    eligibility: 95
  },
  {
    id: '2',
    lenderName: 'Bank B',
    lenderType: 'Bank',
    amount: 2000000,
    interestRate: 13.5,
    processingTime: '7-10 days',
    loanType: 'Working Capital',
    features: ['Lower Interest Rate', 'Longer Tenure', 'Banking Relationship'],
    eligibility: 88
  },
  {
    id: '3',
    lenderName: 'NBFC C',
    lenderType: 'NBFC',
    amount: 1500000,
    interestRate: 16,
    processingTime: '2-3 days',
    loanType: 'Equipment Loan',
    features: ['Same Day Approval', 'Digital Process', 'Collateral Free'],
    eligibility: 92
  }
]

export function LoanMatchesScreen({ setIsLoanMatches }: { setIsLoanMatches?: (isLoanMatches: boolean) => void }) {
  const { setCurrentStep, setLoanOffers, addApplication } = useAppStore()

  const handleApplyLoan = (offer: LoanOffer) => {
    const application = {
      id: Math.random().toString(36).substr(2, 9),
      lenderId: offer.id,
      lenderName: offer.lenderName,
      amount: offer.amount,
      status: 'draft' as const,
      submittedAt: new Date(),
      updatedAt: new Date(),
      progress: 10,
      nextAction: 'Complete application form'
    }

    addApplication(application)
    // Navigate to application or show success message
  }

  const getEligibilityColor = (eligibility: number) => {
    if (eligibility >= 90) return 'text-green-600 bg-green-50 border-green-200'
    if (eligibility >= 75) return 'text-blue-600 bg-blue-50 border-blue-200'
    if (eligibility >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  const getLenderIcon = (type: LoanOffer['lenderType']) => {
    switch (type) {
      case 'Bank':
        return <Building2 className="w-6 h-6 text-blue-600" />
      case 'NBFC':
        return <TrendingUp className="w-6 h-6 text-green-600" />
      case 'Fintech':
        return <Banknote className="w-6 h-6 text-purple-600" />
      default:
        return <Building2 className="w-6 h-6 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
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
            <Star className="w-12 h-12 text-yellow-500" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Loan Matches</h2>
          <p className="text-gray-600">Best loan offers matched to your business profile</p>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-2xl font-bold text-blue-600 mb-1">{mockLoanOffers.length}</div>
              <div className="text-gray-600">Matched Offers</div>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {formatCurrency(Math.max(...mockLoanOffers.map(o => o.amount)))}
              </div>
              <div className="text-gray-600">Maximum Amount</div>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {Math.min(...mockLoanOffers.map(o => o.interestRate))}%
              </div>
              <div className="text-gray-600">Best Rate Available</div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Loan Offers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 mb-8"
        >
          {mockLoanOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="grid lg:grid-cols-12 gap-6 items-center">
                    {/* Lender Info */}
                    <div className="lg:col-span-3">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        className="flex items-center gap-3 mb-2"
                      >
                        {getLenderIcon(offer.lenderType)}
                        <div>
                          <h3 className="font-bold text-lg">{offer.lenderName}</h3>
                          <Badge variant="outline" className="text-xs">
                            {offer.lenderType}
                          </Badge>
                        </div>
                      </motion.div>
                      <p className="text-sm text-gray-600">{offer.loanType}</p>
                    </div>

                    {/* Loan Details */}
                    <div className="lg:col-span-6">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        className="grid md:grid-cols-3 gap-4"
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="text-center"
                        >
                          <div className="text-2xl font-bold text-green-600">
                            {formatCurrency(offer.amount)}
                          </div>
                          <p className="text-sm text-gray-600">Loan Amount</p>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="text-center"
                        >
                          <div className="text-2xl font-bold text-blue-600 flex items-center justify-center gap-1">
                            {offer.interestRate}
                            <Percent className="w-4 h-4" />
                          </div>
                          <p className="text-sm text-gray-600">Interest Rate</p>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="text-center"
                        >
                          <div className="text-lg font-semibold text-purple-600 flex items-center justify-center gap-1">
                            <Clock className="w-4 h-4" />
                            {offer.processingTime}
                          </div>
                          <p className="text-sm text-gray-600">Processing Time</p>
                        </motion.div>
                      </motion.div>

                      {/* Features */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className="mt-4"
                      >
                        <div className="flex flex-wrap gap-2">
                          {offer.features.map((feature, featureIndex) => (
                            <motion.div
                              key={featureIndex}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 + featureIndex * 0.05 }}
                            >
                              <Badge variant="outline" className="text-xs bg-gray-50">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {feature}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Eligibility & Action */}
                    <div className="lg:col-span-3 text-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                        className={`inline-flex items-center px-3 py-2 rounded-full border mb-4 ${getEligibilityColor(offer.eligibility)}`}
                      >
                        <span className="text-sm font-semibold">{offer.eligibility}% Match</span>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          className="w-full"
                          onClick={() => handleApplyLoan(offer)}
                        >
                          <div className="flex items-center gap-2">
                            Apply Now
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              onClick={() => setIsLoanMatches?.(false)}
            >
              Back to Credit Passport
            </Button>
          </motion.div>
          {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              onClick={() => {
                setLoanOffers(mockLoanOffers)
                setCurrentStep('dashboard')
              }}
            >
              <div className="flex items-center gap-2">
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </div>
            </Button>
          </motion.div> */}
        </motion.div>
      </div>
    </div>
  )
}
