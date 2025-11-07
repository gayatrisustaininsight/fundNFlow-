'use client'
import CreditPassportScreen from '@/components/Screens/CreditPassportScreen'
import LoanMatchesScreen from '@/components/Screens/LoanMatchesScreen'
import UploadScreen from '@/components/Screens/UploadDocuments'
import { Stepper } from '@/components/ui/Stepper'
import { useAppStore } from '@/store/appStore'
import React, { useEffect } from 'react'
import { useDocumentList } from '@/lib/api/documents'
import { Loader2, FileText, RefreshCw, History } from 'lucide-react'
import Link from 'next/link'

const DocumentsContent = () => {
    const { currentStep, setCurrentStep } = useAppStore()
    const { getDocumentList } = useDocumentList()
    const [loading, setLoading] = React.useState(false)
    const [total, setTotal] = React.useState<number>(0)
    const [recent, setRecent] = React.useState<Array<{ id: string; originalName: string; createdAt: string }>>([])

    useEffect(() => {
        if (!(currentStep === 'upload' || currentStep === 'credit-passport' || currentStep === 'loan-matches')) {
            setCurrentStep('upload')
        }
    }, [currentStep, setCurrentStep])

    const load = async () => {
        setLoading(true)
        try {
            const res = await getDocumentList({ page: 1, limit: 5 })
            setTotal(res.data.pagination.total)
            setRecent(
                res.data.documents
                    .slice(0, 5)
                    .map(d => ({ id: d.id, originalName: d.originalName, createdAt: d.createdAt }))
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        load()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className='min-h-screen w-full bg-gray-50 p-6 flex flex-col items-center'>

            <Stepper />
            <div className="w-full max-w-6xl flex justify-end mb-4">
                <Link href="/documents/history" className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                    <History className="w-4 h-4" />
                    View Analysis History
                </Link>
            </div>
            {currentStep === 'upload' && (
                <UploadScreen />
            )}
            {currentStep === 'credit-passport' && (
                <CreditPassportScreen />
            )}
            {currentStep === 'loan-matches' && (
                <LoanMatchesScreen />
            )}
        </div>
    )
}

export default DocumentsContent