'use client'
import CreditPassportScreen from '@/components/Screens/CreditPassportScreen'
import LoanMatchesScreen from '@/components/Screens/LoanMatchesScreen'
import UploadScreen from '@/components/Screens/UploadDocuments'
import { Stepper } from '@/components/ui/Stepper'
import { useAppStore } from '@/store/appStore'
import React, { useEffect } from 'react'
import { History } from 'lucide-react'
import Link from 'next/link'

const DocumentsContent = () => {
    const { currentStep, setCurrentStep } = useAppStore()

    useEffect(() => {
        if (!(currentStep === 'upload' || currentStep === 'credit-passport' || currentStep === 'loan-matches')) {
            setCurrentStep('upload')
        }
    }, [currentStep, setCurrentStep])
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