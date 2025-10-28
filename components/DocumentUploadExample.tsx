'use client'

import { useState } from 'react'
import { DocumentUpload } from '@/components/ui/DocumentUpload'
import { useAuthStore } from '@/store/authStore'
import { DocumentUploadResponse } from '@/lib/api/documents'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FileText, Download } from 'lucide-react'

export function DocumentUploadExample() {
    const { user } = useAuthStore()
    const [uploadedDocuments, setUploadedDocuments] = useState<DocumentUploadResponse['data'][]>([])

    const handleUploadSuccess = (response: DocumentUploadResponse) => {
        setUploadedDocuments(prev => [...prev, response.data])
        console.log('Document uploaded successfully:', response)
    }

    const handleUploadError = (error: any) => {
        console.error('Document upload failed:', error)
    }

    if (!user) {
        return (
            <Card className="p-6 text-center">
                <p className="text-gray-600">Please log in to upload documents</p>
            </Card>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Document Upload</h2>
                <p className="text-gray-600">
                    Upload your business documents securely. All files are encrypted and stored safely.
                </p>
            </div>

            <DocumentUpload
                uploadedBy={user.id}
                onUploadSuccess={handleUploadSuccess}
                onUploadError={handleUploadError}
                acceptedFileTypes={['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx']}
                maxFileSize={10}
            />

            {/* Uploaded Documents List */}
            {uploadedDocuments.length > 0 && (
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Documents</h3>
                    <div className="space-y-3">
                        {uploadedDocuments.map((doc) => (
                            <div
                                key={doc.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-blue-500" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{doc.filename}</p>
                                        <p className="text-xs text-gray-500">
                                            Uploaded on {new Date(doc.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => window.open(doc.url, '_blank')}
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Download
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    )
}
