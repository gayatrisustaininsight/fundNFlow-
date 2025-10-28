'use client'

import { useState, useEffect } from 'react'
import { Upload, CheckCircle, FileText, X, File, TrendingUp, Building2, Shield, Info, AlertCircle, Loader2 } from 'lucide-react'
import { useAppStore } from '@/store/appStore'
import { useAuthStore } from '@/store/authStore'
import { useDocumentUpload, useDocumentList, DocumentUploadResponse, DocumentListItem } from '@/lib/api/documents'
import { useToast } from '@/hooks/use-toast'

// Updated Document interface to match API response
interface Document {
    id: string
    name: string
    type: 'gst_return' | 'bank_statement' | 'financial'
    status: 'uploading' | 'uploaded' | 'processing' | 'processed' | 'failed'
    uploadProgress?: number
    file?: File
    url?: string
    error?: string
    uploadedAt?: string
}

type TabType = 'bank_statement' | 'gst_return' | 'financial'

const tabs = [
    { id: 'bank_statement' as TabType, label: 'Bank Statements', icon: TrendingUp, required: '12 months' },
    { id: 'gst_return' as TabType, label: 'GST Returns', icon: FileText, required: 'Latest returns' },
    { id: 'financial' as TabType, label: 'Financial Statements', icon: Building2, required: 'P&L, Balance Sheet' },
]

