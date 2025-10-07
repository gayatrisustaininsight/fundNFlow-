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
    const [isAnalyzing, setIsAnalyzing] = useState(false)

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
        setIsAnalyzing(true)
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
                }, 1500)
                setIsUploaded?.(true)

            }
            else if (doc.status === 'processed') {
                setTimeout(() => {
                    setIsAnalyzing(false)
                    setIsUploaded?.(true)


                }, 800)
            }
        })
        setTimeout(() => {
            setIsAnalyzing(false)
            setCurrentStep('credit-passport')
        }, 2200)



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
            {isAnalyzing ? (
                <AnalyzingScreen documents={documents} />
            ) : (
                <div className="max-w-6xl mx-auto">
                    <div className="mb-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold mb-1">Upload Documents</h2>
                                <p className="text-white/80 text-sm">Securely upload your files to get AI-powered credit insights</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <Card className="p-8">
                                <div
                                    className={`rounded-2xl p-10 text-center transition-all border-2 border-dashed ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                >
                                    <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                                        <Upload className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Drag & drop your files</h3>
                                    <p className="text-sm text-gray-600 mb-5">PDF, JPG, PNG up to 10MB each</p>
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileUpload(e.target.files)}
                                        className="hidden"
                                        id="fileUpload"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        multiple
                                    />
                                    <Button onClick={() => document.getElementById('fileUpload')?.click()} className="px-6">
                                        Browse Files
                                    </Button>
                                </div>
                            </Card>
                        </div>

                        <div className="lg:sticky lg:top-6 h-fit">
                            <Card className="p-6">
                                <h4 className="font-semibold mb-3">Documents</h4>
                                {documents.length === 0 ? (
                                    <div className="text-sm text-gray-500">No files added yet</div>
                                ) : (
                                    <div className="space-y-3">
                                        {documents.map((doc) => (
                                            <div key={doc.id} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                                                <div className="flex items-center gap-3">
                                                    {getStatusIcon(doc.status)}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-medium truncate">{doc.name}</div>
                                                        <div className="text-xs text-gray-500 capitalize">
                                                            {doc.type.replace('_', ' ')} • {doc.status}
                                                        </div>
                                                    </div>
                                                </div>
                                                {doc.status === 'uploading' && doc.uploadProgress !== undefined && (
                                                    <div className="mt-3">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-xs text-gray-600">Uploading</span>
                                                            <span className="text-xs text-gray-500">{doc.uploadProgress}%</span>
                                                        </div>
                                                        <Progress value={doc.uploadProgress} />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Card>

                            <Card className="p-6 mt-4">
                                <h4 className="font-semibold mb-2">Guidelines</h4>
                                <ul className="text-sm text-gray-700 space-y-2">
                                    <li>• Bank statements for last 12 months</li>
                                    <li>• GST returns for last 12 months</li>
                                    <li>• Latest financial statements</li>
                                    <li>• Ensure documents are legible</li>
                                </ul>
                            </Card>
                        </div>
                    </div>

                    {documents.length > 0 && (
                        <div className="fixed bottom-6 left-0 right-0">
                            <div className="max-w-6xl mx-auto">
                                <Card className="p-4 shadow-lg">
                                    <div className="flex items-center gap-4">
                                        <div className="text-sm text-gray-600 flex-1">Ready to analyze your documents</div>
                                        <Button
                                            onClick={handleAnalyze}
                                            disabled={documents.some(doc => doc.status === 'uploading' || doc.status === 'processing')}
                                        >
                                            {documents.some(doc => doc.status === 'processing') ? 'Processing...' : 'Analyze Documents'}
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

