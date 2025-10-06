'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { Upload, CheckCircle, FileText, AlertCircle } from 'lucide-react'
import { useAppStore } from '@/store/appStore'
import { useToast } from '@/hooks/use-toast'
import { Document } from '@/types'
import { CreditPassportScreen } from './CreditPassportScreen'
import AnalyzingScreen from './documents/anlysing'

export function UploadScreen({ setIsUploaded }: { setIsUploaded?: (isUploaded: boolean) => void }) {
    const { documents, addDocument, updateDocument, setCurrentStep } = useAppStore()
    const { toast } = useToast()
    const [dragActive, setDragActive] = useState(false)
    // const [isUploaded, setIsUploaded] = useState(false)

    const handleFileUpload = (files: FileList | null) => {
        if (!files) return

        Array.from(files).forEach((file) => {
            const document: Document = {
                id: Math.random().toString(36).substr(2, 9),
                name: file.name,
                type: file.name.toLowerCase().includes('gst') ? 'gst_return' : 'bank_statement',
                status: 'uploading',
                uploadProgress: 0,
            }

            addDocument(document)

            // Simulate file upload with proper typing
            let progress = 0
            const interval = setInterval(() => {
                progress += 10

                if (progress >= 100) {
                    clearInterval(interval)
                    updateDocument(document.id, {
                        uploadProgress: 100,
                        status: 'uploaded'
                    })
                } else {
                    updateDocument(document.id, {
                        uploadProgress: progress
                    })
                }
            }, 200)
        })
    }

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        handleFileUpload(e.dataTransfer.files)
    }

    const handleAnalyze = () => {

        if (documents.length === 0) {
            toast({
                title: "No documents",
                description: "Please upload at least one document to continue",
                variant: "destructive",
            })
            return
        }

        // Simulate document processing
        documents.forEach((doc) => {
            if (doc.status === 'uploaded') {
                updateDocument(doc.id, { status: 'processing' })
                setTimeout(() => {
                    updateDocument(doc.id, { status: 'processed' })
                }, 2000)
            }
        })

        setTimeout(() => {
            setCurrentStep('credit-passport')
        }, 3000)
        setIsUploaded?.(true)


    }

    const getStatusIcon = (status: Document['status']) => {
        switch (status) {
            case 'uploaded':
            case 'processed':
                return <CheckCircle className="w-4 h-4 text-green-600" />
            case 'uploading':
            case 'processing':
                return <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            case 'failed':
                return <AlertCircle className="w-4 h-4 text-red-600" />
            default:
                return <FileText className="w-4 h-4 text-gray-400" />
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Document Upload</h2>
                    <p className="text-gray-600">Upload your financial documents for analysis</p>
                </div>

                <Card className="p-8">
                    <div className="space-y-6">
                        <div
                            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                                }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Upload Documents</h3>
                            <p className="text-gray-600 mb-4">
                                Drag and drop files or click to browse
                            </p>
                            <p className="text-sm text-gray-500 mb-4">
                                Supported formats: PDF, JPG, PNG (Max 10MB per file)
                            </p>
                            <input
                                type="file"
                                onChange={(e) => handleFileUpload(e.target.files)}
                                className="hidden"
                                id="fileUpload"
                                accept=".pdf,.jpg,.jpeg,.png"
                                multiple
                            />
                            <Button onClick={() => document.getElementById('fileUpload')?.click()}>
                                Choose Files
                            </Button>
                        </div>

                        {documents.length > 0 && (
                            <div className="space-y-4">
                                <h4 className="font-semibold">Documents:</h4>
                                {documents.map((doc) => (
                                    <div key={doc.id} className="space-y-2">
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            {getStatusIcon(doc.status)}
                                            <div className="flex-1">
                                                <div className="font-medium">{doc.name}</div>
                                                <div className="text-sm text-gray-500 capitalize">
                                                    {doc.type.replace('_', ' ')} • {doc.status}
                                                </div>
                                            </div>
                                        </div>
                                        {doc.status === 'uploading' && doc.uploadProgress !== undefined && (
                                            <div className="px-3">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-sm font-medium">Uploading...</span>
                                                    <span className="text-sm text-gray-500">{doc.uploadProgress}%</span>
                                                </div>
                                                <Progress value={doc.uploadProgress} className="w-full" />
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <Button
                                    className="w-full mt-4"
                                    onClick={handleAnalyze}
                                    disabled={documents.some(doc => doc.status === 'uploading' || doc.status === 'processing')}
                                >
                                    {documents.some(doc => doc.status === 'processing') ? 'Processing...' : 'Analyze Documents'}
                                </Button>
                            </div>
                        )}

                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">Document Requirements:</h4>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Bank statements for the last 12 months</li>
                                <li>• GST returns for the last 12 months</li>
                                <li>• Latest financial statements (if available)</li>
                                <li>• All documents should be clear and readable</li>
                            </ul>
                        </div>
                    </div>
                </Card>
            </div>
            {
                documents.some(doc => doc.status === 'processing') && (
                    <AnalyzingScreen documents={documents} />
                )
            }
        </div>
    )
}