export default function UploadScreen() {
    const { setCurrentStep } = useAppStore()
    const { user } = useAuthStore()
    const { uploadDocument } = useDocumentUpload()
    const { getDocumentList } = useDocumentList()
    const { toast } = useToast()
    const [documents, setDocuments] = useState<Document[]>([])
    const [documentList, setDocumentList] = useState<DocumentListItem[]>([])
    const [activeTab, setActiveTab] = useState<TabType>('bank_statement')
    const [dragActive, setDragActive] = useState(false)
    const [loadingDocuments, setLoadingDocuments] = useState(false)

    // Fetch document list from API
    const fetchDocumentList = async () => {
        if (!user) return

        setLoadingDocuments(true)
        try {
            console.log('📋 Fetching document list on page load')
            const response = await getDocumentList({ page: 1, limit: 50 })

            console.log('📋 Document list fetched:', response.data.documents)
            setDocumentList(response.data.documents)

            // Convert API documents to local document format for display
            const localDocs: Document[] = response.data.documents.map((doc: DocumentListItem) => ({
                id: doc.id,
                name: doc.originalName,
                type: 'bank_statement' as TabType, // Default type, you can categorize based on filename
                status: 'uploaded' as const,
                url: doc.url,
                uploadedAt: doc.createdAt
            }))

            setDocuments(localDocs)

        } catch (error: any) {
            console.error('📋 Error fetching document list:', error)
            toast({
                title: 'Error Loading Documents',
                description: error?.response?.data?.message || 'Failed to load documents',
                variant: 'destructive'
            })
        } finally {
            setLoadingDocuments(false)
        }
    }

    // Load documents on page load and when user changes
    useEffect(() => {
        if (user) {
            console.log('🔄 User authenticated, loading documents')
            fetchDocumentList()
        }
    }, [user])

    const validateFile = (file: File): string | null => {
        // Check file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            return 'File size must be less than 10MB'
        }

        // Check file type
        const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx']
        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
        if (!allowedTypes.includes(fileExtension)) {
            return 'File type not supported. Accepted types: PDF, JPG, PNG, DOC, DOCX'
        }

        return null
    }

    const handleFileUpload = async (files: FileList | null) => {
        console.log('🚀 handleFileUpload called with:', files)
        console.log('👤 User:', user)
        console.log('🔑 Token check:', typeof window !== 'undefined' ?
            (() => {
                try {
                    const authStorage = localStorage.getItem('auth-storage')
                    if (authStorage) {
                        const authData = JSON.parse(authStorage)
                        return authData?.state?.token ? 'Present' : 'Missing'
                    }
                    return 'No auth storage'
                } catch {
                    return 'Error parsing auth'
                }
            })() : 'Server side'
        )

        if (!files || !user) {
            console.log('❌ No files or user, returning early')
            return
        }

        const fileArray = Array.from(files)
        console.log('Files to upload:', fileArray.length)

        for (const file of fileArray) {
            console.log('Processing file:', file.name, file.size)

            const validationError = validateFile(file)

            if (validationError) {
                console.log('Validation error:', validationError)
                toast({
                    title: 'Upload Error',
                    description: validationError,
                    variant: 'destructive'
                })
                continue
            }

            const document: Document = {
                id: Math.random().toString(36).substr(2, 9),
                name: file.name,
                type: activeTab,
                status: 'uploading',
                uploadProgress: 0,
                file: file
            }

            setDocuments(prev => [...prev, document])
            console.log('Document added to state:', document)

            try {
                console.log('Starting upload for:', file.name)
                console.log('Upload params:', {
                    file: file.name,
                    uploadedBy: user.id,
                    filename: file.name
                })

                // Simulate upload progress
                let progress = 0
                const progressInterval = setInterval(() => {
                    progress += 10
                    if (progress < 90) {
                        setDocuments(prev => prev.map(doc =>
                            doc.id === document.id ? { ...doc, uploadProgress: progress } : doc
                        ))
                    }
                }, 200)

                const response = await uploadDocument({
                    file,
                    uploadedBy: user.id,
                    filename: file.name
                })

                console.log('Upload response:', response)
                clearInterval(progressInterval)

                setDocuments(prev => prev.map(doc =>
                    doc.id === document.id
                        ? {
                            ...doc,
                            uploadProgress: 100,
                            status: 'uploaded',
                            url: response.data.url,
                            uploadedAt: response.data.createdAt
                        }
                        : doc
                ))

                toast({
                    title: 'Upload Successful',
                    description: `${file.name} uploaded successfully`,
                    variant: 'default'
                })

                // Refresh document list after successful upload
                console.log('🔄 Upload successful, refreshing document list')
                fetchDocumentList()

            } catch (error: any) {
                console.error('Upload error:', error)
                console.error('Error details:', {
                    message: error?.message,
                    response: error?.response?.data,
                    status: error?.response?.status
                })

                setDocuments(prev => prev.map(doc =>
                    doc.id === document.id
                        ? {
                            ...doc,
                            status: 'failed',
                            error: error?.response?.data?.message || 'Upload failed'
                        }
                        : doc
                ))

                toast({
                    title: 'Upload Failed',
                    description: error?.response?.data?.message || 'Failed to upload file',
                    variant: 'destructive'
                })
            }
        }
    }

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        console.log('🔄 Drag event:', e.type)
        setDragActive(e.type === 'dragenter' || e.type === 'dragover')
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        console.log('📦 Drop event:', e.dataTransfer.files)
        handleFileUpload(e.dataTransfer.files)
    }

    const currentTabDocs = documents.filter(d => d.type === activeTab)
    const totalDocs = documents.length
    const uploadedDocs = documents.filter(d => d.status === 'uploaded' || d.status === 'processed').length

    // Check if user is authenticated
    if (!user) {
        return (
            <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
                    <p className="text-gray-600">Please log in to upload documents</p>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="w-full  h-full max-h-[90vh] bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col overflow-hidden">

                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Upload Documents</h1>
                            <p className="text-sm text-gray-500 mt-1">Select document type and upload your files</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <div className="text-2xl font-bold text-gray-900">{uploadedDocs}/{totalDocs}</div>
                                <div className="text-xs text-gray-500">Uploaded</div>
                            </div>
                            <button
                                onClick={fetchDocumentList}
                                disabled={loadingDocuments}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {loadingDocuments ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <FileText className="w-4 h-4" />
                                )}
                                Refresh
                            </button>
                            {totalDocs > 0 && (
                                <button
                                    onClick={() => setCurrentStep('credit-passport')}
                                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Continue
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 px-8">
                    <div className="flex gap-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon
                            const count = documents.filter(d => d.type === tab.id).length
                            const isActive = activeTab === tab.id
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all ${isActive
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="font-medium text-sm">{tab.label}</span>
                                    {count > 0 && (
                                        <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold ${isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {count}
                                        </span>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 max-h-[500px]">
                    <div className="h-full  grid grid-cols-2 divide-x divide-gray-200">

                        {/* Upload Area */}
                        <div className="p-8 flex flex-col">
                            <div className="mb-4 flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <div className="text-sm font-medium text-blue-900">
                                        {tabs.find(t => t.id === activeTab)?.label}
                                    </div>
                                    <div className="text-xs text-blue-700 mt-0.5">
                                        Required: {tabs.find(t => t.id === activeTab)?.required}
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`flex-1 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            // onClick={() => {
                            //     console.log('🖱️ Upload area clicked')
                            //     document.getElementById('fileUpload')?.click()
                            // }}
                            >
                                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                    <Upload className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Drop files here</h3>
                                <p className="text-sm text-gray-500 mb-6">or click to browse</p>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        console.log('📁 File input changed:', e.target.files)
                                        handleFileUpload(e.target.files)
                                    }}
                                    className="hidden"
                                    id="fileUpload"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    multiple
                                />
                                <button
                                    onClick={() => document.getElementById('fileUpload')?.click()}
                                    className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                                >
                                    Browse Files
                                </button>
                                <div className="mt-6 flex items-center gap-4 text-xs text-gray-400">
                                    <span>PDF, JPG, PNG</span>
                                    <span>•</span>
                                    <span>Max 10MB</span>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                                    <span>Bank secure</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Shield className="w-3.5 h-3.5 text-green-600" />
                                    <span>Encrypted</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                                    <span>Fast process</span>
                                </div>
                            </div>

                        </div>

                        {/* Files List */}
                        <div className="p-8 flex flex-col bg-gray-50   min-h-[500px] max-h-[500px] overflow-y-auto">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold text-gray-900">
                                    {currentTabDocs.length > 0 ? `${currentTabDocs.length} file${currentTabDocs.length !== 1 ? 's' : ''}` : 'No files yet'}
                                </h3>
                                {currentTabDocs.length > 0 && (
                                    <button
                                        onClick={() => setDocuments(prev => prev.filter(d => d.type !== activeTab))}
                                        className="text-xs text-gray-500 hover:text-gray-700"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-2">
                                {loadingDocuments ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-3" />
                                        <p className="text-sm font-medium text-gray-900 mb-1">Loading documents...</p>
                                        <p className="text-xs text-gray-500">Fetching from server</p>
                                    </div>
                                ) : currentTabDocs.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center">
                                        <div className="w-14 h-14 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center mb-3">
                                            <FileText className="w-7 h-7 text-gray-300" />
                                        </div>
                                        <p className="text-sm font-medium text-gray-900 mb-1">No files uploaded</p>
                                        <p className="text-xs text-gray-500">Upload files to this category</p>
                                    </div>
                                ) : (
                                    currentTabDocs.map((doc) => (
                                        <div
                                            key={doc.id}
                                            className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow group"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded bg-gray-50 flex items-center justify-center flex-shrink-0">
                                                    <File className="w-5 h-5 text-gray-400" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                        {doc.status === 'uploading' && doc.uploadProgress !== undefined
                                                            ? `Uploading ${doc.uploadProgress}%`
                                                            : doc.status === 'uploaded'
                                                                ? 'Upload complete'
                                                                : doc.status === 'failed'
                                                                    ? doc.error || 'Upload failed'
                                                                    : 'Processing...'}
                                                    </p>
                                                    {doc.status === 'uploading' && doc.uploadProgress !== undefined && (
                                                        <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-blue-600 transition-all"
                                                                style={{ width: `${doc.uploadProgress}%` }}
                                                            />
                                                        </div>
                                                    )}
                                                    {doc.status === 'failed' && (
                                                        <div className="mt-1 text-xs text-red-600">
                                                            {doc.error || 'Upload failed'}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {doc.status === 'uploading' && (
                                                        <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                                                    )}
                                                    {doc.status === 'uploaded' && (
                                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                                    )}
                                                    {doc.status === 'failed' && (
                                                        <AlertCircle className="w-5 h-5 text-red-500" />
                                                    )}
                                                    <button
                                                        onClick={() => {
                                                            setDocuments(prev => prev.filter(d => d.id !== doc.id))
                                                            // Refresh document list after delete
                                                            console.log('🗑️ Document deleted, refreshing list')
                                                            fetchDocumentList()
                                                        }}
                                                        className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-100 rounded transition-opacity"
                                                    >
                                                        <X className="w-4 h-4 text-gray-400" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Summary */}
                            {totalDocs > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Total files across all tabs</span>
                                        <span className="font-semibold text-gray-900">{totalDocs}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}