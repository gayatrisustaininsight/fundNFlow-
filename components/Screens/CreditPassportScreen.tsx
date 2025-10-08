import { Calendar, IndianRupee, Percent, TrendingUp } from "lucide-react"
import { useAppStore } from '@/store/appStore'

// Credit Passport Screen
const CreditPassportScreen = ({ onNext }: { onNext?: () => void }) => {
    const { setCurrentStep } = useAppStore()
    const score = 72

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-3 gap-6 h-[calc(100vh-250px)]">
                {/* Left - Score */}
                <div className="col-span-1 space-y-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                        <div className="text-5xl font-bold text-blue-600 mb-2">{score}</div>
                        <div className="text-sm text-gray-500 mb-4">Credit Score</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${score}%` }} />
                        </div>
                        <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                            Good Rating
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-5">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Score Breakdown</h4>
                        <div className="space-y-3">
                            {[
                                { label: 'Cash Flow', value: 78 },
                                { label: 'GST Compliance', value: 85 },
                                { label: 'Banking Behavior', value: 68 },
                                { label: 'Business Stability', value: 70 }
                            ].map((factor) => (
                                <div key={factor.label}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-600">{factor.label}</span>
                                        <span className="font-medium text-gray-900">{factor.value}%</span>
                                    </div>
                                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600" style={{ width: `${factor.value}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right - Metrics */}
                <div className="col-span-2 space-y-4 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg border border-gray-200 p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <IndianRupee className="w-5 h-5 text-green-600" />
                                <h4 className="text-sm font-semibold text-gray-900">Cash Inflows</h4>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">₹45L</div>
                            <div className="text-xs text-gray-500">Annual inflow</div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <Percent className="w-5 h-5 text-blue-600" />
                                <h4 className="text-sm font-semibold text-gray-900">GST-Bank Match</h4>
                            </div>
                            <div className="text-2xl font-bold text-green-600">92%</div>
                            <div className="text-xs text-gray-500">Excellent match</div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <Calendar className="w-5 h-5 text-purple-600" />
                                <h4 className="text-sm font-semibold text-gray-900">Payment Cycle</h4>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">58 days</div>
                            <div className="text-xs text-gray-500">Average collection</div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <TrendingUp className="w-5 h-5 text-indigo-600" />
                                <h4 className="text-sm font-semibold text-gray-900">Score Trend</h4>
                            </div>
                            <div className="text-2xl font-bold text-green-600">+7</div>
                            <div className="text-xs text-gray-500">This month</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-5">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Insights</h4>
                        <div className="space-y-3">
                            <div className="p-3 bg-green-50 rounded border border-green-200">
                                <h5 className="text-xs font-semibold text-green-800 mb-1">Strengths</h5>
                                <ul className="text-xs text-green-700 space-y-1">
                                    <li>• Excellent GST compliance</li>
                                    <li>• Consistent cash flow</li>
                                </ul>
                            </div>
                            <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
                                <h5 className="text-xs font-semibold text-yellow-800 mb-1">Improvements</h5>
                                <ul className="text-xs text-yellow-700 space-y-1">
                                    <li>• Reduce payment cycle</li>
                                    <li>• Maintain higher balances</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setCurrentStep('loan-matches')}
                        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        View Loan Matches
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreditPassportScreen
