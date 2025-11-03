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
            <div className='w-full max-w-6xl mb-4'>
                <div className='flex items-center justify-between mb-3'>
                    <div className='flex items-center gap-2'>
                        <FileText className='w-5 h-5 text-blue-600' />
                        <div className='text-lg font-semibold text-gray-900'>Documents</div>
                        <div className='ml-2 px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-700 border border-blue-200'>
                            {loading ? 'Loading…' : `${total} files`}
                        </div>
                    </div>
                    <button onClick={load} className='inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white hover:bg-gray-50'>
                        {loading ? <Loader2 className='w-4 h-4 animate-spin' /> : <RefreshCw className='w-4 h-4' />}
                        Refresh
                    </button>
                </div>
                {total === 0 && !loading && (
                    <div className='w-full rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center'>
                        <div className='text-sm text-gray-600 mb-2'>No documents found</div>
                        <div className='text-xs text-gray-500 mb-4'>Upload documents to get started</div>
                        <button onClick={() => setCurrentStep('upload')} className='px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700'>
                            Upload Documents
                        </button>
                    </div>
                )}
                {recent.length > 0 && (
                    <div className='mb-4 bg-white rounded-lg border border-gray-200 p-4'>
                        <div className='text-xs font-semibold text-gray-700 mb-2'>Recent</div>
                        <div className='divide-y divide-gray-100'>
                            {recent.map(r => (
                                <div key={r.id} className='py-2 flex items-center justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <FileText className='w-4 h-4 text-gray-400' />
                                        <div className='text-sm text-gray-900 truncate max-w-[22rem]'>{r.originalName}</div>
                                    </div>
                                    <div className='text-xs text-gray-500'>{new Date(r.createdAt).toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
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