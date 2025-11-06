'use client'
import { Calendar, IndianRupee, Percent, TrendingUp, AlertTriangle, FileText, CheckCircle, XCircle } from "lucide-react"
import { useAppStore } from '@/store/appStore'

const CreditPassportScreen = ({ onNext }: { onNext?: () => void }) => {
    const { setCurrentStep, analysis } = useAppStore()
    const score = analysis?.score ?? 0
    const metrics = (analysis?.metrics || {}) as any
    const revenue = metrics.revenue || metrics.turnover || 0
    const dscr = metrics.dscr || metrics.DSCR || 0
    const ebitda = metrics.ebitda || metrics.EBITDA || 0
    const netProfit = metrics.net_profit || metrics.netProfit || 0
    const turnover = metrics.turnover || revenue
    const gstInvoices = metrics.gst_total_invoices || 0
    const monthlySales = metrics.monthly_sales_average || 0
    const cashFlow = metrics.cash_flow_net || 0
    const itrReceipts = metrics.itr_gross_receipts || metrics.ITR_gross_receipts
    const bankTrend = typeof metrics.bank_statement_trends === 'object'
        ? metrics.bank_statement_trends?.trend_summary || 'No data'
        : (metrics.bank_statement_trends || metrics.bank_statements_trends || 'No data')
    const outstandingLoans = metrics.outstanding_loans || 'Not reported'

    const eligibilityReasons = analysis?.eligibility?.reasons || []
    const improvements = analysis?.recommendations || []
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
                                    <div className="text-[11px] text-gray-600 mb-1">Revenue</div>
                                    <div className="text-xl font-extrabold text-gray-900">₹{Math.round(revenue / 1000)}K</div>
                                </div>
                                <div className="bg-white rounded-xl border border-gray-200 p-4">
                                    <div className="text-[11px] text-gray-600 mb-1">DSCR</div>
                                    <div className="text-xl font-extrabold text-gray-900">{dscr || '-'}</div>
                                </div>
                                <div className="bg-white rounded-xl border border-gray-200 p-4">
                                    <div className="text-[11px] text-gray-600 mb-1">EBITDA</div>
                                    <div className="text-xl font-extrabold text-gray-900">₹{Math.round(ebitda / 1000)}K</div>
                                </div>
                                <div className="bg-white rounded-xl border border-gray-200 p-4">
                                    <div className="text-[11px] text-gray-600 mb-1">Status</div>
                                    <div className={`text-xl font-extrabold ${analysis?.eligibility?.eligible ? 'text-emerald-700' : 'text-amber-700'}`}>{analysis?.eligibility?.eligible ? 'Eligible' : 'Review'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2 space-y-4 overflow-y-auto">
                        {eligibilityReasons.length > 0 && (
                            <div className="bg-white rounded-2xl border border-amber-200 p-5 shadow-sm">
                                <div className="flex items-start gap-3 mb-3">
                                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <div className="text-sm font-semibold text-gray-900 mb-2">Eligibility Status</div>
                                        <div className="space-y-2">
                                            {eligibilityReasons.map((reason, i) => (
                                                <div key={i} className="text-xs text-gray-700 bg-amber-50 p-2 rounded border border-amber-100">
                                                    {reason}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                            <div className="text-sm font-semibold text-gray-900 mb-3">Financial Metrics</div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                                    <div className="text-[11px] text-gray-600 mb-1">Annual Revenue</div>
                                    <div className="text-lg font-extrabold text-blue-700">₹{Math.round(revenue / 1000)}K</div>
                                </div>
                                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                                    <div className="text-[11px] text-gray-600 mb-1">Turnover</div>
                                    <div className="text-lg font-extrabold text-blue-700">₹{Math.round(turnover / 1000)}K</div>
                                </div>
                                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                                    <div className="text-[11px] text-gray-600 mb-1">EBITDA</div>
                                    <div className="text-lg font-extrabold text-blue-700">₹{Math.round(ebitda / 1000)}K</div>
                                </div>
                                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                                    <div className="text-[11px] text-gray-600 mb-1">Net Profit</div>
                                    <div className="text-lg font-extrabold text-blue-700">₹{Math.round(netProfit / 1000)}K</div>
                                </div>
                                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                                    <div className="text-[11px] text-gray-600 mb-1">GST Invoices</div>
                                    <div className="text-lg font-extrabold text-teal-700">₹{Math.round(gstInvoices / 1000)}K</div>
                                </div>
                                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                                    <div className="text-[11px] text-gray-600 mb-1">Monthly Sales Avg</div>
                                    <div className="text-lg font-extrabold text-teal-700">₹{Math.round(monthlySales / 1000)}K</div>
                                </div>
                                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                                    <div className="text-[11px] text-gray-600 mb-1">Cash Flow</div>
                                    <div className="text-lg font-extrabold text-teal-700">₹{Math.round(cashFlow / 1000)}K</div>
                                </div>
                                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                                    <div className="text-[11px] text-gray-600 mb-1">DSCR</div>
                                    <div className="text-lg font-extrabold text-gray-900">{dscr || '-'}</div>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-[11px] text-gray-600 mb-1">ITR Gross Receipts</div>
                                        <div className="text-sm font-semibold text-gray-900">{typeof itrReceipts === 'string' ? itrReceipts : itrReceipts ? `₹${Math.round(itrReceipts / 1000)}K` : 'Not available'}</div>
                                    </div>
                                    <div>
                                        <div className="text-[11px] text-gray-600 mb-1">Outstanding Loans</div>
                                        <div className="text-sm font-semibold text-gray-900">{typeof outstandingLoans === 'string' ? outstandingLoans : 'Not reported'}</div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <div className="text-[11px] text-gray-600 mb-1">Bank Statement Trend</div>
                                        <div className="text-sm font-semibold text-teal-700">{bankTrend}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                            <div className="text-sm font-semibold text-gray-900 mb-3">Recommendations</div>
                            <div className="space-y-2">
                                {improvements.length > 0 ? improvements.map((rec, i) => (
                                    <div key={i} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                        <div className="text-xs text-gray-700">{rec}</div>
                                    </div>
                                )) : (
                                    <div className="text-xs text-gray-500">No recommendations available</div>
                                )}
                            </div>
                        </div>
                        {analysis?.matches && analysis.matches.length > 0 && (
                            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                                <div className="text-sm font-semibold text-gray-900 mb-3">Loan Matches</div>
                                <div className="space-y-3">
                                    {analysis.matches.map((m: any, idx: number) => (
                                        <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-white">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <div className="text-sm font-semibold text-gray-900">{m.name}</div>
                                                        {m.eligible ? (
                                                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-700">Eligible</span>
                                                        ) : (
                                                            <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[10px] text-amber-700">Not Eligible</span>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-gray-600 mt-1">{m.reason}</div>
                                                    {m.estimatedAmount > 0 && (
                                                        <div className="text-xs text-blue-700 font-semibold mt-2">Estimated Amount: ₹{Math.round(m.estimatedAmount / 1000)}K</div>
                                                    )}
                                                </div>
                                            </div>
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
                                View All Loan Matches
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CreditPassportScreen
