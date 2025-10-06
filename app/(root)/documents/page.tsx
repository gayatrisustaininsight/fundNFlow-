'use client'
import { CreditPassportScreen } from '@/components/Screens/CreditPassportScreen'
import { LoanMatchesScreen } from '@/components/Screens/LoanMatchesScreen'
import { UploadScreen } from '@/components/Screens/UploadDocuments'
import React, { useState } from 'react'

const DocumentsContent = () => {
    const [isUploaded, setIsUploaded] = useState(false);
    const [isCreditPassport, setIsCreditPassport] = useState(false);
    const [isLoanMatches, setIsLoanMatches] = useState(false);
    return (
        <div>
            {
                !isUploaded && (
                    <div className=''>
                        <UploadScreen setIsUploaded={setIsUploaded} />
                    </div>
                )
            }


            {
                isUploaded && !isCreditPassport && (
                    <div className=''>
                        <CreditPassportScreen
                            setIsCreditPassport={setIsCreditPassport}
                        />
                    </div>
                )
            }
            {
                isCreditPassport && (
                    <div className=''>
                        <LoanMatchesScreen
                            setIsLoanMatches={setIsLoanMatches}
                        />
                    </div>
                )
            }


        </div>
    )
}

export default DocumentsContent