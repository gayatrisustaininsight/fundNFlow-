'use client'

import { useState } from 'react'
import { Upload, CheckCircle, FileText, X, File, TrendingUp, Building2, Shield, Info } from 'lucide-react'
import { useAppStore } from '@/store/appStore'

// Mock types
interface Document {
    id: string
    name: string
    type: 'gst_return' | 'bank_statement' | 'financial'
    status: 'uploading' | 'uploaded' | 'processing' | 'processed' | 'failed'
    uploadProgress?: number
}

type TabType = 'bank_statement' | 'gst_return' | 'financial'

const tabs = [
    { id: 'bank_statement' as TabType, label: 'Bank Statements', icon: TrendingUp, required: '12 months' },
    { id: 'gst_return' as TabType, label: 'GST Returns', icon: FileText, required: 'Latest returns' },
    { id: 'financial' as TabType, label: 'Financial Statements', icon: Building2, required: 'P&L, Balance Sheet' },
]

export default function UploadScreen() {
    const { setCurrentStep } = useAppStore()
    const [documents, setDocuments] = useState<Document[]>([])
    const [activeTab, setActiveTab] = useState<TabType>('bank_statement')
    const [dragActive, setDragActive] = useState(false)

    const handleFileUpload = (files: FileList | null) => {
        if (!files) return
        Array.from(files).forEach((file) => {
            const document: Document = {
                id: Math.random().toString(36).substr(2, 9),
                name: file.name,
                type: activeTab,
                status: 'uploading',
                uploadProgress: 0,
            }
            setDocuments(prev => [...prev, document])
            let progress = 0
            const interval = setInterval(() => {
                progress += 10
                if (progress >= 100) {
                    clearInterval(interval)
                    setDocuments(prev => prev.map(doc =>
                        doc.id === document.id ? { ...doc, uploadProgress: 100, status: 'uploaded' } : doc
                    ))
                } else {
                    setDocuments(prev => prev.map(doc =>
                        doc.id === document.id ? { ...doc, uploadProgress: progress } : doc
                    ))
                }
            }, 200)
        })
    }

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(e.type === 'dragenter' || e.type === 'dragover')
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        handleFileUpload(e.dataTransfer.files)
    }

    const currentTabDocs = documents.filter(d => d.type === activeTab)
    const totalDocs = documents.length
    const uploadedDocs = documents.filter(d => d.status === 'uploaded' || d.status === 'processed').length

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
                <div className="flex-1 overflow-hidden">
                    <div className="h-full grid grid-cols-2 divide-x divide-gray-200">

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
                                className={`flex-1 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                    <Upload className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Drop files here</h3>
                                <p className="text-sm text-gray-500 mb-6">or click to browse</p>
                                <input
                                    type="file"
                                    onChange={(e) => handleFileUpload(e.target.files)}
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
                        <div className="p-8 flex flex-col bg-gray-50">
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
                                {currentTabDocs.length === 0 ? (
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
                                                        {doc.uploadProgress !== undefined && doc.uploadProgress < 100
                                                            ? `Uploading ${doc.uploadProgress}%`
                                                            : 'Upload complete'}
                                                    </p>
                                                    {doc.uploadProgress !== undefined && doc.uploadProgress < 100 && (
                                                        <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-blue-600 transition-all"
                                                                style={{ width: `${doc.uploadProgress}%` }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {(doc.status === 'uploaded' || doc.status === 'processed') && (
                                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                                    )}
                                                    <button
                                                        onClick={() => setDocuments(prev => prev.filter(d => d.id !== doc.id))}
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