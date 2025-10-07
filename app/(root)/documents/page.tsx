'use client'
import { CreditPassportScreen } from '@/components/Screens/CreditPassportScreen'
import { LoanMatchesScreen } from '@/components/Screens/LoanMatchesScreen'
import { UploadScreen } from '@/components/Screens/UploadDocuments'
import { Stepper } from '@/components/ui/Stepper'
import { useAppStore } from '@/store/appStore'
import React, { useEffect } from 'react'

const DocumentsContent = () => {
    const { currentStep, setCurrentStep } = useAppStore()

    useEffect(() => {
        if (!(currentStep === 'upload' || currentStep === 'credit-passport' || currentStep === 'loan-matches')) {
            setCurrentStep('upload')
        }
    }, [currentStep, setCurrentStep])
    return (
        <div className='min-h-screen bg-gray-50 p-6'>
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