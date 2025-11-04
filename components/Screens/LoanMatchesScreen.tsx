import { Building2, CheckCircle, AlertTriangle } from "lucide-react"
import { useAppStore } from '@/store/appStore'

const LoanMatchesScreen = () => {
  const { analysis } = useAppStore()
  const metrics = analysis?.metrics
  const matches = analysis?.matches || []

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="rounded-2xl p-0 mb-6 bg-white border border-gray-200 text-gray-900 overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500" />
        <div className="p-6 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center">
              <div className="text-3xl font-extrabold text-blue-700">{analysis?.score ?? '-'}</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">Recommended Loan Matches</div>
              <div className="text-sm text-gray-500">Personalized based on your financial metrics</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold flex items-center gap-2 text-emerald-700">
              {analysis?.eligibility?.eligible ? 'Eligible' : 'Review'}
            </div>
            <div className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">DSCR {metrics?.DSCR ?? '-'}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div className="text-xs text-gray-600 mb-1">Score</div>
          <div className="text-3xl font-extrabold text-blue-700">{analysis?.score ?? '-'}</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div className="text-xs text-gray-600 mb-1">Eligibility</div>
          <div className="flex items-center gap-2">
            {analysis?.eligibility?.eligible ? (
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-700">Eligible</span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[11px] text-amber-700">Review</span>
            )}
            <div className="text-sm font-semibold text-gray-900">
              {analysis?.eligibility?.eligible ? 'Eligible' : 'Review'}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div className="text-xs text-gray-600 mb-1">DSCR</div>
          <div className="text-3xl font-extrabold text-gray-900">{metrics?.DSCR ?? '-'}</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6 shadow-sm">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Financial Metrics</h4>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
          {[
            { label: 'Revenue', value: metrics ? Math.round((metrics.revenue || 0) / 100000) : 0 },
            { label: 'EBITDA', value: metrics ? Math.round((metrics.EBITDA || 0) / 100000) : 0 },
            { label: 'Net Profit', value: metrics ? Math.round((metrics.netProfit || 0) / 100000) : 0 },
            { label: 'ITR Receipts', value: metrics ? Math.round((metrics.ITR_gross_receipts || 0) / 100000) : 0 }
          ].map((kpi) => (
            <div key={kpi.label} className="p-3 rounded-lg bg-gray-50 border border-gray-200">
              <div className="text-xs text-gray-600">{kpi.label}</div>
              <div className="text-lg font-extrabold text-blue-700">₹{kpi.value}L</div>
            </div>
          ))}
          <div className="md:col-span-2 p-3 rounded-lg bg-gray-50 border border-gray-200">
            <div className="text-xs text-gray-600">Bank Trend</div>
            <div className="text-sm font-semibold text-teal-700">{metrics?.bank_statements_trends || '-'}</div>
          </div>
        </div>
      </div>

      <div className="space-y-4 h-[calc(100vh-350px)] overflow-y-auto">
        {matches.map((m, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{m.name}</h3>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-50 border border-gray-200 text-gray-700">Recommended</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-700">{m.reason}</div>
                </div>
              </div>
              <button className="px-3.5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm">
                Apply Now
              </button>
            </div>
          </div>
        ))}
        {matches.length === 0 && (
          <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-200 text-sm text-gray-600">
            No matches available.
          </div>
        )}
      </div>
    </div>
  )
}
export default LoanMatchesScreen