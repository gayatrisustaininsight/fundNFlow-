'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/appStore'
import { OnboardingScreen } from '@/components/Screens/OnBoardingScreen'
import { LoanMatchesScreen } from '@/components/Screens/LoanMatchesScreen'
import { DashboardScreen } from '@/components/Screens/DashboardScreen'
import { CreditPassportScreen } from '@/components/Screens/CreditPassportScreen'
import { UploadScreen } from '@/components/Screens/UploadDocuments'
import { WelcomeScreen } from '@/components/Screens/WellcomeScreen'

const pageVariants = {
    initial: {
        opacity: 0,
        x: 20,
    },
    in: {
        opacity: 1,
        x: 0,
    },
    out: {
        opacity: 0,
        x: -20,
    },
}

const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
}

export function App() {
    const { currentStep } = useAppStore()

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 'welcome':
                return <WelcomeScreen />
            case 'onboarding':
                return <OnboardingScreen />
            case 'consent':
                return <UploadScreen />
            case 'upload':
                return <UploadScreen />
            case 'credit-passport':
                return <CreditPassportScreen />
            case 'loan-matches':
                return <LoanMatchesScreen />
            case 'dashboard':
                return <DashboardScreen />
            default:
                return <WelcomeScreen />
        }
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={currentStep}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                // transition={pageTransition}
                className="min-h-screen"
            >
                {renderCurrentStep()}
            </motion.div>
        </AnimatePresence>
    )
}

