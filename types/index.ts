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
