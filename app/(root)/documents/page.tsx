import { LoanMatchesScreen } from '@/components/Screens/LoanMatchesScreen'
import { UploadScreen } from '@/components/Screens/UploadDocuments'
import React from 'react'

const DocumentsContent = () => {
    return (
        <div className='flex  gap-4'>
            <UploadScreen />
            <LoanMatchesScreen />
        </div>
    )
}

export default DocumentsContent