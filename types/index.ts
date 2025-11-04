export interface BusinessData {
  businessName: string
  panGstin: string
  mobile: string
  email: string
  otp: string
}

export interface Document {
  id: string
  name: string
  type: 'bank_statement' | 'gst_return' | 'financial_statement'
  status: 'uploading' | 'uploaded' | 'processing' | 'processed' | 'failed'
  uploadProgress?: number
}

export interface CreditScore {
  score: number
  grade: 'Poor' | 'Fair' | 'Good' | 'Very Good' | 'Excellent'
  factors: {
    cashFlow: number
    gstCompliance: number
    bankingBehavior: number
    businessStability: number
  }
}

export interface LoanOffer {
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

export interface Application {
  id: string
  lenderId: string
  lenderName: string
  amount: number
  status: 'draft' | 'submitted' | 'processing' | 'approved' | 'rejected' | 'disbursed'
  submittedAt: Date
  updatedAt: Date
  progress: number
  nextAction?: string
}

export type Step = 
  | 'welcome'
  | 'onboarding'
  | 'consent'
  | 'upload'
  | 'credit-passport'
  | 'loan-matches'
  | 'dashboard'

export interface AnalysisMetrics {
  revenue?: number
  EBITDA?: number
  netProfit?: number
  DSCR?: number
  ITR_gross_receipts?: number
  bank_statements_trends?: string
}

export interface AnalysisEligibility {
  meetsDSCR?: boolean
  meetsCreditScore?: boolean
  meetsTurnover?: boolean
  eligible?: boolean
  reasons?: string[]
}

export interface AnalysisMatch {
  name: string
  reason: string
}

export interface AnalysisResult {
  score?: number
  metrics?: AnalysisMetrics
  eligibility?: AnalysisEligibility
  recommendations?: string[]
  matches?: AnalysisMatch[]
  isFinancialDocument?: boolean
  error?: string
}