import { Calendar, IndianRupee, Percent, TrendingUp } from "lucide-react"
import { useAppStore } from '@/store/appStore'

// Credit Passport Screen
const CreditPassportScreen = ({ onNext }: { onNext?: () => void }) => {
    const { setCurrentStep, analysis } = useAppStore()
    const score = analysis?.score ?? 72
    const revenue = analysis?.metrics?.revenue ?? 0
    const dscr = analysis?.metrics?.DSCR ?? 0
    const trend = analysis?.metrics?.bank_statements_trends || 'Stable'
    const strengths = [
        analysis?.eligibility?.eligible ? 'Meets lender eligibility criteria' : 'Eligibility pending',
        analysis?.eligibility?.meetsDSCR ? 'Healthy DSCR' : 'Improve DSCR',
    ]
    const improvements = [
        ...(analysis?.recommendations?.slice(0, 2) || []),
    ]

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
                            <div className="text-2xl font-bold text-gray-900">₹{Math.round(revenue / 100000)}L</div>
                            <div className="text-xs text-gray-500">Estimated annual revenue</div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <Percent className="w-5 h-5 text-blue-600" />
                                <h4 className="text-sm font-semibold text-gray-900">GST-Bank Match</h4>
                            </div>
                            <div className="text-2xl font-bold text-green-600">{Math.min(99, Math.round(score + 14))}%</div>
                            <div className="text-xs text-gray-500">Model confidence</div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <Calendar className="w-5 h-5 text-purple-600" />
                                <h4 className="text-sm font-semibold text-gray-900">Payment Cycle</h4>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{dscr}</div>
                            <div className="text-xs text-gray-500">DSCR</div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <TrendingUp className="w-5 h-5 text-indigo-600" />
                                <h4 className="text-sm font-semibold text-gray-900">Score Trend</h4>
                            </div>
                            <div className="text-2xl font-bold text-green-600">{analysis?.eligibility?.eligible ? 'Eligible' : 'Review'}</div>
                            <div className="text-xs text-gray-500">{trend}</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-5">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Insights</h4>
                        <div className="space-y-3">
                            <div className="p-3 bg-green-50 rounded border border-green-200">
                                <h5 className="text-xs font-semibold text-green-800 mb-1">Strengths</h5>
                                <ul className="text-xs text-green-700 space-y-1">
                                    {strengths.map((s, i) => (
                                        <li key={i}>• {s}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
                                <h5 className="text-xs font-semibold text-yellow-800 mb-1">Improvements</h5>
                                <ul className="text-xs text-yellow-700 space-y-1">
                                    {(improvements.length ? improvements : ['Maintain healthy cash flow', 'Optimize costs']).map((s, i) => (
                                        <li key={i}>• {s}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {analysis?.matches && analysis.matches.length > 0 && (
                        <div className="bg-white rounded-lg border border-gray-200 p-5">
                            <h4 className="text-sm font-semibold text-gray-900 mb-3">Top Matches</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {analysis.matches.slice(0, 3).map((m, idx) => (
                                    <div key={idx} className="p-4 rounded border border-gray-200 bg-gray-50">
                                        <div className="text-sm font-semibold text-gray-900">{m.name}</div>
                                        <div className="text-xs text-gray-600 mt-1">{m.reason}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

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
