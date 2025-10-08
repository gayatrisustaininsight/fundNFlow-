'use client'
import CreditPassportScreen from '@/components/Screens/CreditPassportScreen'
import { useAppStore } from '@/store/appStore'
import React from 'react'

const page = () => {
    const { setCurrentStep } = useAppStore()
    return (
        <CreditPassportScreen onNext={() => setCurrentStep('loan-matches')} />
    )
}

export default page