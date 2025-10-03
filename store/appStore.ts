import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Step, BusinessData, Document, CreditScore, LoanOffer, Application } from '@/types'

interface AppState {
    currentStep: Step
    businessData: BusinessData
    documents: Document[]
    creditScore: CreditScore | null
    loanOffers: LoanOffer[]
    applications: Application[]
    isLoading: boolean

    // Actions
    setCurrentStep: (step: Step) => void
    updateBusinessData: (data: Partial<BusinessData>) => void
    addDocument: (document: Document) => void
    updateDocument: (id: string, updates: Partial<Document>) => void
    setCreditScore: (score: CreditScore) => void
    setLoanOffers: (offers: LoanOffer[]) => void
    addApplication: (application: Application) => void
    updateApplication: (id: string, updates: Partial<Application>) => void
    setLoading: (loading: boolean) => void
    reset: () => void
}

const initialBusinessData: BusinessData = {
    businessName: '',
    panGstin: '',
    mobile: '',
    email: '',
    otp: '',
}

export const useAppStore = create<AppState>()(
    persist(
        (set, get) => ({
            currentStep: 'welcome',
            businessData: initialBusinessData,
            documents: [],
            creditScore: null,
            loanOffers: [],
            applications: [],
            isLoading: false,

            setCurrentStep: (step) => set({ currentStep: step }),

            updateBusinessData: (data) =>
                set((state) => ({
                    businessData: { ...state.businessData, ...data },
                })),

            addDocument: (document) =>
                set((state) => ({
                    documents: [...state.documents, document],
                })),

            updateDocument: (id, updates) =>
                set((state) => ({
                    documents: state.documents.map((doc) =>
                        doc.id === id ? { ...doc, ...updates } : doc
                    ),
                })),

            setCreditScore: (score) => set({ creditScore: score }),

            setLoanOffers: (offers) => set({ loanOffers: offers }),

            addApplication: (application) =>
                set((state) => ({
                    applications: [...state.applications, application],
                })),

            updateApplication: (id, updates) =>
                set((state) => ({
                    applications: state.applications.map((app) =>
                        app.id === id ? { ...app, ...updates } : app
                    ),
                })),

            setLoading: (loading) => set({ isLoading: loading }),

            reset: () =>
                set({
                    currentStep: 'welcome',
                    businessData: initialBusinessData,
                    documents: [],
                    creditScore: null,
                    loanOffers: [],
                    applications: [],
                    isLoading: false,
                }),
        }),
        {
            name: 'sme-platform-storage',
            partialize: (state) => ({
                businessData: state.businessData,
                documents: state.documents,
                creditScore: state.creditScore,
                applications: state.applications,
            }),
        }
    )
)
