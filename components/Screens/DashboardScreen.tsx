'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/Progress'
import {
    BarChart3,
    TrendingUp,
    MessageCircle,
    Bell,
    CreditCard,
    FileText,
    IndianRupee,
    Clock,
    CheckCircle,
    AlertCircle,
    ArrowRight,
    Star,
    Zap
} from 'lucide-react'
import { useAppStore } from '@/store/appStore'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '@/lib/utils'

const mockGraphScoreData = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 68 },
    { month: 'Mar', score: 70 },
    { month: 'Apr', score: 69 },
    { month: 'May', score: 72 },
    { month: 'Jun', score: 72 }
]

const mockApplications = [
    {
        id: '1',
        lenderName: 'NBFC A',
        amount: 2500000,
        status: 'processing' as const,
        progress: 65,
        nextAction: 'Document verification in progress',
        submittedAt: new Date('2024-01-15')
    },
    {
        id: '2',
        lenderName: 'Bank B',
        amount: 2000000,
        status: 'approved' as const,
        progress: 100,
        nextAction: 'Ready for disbursement',
        submittedAt: new Date('2024-01-10')
    }
]

export function DashboardScreen() {
    const { creditScore, loanOffers, applications, businessData } = useAppStore()

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'bg-green-600'
            case 'processing':
                return 'bg-blue-600'
            case 'rejected':
                return 'bg-red-600'
            default:
                return 'bg-gray-600'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved':
                return <CheckCircle className="w-4 h-4" />
            case 'processing':
                return <Clock className="w-4 h-4" />
            case 'rejected':
                return <AlertCircle className="w-4 h-4" />
            default:
                return <FileText className="w-4 h-4" />
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm"
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-600">
                            Welcome back, {businessData.businessName || 'Business Owner'}!
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex items-center gap-4"
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline" size="sm">
                                <Bell className="w-4 h-4 mr-2" />
                                Notifications
                            </Button>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="relative"
                        >
                            <MessageCircle className="w-6 h-6 text-blue-600 cursor-pointer hover:text-blue-700" />
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.5 }}
                                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            <div className="max-w-7xl mx-auto p-6">
                {/* Quick Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="grid lg:grid-cols-4 gap-6 mb-8"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                    >
                        <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-600 text-sm font-medium">GraphScore</p>
                                    <motion.p
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        className="text-3xl font-bold text-blue-700"
                                    >
                                        {creditScore?.score || 72}
                                    </motion.p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-blue-600" />
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                    >
                        <Card className="p-6 bg-gradient-to-r from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-600 text-sm font-medium">Available Offers</p>
                                    <motion.p
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                        className="text-3xl font-bold text-green-700"
                                    >
                                        {loanOffers.length || 3}
                                    </motion.p>
                                </div>
                                <CreditCard className="w-8 h-8 text-green-600" />
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                    >
                        <Card className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-600 text-sm font-medium">Active Applications</p>
                                    <motion.p
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.6 }}
                                        className="text-3xl font-bold text-purple-700"
                                    >
                                        {applications.length || 2}
                                    </motion.p>
                                </div>
                                <FileText className="w-8 h-8 text-purple-600" />
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                    >
                        <Card className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-orange-600 text-sm font-medium">Max Loan Amount</p>
                                    <motion.p
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.7 }}
                                        className="text-3xl font-bold text-orange-700"
                                    >
                                        ₹25L
                                    </motion.p>
                                </div>
                                <IndianRupee className="w-8 h-8 text-orange-600" />
                            </div>
                        </Card>
                    </motion.div>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* GraphScore Trend */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5" />
                                    GraphScore Trend
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={mockGraphScoreData}>
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
                                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                                    <p className="text-sm text-green-700">
                                        <TrendingUp className="w-4 h-4 inline mr-1" />
                                        Your score has improved by 7 points this month. Keep maintaining good financial habits!
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Active Applications */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Active Applications</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {mockApplications.map((app) => (
                                        <div key={app.id} className="p-4 border border-gray-200 rounded-lg">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold">{app.lenderName}</span>
                                                    <Badge className={`${getStatusColor(app.status)} text-white`}>
                                                        {getStatusIcon(app.status)}
                                                        <span className="ml-1 capitalize">{app.status}</span>
                                                    </Badge>
                                                </div>
                                                <span className="font-semibold">{formatCurrency(app.amount)}</span>
                                            </div>
                                            <Progress value={app.progress} className="mb-2" />
                                            <p className="text-sm text-gray-600">{app.nextAction}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Loan Offers */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Available Offers</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-semibold">NBFC A</span>
                                            <Button size="sm" variant="outline">View</Button>
                                        </div>
                                        <div className="text-sm text-gray-600">₹25L @ 14%</div>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-semibold">Bank B</span>
                                            <Button size="sm" variant="outline">View</Button>
                                        </div>
                                        <div className="text-sm text-gray-600">₹20L @ 13.5%</div>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-semibold">NBFC C</span>
                                            <Button size="sm" variant="outline">View</Button>
                                        </div>
                                        <div className="text-sm text-gray-600">₹15L @ 16%</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Improvement Tips */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Improve Eligibility Tips</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="p-3 bg-blue-50 rounded-lg">
                                        <h4 className="font-semibold text-blue-800 mb-1">Maintain Regular Cash Flow</h4>
                                        <p className="text-sm text-blue-700">
                                            Keep consistent business transactions to improve your GraphScore
                                        </p>
                                    </div>
                                    <div className="p-3 bg-green-50 rounded-lg">
                                        <h4 className="font-semibold text-green-800 mb-1">File GST Returns on Time</h4>
                                        <p className="text-sm text-green-700">
                                            Timely GST filing improves your business credibility
                                        </p>
                                    </div>
                                    <div className="p-3 bg-yellow-50 rounded-lg">
                                        <h4 className="font-semibold text-yellow-800 mb-1">Reduce Invoice Cycle</h4>
                                        <p className="text-sm text-yellow-700">
                                            Faster payments improve working capital assessment
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Floating Chat Widget */}
            <div className="fixed bottom-6 right-6 z-50">
                <Button
                    className="rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow"
                    size="lg"
                >
                    <MessageCircle className="w-6 h-6" />
                </Button>
            </div>
        </div>
    )
}
