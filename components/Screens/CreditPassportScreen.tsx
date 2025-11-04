'use client'
import { Calendar, IndianRupee, Percent, TrendingUp, AlertTriangle } from "lucide-react"
import { useAppStore } from '@/store/appStore'

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
        ...(analysis?.recommendations || []),
    ]
    const isInvalidDoc = analysis?.isFinancialDocument === false

    return (
        <div className="w-full max-w-6xl mx-auto">
            {isInvalidDoc ? (
                <div className="grid grid-cols-1 gap-6 h-[calc(100vh-250px)]">
                    <div className="bg-white rounded-2xl border border-red-200 p-6 shadow-sm">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5" />
                            <div className="flex-1">
                                <div className="text-lg font-semibold text-gray-900 mb-1">Unsupported document</div>
                                <div className="text-sm text-gray-600 mb-4">{analysis?.error || 'This document is not a financial document for SME loan assessment.'}</div>
                                {Array.isArray(analysis?.eligibility?.reasons) && analysis?.eligibility?.reasons.length > 0 && (
                                    <div className="mb-4">
                                        <div className="text-xs font-semibold text-gray-900 mb-1">Reasons</div>
                                        <ul className="text-xs text-gray-700 space-y-1 list-disc pl-4">
                                            {analysis?.eligibility?.reasons.map((r: string, i: number) => (
                                                <li key={i}>{r}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                    <div className="text-xs font-semibold text-yellow-800 mb-1">What to do next</div>
                                    <ul className="text-xs text-yellow-700 space-y-1 list-disc pl-4">
                                        {(improvements.length ? improvements : ['Please upload financial documents like ITR, GST returns, bank statements, or audited financials']).map((s, i) => (
                                            <li key={i}>{s}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <div className="text-sm font-semibold text-gray-900 mb-3">Upload financial documents</div>
                        <button
                            onClick={() => setCurrentStep('upload')}
                            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            Go to Upload Documents
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
                    <div className="lg:col-span-1 space-y-4">
                        <div className="sticky top-4 space-y-4">
                            <div className="bg-white rounded-2xl border border-gray-200 p-0 shadow-sm overflow-hidden">
                                <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500" />
                                <div className="p-6 text-center">
                                    <div className="text-xs text-gray-600 mb-2">Credit Score</div>
                                    <div className="text-6xl font-extrabold text-gray-900 mb-3">{score}</div>
                                    <div className="w-full bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
                                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${score}%` }} />
                                    </div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-200">
                                        {analysis?.eligibility?.eligible ? 'Healthy profile' : 'Needs attention'}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white rounded-xl border border-gray-200 p-4">
                                    <div className="text-[11px] text-gray-600 mb-1">Cash Inflows</div>
                                    <div className="text-xl font-extrabold text-gray-900">₹{Math.round(revenue / 100000)}L</div>
                                </div>
                                <div className="bg-white rounded-xl border border-gray-200 p-4">
                                    <div className="text-[11px] text-gray-600 mb-1">GST-Bank Match</div>
                                    <div className="text-xl font-extrabold text-blue-700">{Math.min(99, Math.round(score + 14))}%</div>
                                </div>
                                <div className="bg-white rounded-xl border border-gray-200 p-4">
                                    <div className="text-[11px] text-gray-600 mb-1">Payment Cycle</div>
                                    <div className="text-xl font-extrabold text-gray-900">{dscr}</div>
                                </div>
                                <div className="bg-white rounded-xl border border-gray-200 p-4">
                                    <div className="text-[11px] text-gray-600 mb-1">Status</div>
                                    <div className="text-xl font-extrabold {analysis?.eligibility?.eligible ? 'text-emerald-700' : 'text-amber-700'}">{analysis?.eligibility?.eligible ? 'Eligible' : 'Review'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2 space-y-4 overflow-y-auto">
                        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                            <div className="text-sm font-semibold text-gray-900 mb-3">Score Breakdown</div>
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
                                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-teal-600" style={{ width: `${factor.value}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                            <div className="text-sm font-semibold text-gray-900 mb-3">Insights</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                                    <div className="text-xs font-semibold text-emerald-800 mb-1">Strengths</div>
                                    <ul className="text-xs text-gray-700 space-y-1">
                                        {strengths.map((s, i) => (
                                            <li key={i}>• {s}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="text-xs font-semibold text-blue-800 mb-1">Improvements</div>
                                    <ul className="text-xs text-gray-700 space-y-1">
                                        {(improvements.length ? improvements : ['Maintain healthy cash flow', 'Optimize costs']).map((s, i) => (
                                            <li key={i}>• {s}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {analysis?.matches && analysis.matches.length > 0 && (
                            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                                <div className="text-sm font-semibold text-gray-900 mb-3">Top Matches</div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {analysis.matches.slice(0, 3).map((m, idx) => (
                                        <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-white">
                                            <div className="text-sm font-semibold text-gray-900">{m.name}</div>
                                            <div className="text-xs text-gray-600 mt-1">{m.reason}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="flex items-center justify-end">
                            <button
                                onClick={() => setCurrentStep('loan-matches')}
                                className="px-4 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                View Loan Matches
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CreditPassportScreen
