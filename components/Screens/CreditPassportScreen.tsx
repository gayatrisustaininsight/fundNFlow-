'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/Progress'
import { TrendingUp, IndianRupee, Percent, Calendar, BarChart3 } from 'lucide-react'
import { useAppStore } from '@/store/appStore'
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { useState } from 'react'
import { LoanMatchesScreen } from './LoanMatchesScreen'

const mockCreditScore = {
    score: 72,
    grade: 'Good' as const,
    factors: {
        cashFlow: 78,
        gstCompliance: 85,
        bankingBehavior: 68,
        businessStability: 70,
    }
}

const mockCashFlowData = [
    { name: 'Inflow', value: 65, color: '#10b981' },
    { name: 'Outflow', value: 35, color: '#ef4444' },
]

const mockTrendData = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 68 },
    { month: 'Mar', score: 70 },
    { month: 'Apr', score: 69 },
    { month: 'May', score: 72 },
    { month: 'Jun', score: 72 }
]

export function CreditPassportScreen({ setIsCreditPassport }: { setIsCreditPassport: (isCreditPassport: boolean) => void }) {
    const { setCurrentStep, setCreditScore } = useAppStore()

    const handleViewLoanMatches = () => {
        setCreditScore(mockCreditScore)
        setCurrentStep('loan-matches')
        setIsCreditPassport(true)
    }

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600'
        if (score >= 60) return 'text-blue-600'
        if (score >= 40) return 'text-yellow-600'
        return 'text-red-600'
    }

    const getScoreBackground = (score: number) => {
        if (score >= 80) return 'bg-green-600'
        if (score >= 60) return 'bg-blue-600'
        if (score >= 40) return 'bg-yellow-600'
        return 'bg-red-600'
    }
    const [isLoanMatches, setIsLoanMatches] = useState(false)

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Credit Passport</h2>
                    <p className="text-gray-600">Your comprehensive business credit assessment</p>
                </div>

                {/* Main Credit Score */}
                <div className="mb-8">
                    <Card className="p-8 text-center bg-gradient-to-r from-blue-50 to-indigo-50">
                        <div className="flex items-center justify-center mb-6">
                            <div className="relative">
                                <div className={`text-6xl font-bold ${getScoreColor(mockCreditScore.score)} mb-2`}>
                                    {mockCreditScore.score}
                                </div>
                                <div className="text-lg text-gray-500">/ 100</div>
                            </div>
                        </div>
                        <Badge variant="outline" className="mb-4 text-lg px-4 py-2">
                            {mockCreditScore.grade} Credit Score
                        </Badge>
                        <div className="w-full max-w-md mx-auto">
                            <Progress
                                value={mockCreditScore.score}
                                className="h-3 mb-2"
                            />
                            <p className="text-sm text-gray-600">
                                Your GraphScore indicates good creditworthiness and loan eligibility
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                    <Card className="p-6">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <IndianRupee className="w-5 h-5 text-green-600" />
                                Cash Inflows
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600 mb-2">₹45L/yr</div>
                                <p className="text-sm text-gray-600 mb-4">Annual Cash Inflow</p>
                                <div className="h-24">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={mockCashFlowData}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={20}
                                                outerRadius={35}
                                            >
                                                {mockCashFlowData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="p-6">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Percent className="w-5 h-5 text-blue-600" />
                                GST-Bank Match
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600 mb-2">92%</div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                                    <div className="bg-green-600 h-2 rounded-full transition-all duration-1000" style={{ width: '92%' }} />
                                </div>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    Excellent Match
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="p-6">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Calendar className="w-5 h-5 text-purple-600" />
                                Invoice Cycle
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">58 days</div>
                                <p className="text-sm text-gray-600 mb-2">Average Payment Cycle</p>
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                    Good Collection
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="p-6">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <TrendingUp className="w-5 h-5 text-indigo-600" />
                                Score Trend
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-24 mb-2">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={mockTrendData}>
                                        <Line
                                            type="monotone"
                                            dataKey="score"
                                            stroke="#3b82f6"
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                +7 pts this month
                            </Badge>
                        </CardContent>
                    </Card>
                </div>

                {/* Detailed Analysis */}
                <div className="grid lg:grid-cols-2 gap-6 mb-8">
                    <Card className="p-6">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="w-5 h-5" />
                                Credit Factors Breakdown
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {Object.entries(mockCreditScore.factors).map(([key, value]) => (
                                    <div key={key} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium capitalize">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </span>
                                            <span className={`text-sm font-bold ${getScoreColor(value)}`}>
                                                {value}%
                                            </span>
                                        </div>
                                        <Progress value={value} className="h-2" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="p-6">
                        <CardHeader>
                            <CardTitle>Business Insights</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                    <h4 className="font-semibold text-green-800 mb-1">Strong Points</h4>
                                    <ul className="text-sm text-green-700 space-y-1">
                                        <li>• Excellent GST compliance record</li>
                                        <li>• Consistent cash flow patterns</li>
                                        <li>• Good payment collection efficiency</li>
                                    </ul>
                                </div>
                                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                    <h4 className="font-semibold text-yellow-800 mb-1">Areas for Improvement</h4>
                                    <ul className="text-sm text-yellow-700 space-y-1">
                                        <li>• Reduce invoice payment cycle</li>
                                        <li>• Maintain higher bank balances</li>
                                        <li>• Diversify revenue streams</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Action Button */}
                <div className="text-center">
                    <Button
                        size="lg"
                        className="px-8 py-4 text-lg"
                        onClick={handleViewLoanMatches}
                    >
                        View Loan Matches
                    </Button>
                </div>
            </div>
        </div>
    )
}

