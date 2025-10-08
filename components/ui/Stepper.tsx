'use client'
import React from 'react'
import { useAppStore } from '@/store/appStore'

const steps: { key: 'upload' | 'credit-passport' | 'loan-matches'; label: string }[] = [
    { key: 'upload', label: 'Upload' },
    { key: 'credit-passport', label: 'Credit Passport' },
    { key: 'loan-matches', label: 'Loan Matches' },
]

export function Stepper() {
    const { currentStep, setCurrentStep } = useAppStore()

    const stepIndex = steps.findIndex(s => s.key === currentStep)

    return (
        <div className="max-w-4xl mx-auto mb-6 w-full">
            <div className="flex items-center justify-center">
                {steps.map((step, index) => {
                    const isCompleted = index < stepIndex
                    const isActive = index === stepIndex
                    return (
                        <div key={step.key} className="flex items-center">
                            <button
                                className={`flex flex-col items-center text-sm ${isActive ? 'text-blue-700' : isCompleted ? 'text-green-700' : 'text-gray-500'}`}
                                onClick={() => {
                                    if (index <= stepIndex) setCurrentStep(step.key)
                                }}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${isActive ? 'bg-blue-600 text-white' : isCompleted ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>{index + 1}</div>
                                <span>{step.label}</span>
                            </button>
                            {index < steps.length - 1 && (
                                <div className={`w-20    h-1 mx-4 ${index < stepIndex ? 'bg-green-600' : 'bg-gray-200'}`} />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


