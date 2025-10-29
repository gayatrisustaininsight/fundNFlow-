import api from '@/lib/api'
import { isCorsError, getCorsErrorMessage, API_CONFIG } from '@/lib/config/api'

export interface DocumentUploadResponse {
  success: boolean
  message: string
  data: {
    id: string
    filename: string
    originalName: string
    uploadedBy: string
    url: string
    createdAt: string
  }
}

export interface DocumentListParams {
  page?: number
  limit?: number
}

export interface DocumentListItem {
  id: string
  filename: string
  documentId: string
  originalName: string
  uploadedBy: string
  url: string
  createdAt: string
  updatedAt: string
  fileSize: number
  mimeType: string
}

export interface DocumentListResponse {
  success: boolean
  message: string
  data: {
    documents: DocumentListItem[]
    pagination: {
      page: number
      limit: number
      total: number
      totalPages: number
      hasNext: boolean
      hasPrev: boolean
    }
  }
}

export interface DocumentUploadParams {
  file: File
  uploadedBy: string
  filename?: string
}

export function useDocumentUpload() {
  const uploadDocument = async (params: DocumentUploadParams): Promise<DocumentUploadResponse> => {
    console.log('useDocumentUpload: Starting upload with params:', params)
    
    const formData = new FormData()
    formData.append('file', params.file)
    formData.append('uploadedBy', params.uploadedBy)
    
    if (params.filename) {
      formData.append('filename', params.filename)
    } else {
      formData.append('filename', params.file.name)
    }

    console.log('useDocumentUpload: FormData created')
    console.log('useDocumentUpload: FormData contents:')
    for (let [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value)
    }
    
    // Decode JWT token to verify user ID
    try {
      const authStorage = localStorage.getItem('auth-storage')
      if (authStorage) {
        const authData = JSON.parse(authStorage)
        const token = authData?.state?.token
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]))
          console.log('useDocumentUpload: JWT payload:', payload)
          console.log('useDocumentUpload: JWT user ID:', payload.id)
          console.log('useDocumentUpload: UploadedBy param:', params.uploadedBy)
          console.log('useDocumentUpload: User IDs match:', payload.id === params.uploadedBy)
        }
      }
    } catch (error) {
      console.error('useDocumentUpload: Error decoding JWT:', error)
    }
    
    console.log('useDocumentUpload: API base URL:', api.defaults.baseURL)
    console.log('useDocumentUpload: Making request to /documents/upload')

    try {
      const response = await api.post('/documents/upload', formData)
      
      console.log('useDocumentUpload: Response received:', response.data)
      return response.data
    } catch (error: any) {
      console.error('useDocumentUpload: Error occurred:', error)
      console.error('useDocumentUpload: Error response:', error.response?.data)
      
      // Enhanced CORS error handling
      if (isCorsError(error)) {
        console.error('🚨 CORS Error in document upload:', getCorsErrorMessage(error))
        console.error('🚨 Backend CORS configuration needs to be updated')
      }
      
      throw error
    }
  }

  return { uploadDocument }
}

export function useDocumentList() {
  const getDocumentList = async (params: DocumentListParams = {}): Promise<DocumentListResponse> => {
    const { page = 1, limit = 10 } = params
    
    console.log('useDocumentList: Fetching documents with params:', { page, limit })
    
    try {
      // Use the same backend port (5000) for document list API
      const response = await api.get('/documents', {
        params: { page, limit }
      })
      
      console.log('useDocumentList: Raw response received:', response.data)

      // Normalize backend response shape to UI expectations
      const raw = response.data as any

      // Some backends return: { success, data: [...], pagination: { page, limit, total, pages } }
      // We normalize to: { success, message, data: { documents: [...], pagination: { page, limit, total, totalPages, hasNext, hasPrev } } }
      const rawDocs: any[] = Array.isArray(raw?.data) ? raw.data : Array.isArray(raw?.data?.documents) ? raw.data.documents : []
      const rawPagination = raw?.pagination || raw?.data?.pagination || {}

      const documents: DocumentListItem[] = rawDocs.map((d: any) => ({
        id: d.id || d._id,
        filename: d.filename,
        originalName: d.originalName,
        uploadedBy: d.uploadedBy,
        documentId: d.documentId,
        // If backend returns relative url, keep as-is; consumer can prepend base if needed
        url: d.url,
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
        fileSize: d.fileSize ?? d.size ?? 0,
        mimeType: d.mimeType,
      }))

      const total = Number(rawPagination.total ?? documents.length)
      const totalPages = Number(rawPagination.totalPages ?? rawPagination.pages ?? Math.max(1, Math.ceil(total / limit)))
      const currentPage = Number(rawPagination.page ?? page)
      const currentLimit = Number(rawPagination.limit ?? limit)
      const hasNext = currentPage < totalPages
      const hasPrev = currentPage > 1

      const normalized: DocumentListResponse = {
        success: Boolean(raw?.success ?? true),
        message: raw?.message ?? 'ok',
        data: {
          documents,
          pagination: {
            page: currentPage,
            limit: currentLimit,
            total,
            totalPages,
            hasNext,
            hasPrev,
          },
        },
      }

      console.log('useDocumentList: Normalized response:', normalized)
      return normalized
    } catch (error: any) {
      console.error('useDocumentList: Error occurred:', error)
      console.error('useDocumentList: Error response:', error.response?.data)
      
      // Enhanced CORS error handling
      if (isCorsError(error)) {
        console.error('🚨 CORS Error in document list:', getCorsErrorMessage(error))
        console.error('🚨 Backend CORS configuration needs to be updated')
      }
      
      throw error
    }
  }

  return { getDocumentList }
}

export function useDocumentDelete() {
  const deleteDocument = async (documentId: string): Promise<boolean> => {
    console.log('useDocumentDelete: Deleting document:', documentId)
    try {
      const response = await api.delete(`/documents/${documentId}`)
      console.log('useDocumentDelete: Delete response:', response.data)
      return Boolean(response?.data?.success ?? true)
    } catch (error: any) {
      console.error('useDocumentDelete: Error occurred:', error)
      console.error('useDocumentDelete: Error response:', error.response?.data)
      if (isCorsError(error)) {
        console.error('🚨 CORS Error in document delete:', getCorsErrorMessage(error))
      }
      throw error
    }
  }

  return { deleteDocument }
}

export interface AIExtractionParams {
  files: Record<string, string> // Map of file types to full URLs
  userId: string
  applicationId?: string
  metadata?: {
    vintageYears?: number
    businessType?: string
    industry?: string
    loanAmount?: number
  }
  bankCriteria?: {
    minDSCR?: number
    minCreditScore?: number
    minTurnover?: number
  }
}

export interface AIExtractionResponse {
  success: boolean
  message: string
  data: {
    extractionId: string
    status: string
    results?: any
  }
}

export function useAIExtraction() {
  const extractData = async (params: AIExtractionParams): Promise<AIExtractionResponse> => {
    console.log('🤖 AI Extraction: Starting extraction with params:', params)
    
    try {
      const response = await api.post('/ai/jobs/extract', params)
      
      console.log('🤖 AI Extraction: Response received:', response.data)
      return response.data
    } catch (error: any) {
      console.error('🤖 AI Extraction: Error occurred:', error)
      console.error('🤖 AI Extraction: Error response:', error.response?.data)
      
      if (isCorsError(error)) {
        console.error('🚨 CORS Error in AI extraction:', getCorsErrorMessage(error))
      }
      
      throw error
    }
  }

  return { extractData }
}
