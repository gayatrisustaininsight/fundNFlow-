'use client'
import CreditPassportScreen from '@/components/Screens/CreditPassportScreen'
import LoanMatchesScreen from '@/components/Screens/LoanMatchesScreen'
import UploadScreen from '@/components/Screens/UploadDocuments'
import { Stepper } from '@/components/ui/Stepper'
import { useAppStore } from '@/store/appStore'
import React, { useEffect } from 'react'
import { useDocumentList } from '@/lib/api/documents'
import { Loader2, FileText, RefreshCw } from 'lucide-react'

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