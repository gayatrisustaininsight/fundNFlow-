import { Building2 } from "lucide-react"


interface LoanOffer {
  id: string
  lenderName: string
  lenderType: 'Bank' | 'NBFC' | 'Fintech'
  amount: number
  interestRate: number
  processingTime: string
  loanType: string
  features: string[]
  eligibility: number
}

const mockLoanOffers: LoanOffer[] = [
  {
    id: '1',
    lenderName: 'HDFC Bank',
    lenderType: 'Bank',
    amount: 2500000,
    interestRate: 12.5,
    processingTime: '5-7 days',
    loanType: 'Business Loan',
    features: ['Low Interest', 'Flexible Tenure', 'Quick Disbursal'],
    eligibility: 95
  },
  {
    id: '2',
    lenderName: 'Bajaj Finance',
    lenderType: 'NBFC',
    amount: 2000000,
    interestRate: 14,
    processingTime: '3-5 days',
    loanType: 'Working Capital',
    features: ['Fast Approval', 'Minimal Documentation', 'Digital Process'],
    eligibility: 88
  },
  {
    id: '3',
    lenderName: 'Lendingkart',
    lenderType: 'Fintech',
    amount: 1500000,
    interestRate: 16,
    processingTime: '2-3 days',
    loanType: 'Business Loan',
    features: ['Same Day Approval', 'No Collateral', 'Flexible EMI'],
    eligibility: 82
  }
]

const LoanMatchesScreen = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="space-y-4 h-[calc(100vh-250px)] overflow-y-auto">
        {mockLoanOffers.map((offer) => (
          <div key={offer.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-12 gap-6 items-center">
              <div className="col-span-3">
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-bold text-gray-900">{offer.lenderName}</h3>
                    <div className="text-xs text-gray-500">{offer.lenderType}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">{offer.loanType}</div>
              </div>

              <div className="col-span-6 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">
                    ₹{(offer.amount / 100000).toFixed(1)}L
                  </div>
                  <div className="text-xs text-gray-500">Amount</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">{offer.interestRate}%</div>
                  <div className="text-xs text-gray-500">Interest</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-purple-600">{offer.processingTime}</div>
                  <div className="text-xs text-gray-500">Processing</div>
                </div>
              </div>

              <div className="col-span-3 text-center">
                <div className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200 mb-3">
                  {offer.eligibility}% Match
                </div>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                  Apply Now
                </button>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              {offer.features.map((feature, i) => (
                <div key={i} className="px-3 py-1 bg-gray-50 text-gray-700 rounded text-xs border border-gray-200">
                  {feature}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default LoanMatchesScreen