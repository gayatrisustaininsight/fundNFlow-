'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useToast } from '@/hooks/use-toast'
import { useDocumentUpload, DocumentUploadResponse } from '@/lib/api/documents'
import {
    Upload,
    FileText,
    CheckCircle,
    X,
    Loader2,
    AlertCircle,
    Download,
    Eye
} from 'lucide-react'

interface DocumentUploadProps {
    uploadedBy: string
    onUploadSuccess?: (response: DocumentUploadResponse) => void
    onUploadError?: (error: any) => void
    acceptedFileTypes?: string[]
    maxFileSize?: number // in MB
    className?: string
    disabled?: boolean
}

interface UploadedFile {
    id: string
    file: File
    url?: string
    status: 'uploading' | 'success' | 'error'
    error?: string
}

export function DocumentUpload({
    uploadedBy,
    onUploadSuccess,
    onUploadError,
    acceptedFileTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'],
    maxFileSize = 10, // 10MB default
    className = '',
    disabled = false
}: DocumentUploadProps) {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
    const [isDragOver, setIsDragOver] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { uploadDocument } = useDocumentUpload()
    const { toast } = useToast()

    const validateFile = (file: File): string | null => {
        // Check file size
        if (file.size > maxFileSize * 1024 * 1024) {
            return `File size must be less than ${maxFileSize}MB`
        }

        // Check file type
        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
        if (!acceptedFileTypes.includes(fileExtension)) {
            return `File type not supported. Accepted types: ${acceptedFileTypes.join(', ')}`
        }

        return null
    }

    const handleFileUpload = useCallback(async (files: FileList) => {
        const fileArray = Array.from(files)

        for (const file of fileArray) {
            const validationError = validateFile(file)

            if (validationError) {
                toast({
                    title: 'Upload Error',
                    description: validationError,
                    variant: 'destructive'
                })
                continue
            }

            const tempId = Math.random().toString(36).substr(2, 9)
            const uploadedFile: UploadedFile = {
                id: tempId,
                file,
                status: 'uploading'
            }

            setUploadedFiles(prev => [...prev, uploadedFile])

            try {
                const response = await uploadDocument({
                    file,
                    uploadedBy,
                    filename: file.name
                })

                setUploadedFiles(prev =>
                    prev.map(f =>
                        f.id === tempId
                            ? { ...f, status: 'success', url: response.data.url }
                            : f
                    )
                )

                onUploadSuccess?.(response)

                toast({
                    title: 'Upload Successful',
                    description: `${file.name} uploaded successfully`,
                    variant: 'default'
                })

            } catch (error: any) {
                setUploadedFiles(prev =>
                    prev.map(f =>
                        f.id === tempId
                            ? {
                                ...f,
                                status: 'error',
                                error: error?.response?.data?.message || 'Upload failed'
                            }
                            : f
                    )
                )

                onUploadError?.(error)

                toast({
                    title: 'Upload Failed',
                    description: error?.response?.data?.message || 'Failed to upload file',
                    variant: 'destructive'
                })
            }
        }
    }, [uploadDocument, uploadedBy, onUploadSuccess, onUploadError, toast, maxFileSize, acceptedFileTypes])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)

        if (disabled) return

        const files = e.dataTransfer.files
        if (files.length > 0) {
            handleFileUpload(files)
        }
    }, [handleFileUpload, disabled])

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        if (!disabled) {
            setIsDragOver(true)
        }
    }, [disabled])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
    }, [])

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            handleFileUpload(files)
        }
        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const removeFile = (id: string) => {
        setUploadedFiles(prev => prev.filter(f => f.id !== id))
    }

    const getFileIcon = (fileName: string) => {
        const extension = fileName.split('.').pop()?.toLowerCase()
        switch (extension) {
            case 'pdf':
                return <FileText className="w-5 h-5 text-red-500" />
            case 'jpg':
            case 'jpeg':
            case 'png':
                return <FileText className="w-5 h-5 text-blue-500" />
            case 'doc':
            case 'docx':
                return <FileText className="w-5 h-5 text-blue-600" />
            default:
                return <FileText className="w-5 h-5 text-gray-500" />
        }
    }

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Upload Area */}
            <Card
                className={`relative border-2 border-dashed transition-colors ${isDragOver
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => !disabled && fileInputRef.current?.click()}
            >
                <div className="p-8 text-center">
                    <motion.div
                        animate={{
                            scale: isDragOver ? 1.1 : 1,
                            rotate: isDragOver ? 5 : 0
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragOver ? 'text-blue-500' : 'text-gray-400'
                            }`} />
                    </motion.div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {isDragOver ? 'Drop files here' : 'Upload Documents'}
                    </h3>

                    <p className="text-gray-600 mb-4">
                        Drag and drop files here, or click to select files
                    </p>

                    <p className="text-sm text-gray-500">
                        Accepted formats: {acceptedFileTypes.join(', ')} (max {maxFileSize}MB)
                    </p>

                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept={acceptedFileTypes.join(',')}
                        onChange={handleFileInputChange}
                        className="hidden"
                        disabled={disabled}
                    />
                </div>
            </Card>

            {/* Uploaded Files List */}
            <AnimatePresence>
                {uploadedFiles.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                    >
                        <h4 className="text-sm font-semibold text-gray-700">Uploaded Files</h4>
                        {uploadedFiles.map((file) => (
                            <motion.div
                                key={file.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    {getFileIcon(file.file.name)}
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{file.file.name}</p>
                                        <p className="text-xs text-gray-500">
                                            {(file.file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {file.status === 'uploading' && (
                                        <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                                    )}

                                    {file.status === 'success' && (
                                        <div className="flex items-center gap-1">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            {file.url && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => window.open(file.url, '_blank')}
                                                    className="p-1 h-auto"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    )}

                                    {file.status === 'error' && (
                                        <AlertCircle className="w-4 h-4 text-red-500" />
                                    )}

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeFile(file.id)}
                                        className="p-1 h-auto text-gray-400 hover:text-red-500"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
