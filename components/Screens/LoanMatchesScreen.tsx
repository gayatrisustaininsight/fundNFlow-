import { Building2, CheckCircle, AlertTriangle } from "lucide-react"
import { useAppStore } from '@/store/appStore'

const LoanMatchesScreen = () => {
  const { analysis } = useAppStore()
  const metrics = (analysis?.metrics || {}) as any
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
            <div className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">DSCR {metrics?.dscr || metrics?.DSCR || '-'}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <aside className="md:col-span-1 space-y-4 md:sticky md:top-4 self-start">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="text-xs text-gray-600 mb-1">Score</div>
            <div className="text-4xl font-extrabold text-blue-700">{analysis?.score ?? '-'}</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="text-xs text-gray-600 mb-2">Eligibility</div>
            <div className="flex items-center gap-2">
              {analysis?.eligibility?.eligible ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-700">Eligible</span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[11px] text-amber-700">Not Eligible</span>
              )}
              <div className="text-sm font-semibold text-gray-900">
                {analysis?.eligibility?.eligible ? 'Eligible' : 'Review'}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="text-xs text-gray-600 mb-1">DSCR</div>
            <div className="text-3xl font-extrabold text-gray-900">{metrics?.dscr || metrics?.DSCR || '-'}</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="text-xs text-gray-600 mb-3">Key Metrics</div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-600">Revenue</div>
                <div className="font-semibold text-blue-700">₹{metrics ? Math.round((metrics.revenue || metrics.turnover || 0) / 1000) : 0}K</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-600">EBITDA</div>
                <div className="font-semibold text-blue-700">₹{metrics ? Math.round((metrics.ebitda || metrics.EBITDA || 0) / 1000) : 0}K</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-600">Net Profit</div>
                <div className="font-semibold text-blue-700">₹{metrics ? Math.round((metrics.net_profit || metrics.netProfit || 0) / 1000) : 0}K</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-600">GST Invoices</div>
                <div className="font-semibold text-teal-700">₹{metrics ? Math.round((metrics.gst_total_invoices || 0) / 1000) : 0}K</div>
              </div>
              <div className="text-[11px] text-gray-600">Bank Trend</div>
              <div className="text-xs font-semibold text-teal-700">
                {typeof metrics?.bank_statement_trends === 'object'
                  ? metrics.bank_statement_trends?.trend_summary || 'No data'
                  : (metrics?.bank_statement_trends || metrics?.bank_statements_trends || '-')}
              </div>
            </div>
          </div>
        </aside>
        <section className="md:col-span-2 space-y-4 h-[calc(100vh-350px)] overflow-y-auto">
          {matches.map((m: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{m.name}</h3>
                      {m.eligible ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-700 font-semibold">Eligible</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[11px] text-amber-700 font-semibold">Not Eligible</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-700 mb-2">{m.reason}</div>
                    {m.estimatedAmount > 0 && (
                      <div className="text-xs text-blue-700 font-semibold">Estimated Amount: ₹{Math.round(m.estimatedAmount / 1000)}K</div>
                    )}
                  </div>
                </div>
                <button
                  className={`px-3.5 py-2 rounded-lg font-semibold transition-colors text-sm ${m.eligible
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-not-allowed'
                    }`}
                  disabled={!m.eligible}
                >
                  {m.eligible ? 'Apply Now' : 'Not Eligible'}
                </button>
              </div>
            </div>
          ))}
          {matches.length === 0 && (
            <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-200 text-sm text-gray-600">
              No matches available.
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
export default LoanMatchesScreen