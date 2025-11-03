import { Building2, CheckCircle, AlertTriangle } from "lucide-react"
import { useAppStore } from '@/store/appStore'

const LoanMatchesScreen = () => {
  const { analysis } = useAppStore()
  const metrics = analysis?.metrics
  const matches = analysis?.matches || []

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="text-xs text-gray-600 mb-1">Score</div>
          <div className="text-3xl font-bold text-blue-600">{analysis?.score ?? '-'}</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="text-xs text-gray-600 mb-1">Eligibility</div>
          <div className="flex items-center gap-2">
            {analysis?.eligibility?.eligible ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600" />
            )}
            <div className="text-sm font-semibold text-gray-900">
              {analysis?.eligibility?.eligible ? 'Eligible' : 'Review'}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="text-xs text-gray-600 mb-1">DSCR</div>
          <div className="text-3xl font-bold text-gray-900">{metrics?.DSCR ?? '-'}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-5 mb-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Financial Metrics</h4>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
          <div>
            <div className="text-xs text-gray-600">Revenue</div>
            <div className="text-lg font-bold text-gray-900">₹{metrics ? Math.round((metrics.revenue || 0) / 100000) : 0}L</div>
          </div>
          <div>
            <div className="text-xs text-gray-600">EBITDA</div>
            <div className="text-lg font-bold text-gray-900">₹{metrics ? Math.round((metrics.EBITDA || 0) / 100000) : 0}L</div>
          </div>
          <div>
            <div className="text-xs text-gray-600">Net Profit</div>
            <div className="text-lg font-bold text-gray-900">₹{metrics ? Math.round((metrics.netProfit || 0) / 100000) : 0}L</div>
          </div>
          <div>
            <div className="text-xs text-gray-600">ITR Receipts</div>
            <div className="text-lg font-bold text-gray-900">₹{metrics ? Math.round((metrics.ITR_gross_receipts || 0) / 100000) : 0}L</div>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs text-gray-600">Bank Trend</div>
            <div className="text-sm font-medium text-gray-900">{metrics?.bank_statements_trends || '-'}</div>
          </div>
        </div>
      </div>

      <div className="space-y-4 h-[calc(100vh-350px)] overflow-y-auto">
        {matches.map((m, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Building2 className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-bold text-gray-900">{m.name}</h3>
                  <div className="text-xs text-gray-500">Recommended</div>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                Apply Now
              </button>
            </div>
            <div className="mt-3 text-sm text-gray-700">{m.reason}</div>
          </div>
        ))}
        {matches.length === 0 && (
          <div className="p-8 text-center bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
            No matches available.
          </div>
        )}
      </div>
    </div>
  )
}
export default LoanMatchesScreen