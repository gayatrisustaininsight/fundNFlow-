'use client'

import { useEffect, useState, useRef } from 'react'
import { useAIJobs, AIJobStatusResponse } from '@/lib/api/documents'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Loader2, CheckCircle, AlertTriangle, Clock, X, FileText, StopCircle } from 'lucide-react'
import { useAppStore } from '@/store/appStore'

interface ExtractionMonitorProps {
    jobId: string
    onClose?: () => void
    refreshIntervalMs?: number
}

interface FileResult {
    status?: string
    error?: string
    url?: string
}

interface ResultsData {
    fileResults?: Record<string, FileResult>
    summary?: {
        totalFiles: number
        processedFiles: number
        successfulFiles: number
        failedFiles: number
    }
}

export default function ExtractionMonitor({ jobId, onClose, refreshIntervalMs = 4000 }: ExtractionMonitorProps) {
    const { getJobStatus } = useAIJobs()
    const { setCurrentStep, setAnalysis } = useAppStore()
    const [status, setStatus] = useState<AIJobStatusResponse['data'] | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const startTimeRef = useRef<number>(Date.now())
    const [elapsedTime, setElapsedTime] = useState(0)

    const terminal = (s?: string) => s === 'completed' || s === 'failed'

    const fetchStatus = async () => {
        setIsLoading(true)
        try {
            const res = await getJobStatus(jobId)
            setStatus(res.data)
            setError(null)
        } catch (e: any) {
            setError(e?.response?.data?.message || e?.message || 'Failed to fetch status')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchStatus()
        timerRef.current = setInterval(fetchStatus, refreshIntervalMs)
        startTimeRef.current = Date.now()
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [jobId, refreshIntervalMs])

    useEffect(() => {
        if (terminal(status?.status) && timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
        }
    }, [status?.status])

    useEffect(() => {
        if (status?.status === 'completed') {
            const analysis = (status.results as any)?.analysis
            if (analysis) {
                setAnalysis({
                    score: analysis.score,
                    metrics: analysis.metrics,
                    eligibility: analysis.eligibility,
                    recommendations: analysis.recommendations,
                    matches: analysis.matches,
                })
            }
            setCurrentStep('credit-passport')
            if (onClose) onClose()
        } else if (status?.status === 'failed') {
            setAnalysis(null)
            setCurrentStep('upload')
            if (onClose) onClose()
        }
    }, [status?.status])

    useEffect(() => {
        const interval = setInterval(() => {
            if (!terminal(status?.status)) {
                setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000))
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [status?.status])

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const getFileResults = (): ResultsData['fileResults'] => {
        if (!status?.results) return undefined

        if (status.results.fileResults) {
            return status.results.fileResults
        }

        if (typeof status.results === 'object' && 'fileResults' in status.results) {
            return (status.results as ResultsData).fileResults
        }

        return undefined
    }

    const getSummary = (): ResultsData['summary'] => {
        if (!status?.results) return undefined

        if (status.results.summary) {
            return status.results.summary
        }

        if (typeof status.results === 'object' && 'summary' in status.results) {
            return (status.results as ResultsData).summary
        }

        return undefined
    }

    const fileResults = getFileResults()
    const summary = getSummary()
    const allFiles = fileResults ? Object.keys(fileResults) : []
    const processedCount = summary?.processedFiles || (fileResults ? Object.keys(fileResults).length : 0)
    const totalCount = summary?.totalFiles || allFiles.length || 0

    const backendPct = (status as any)?.progress?.percentage
    const overallProgress = typeof backendPct === 'number'
        ? Math.max(0, Math.min(100, Math.round(backendPct)))
        : totalCount > 0
            ? Math.round((processedCount / totalCount) * 100)
            : (status?.status === 'completed' ? 100 : status?.status === 'running' ? 50 : 0)

    const getFileStatus = (fileResult: FileResult | undefined): 'processing' | 'success' | 'failed' => {
        if (!fileResult) return 'processing'
        const status = fileResult.status?.toLowerCase()
        if (status === 'failed' || fileResult.error) return 'failed'
        if (status === 'success' || status === 'completed' || status === 'extracted') return 'success'
        return 'processing'
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 px-6 py-5 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                                {status?.status === 'running' ? (
                                    <Loader2 className="w-7 h-7 text-white animate-spin" />
                                ) : status?.status === 'completed' ? (
                                    <CheckCircle className="w-7 h-7 text-white" />
                                ) : status?.status === 'failed' ? (
                                    <AlertTriangle className="w-7 h-7 text-white" />
                                ) : (
                                    <FileText className="w-7 h-7 text-white" />
                                )}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">Document Processing</h3>
                                <p className="text-sm text-blue-100 mt-0.5">
                                    {status?.status === 'running' ? 'Extracting data from documents...' : status?.status === 'completed' ? 'All documents processed successfully' : status?.status === 'failed' ? 'Processing failed' : 'Initializing...'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {status?.status === 'running' && (
                                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 border-white/30">
                                    <StopCircle className="w-4 h-4 mr-2" />
                                    Stop
                                </Button>
                            )}
                            {onClose && (
                                <Button variant="ghost" size="icon" onClick={onClose} className="h-9 w-9 text-white hover:bg-white/20 border-white/30">
                                    <X className="w-5 h-5" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border border-blue-100">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
                                            <span className="text-2xl font-bold text-blue-600">{overallProgress}%</span>
                                        </div>
                                        <div className={`absolute inset-0 rounded-full border-4 ${status?.status === 'failed' ? 'border-red-500' : status?.status === 'completed' ? 'border-green-500' : 'border-blue-500'}`} style={{ clipPath: `inset(0 ${100 - overallProgress}% 0 0)` }} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-600">Overall Progress</div>
                                        <div className="text-2xl font-bold text-gray-900">{processedCount} of {totalCount || 1} files</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <Clock className="w-5 h-5 text-gray-400 mb-1 mx-auto" />
                                    <div className="text-sm font-bold text-gray-700">{formatTime(elapsedTime)}</div>
                                    <div className="text-xs text-gray-500">Elapsed</div>
                                </div>
                            </div>

                            {fileResults && allFiles.length > 0 ? (
                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">File Status</h4>
                                    {allFiles.map((filename) => {
                                        const fileResult = fileResults[filename]
                                        const fileStatus = getFileStatus(fileResult)
                                        const isProcessing = fileStatus === 'processing'
                                        const isCurrent = isProcessing && allFiles.filter((f, i) => {
                                            const fs = getFileStatus(fileResults[f])
                                            return fs === 'processing'
                                        }).indexOf(filename) === 0
                                        const barGradient = fileStatus === 'success'
                                            ? 'from-green-500 to-green-600'
                                            : fileStatus === 'failed'
                                                ? 'from-red-500 to-red-600'
                                                : 'from-blue-500 to-blue-600'
                                        const containerClasses = fileStatus === 'success'
                                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 shadow-sm'
                                            : fileStatus === 'failed'
                                                ? 'bg-gradient-to-r from-red-50 to-rose-50 border-red-300 shadow-sm'
                                                : isCurrent
                                                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-400 shadow-md'
                                                    : 'bg-gray-50 border-gray-200'
                                        const iconBg = fileStatus === 'success' ? 'bg-green-500' : fileStatus === 'failed' ? 'bg-red-500' : 'bg-blue-500'
                                        const fileIconColor = fileStatus === 'success' ? 'text-green-600' : fileStatus === 'failed' ? 'text-red-600' : 'text-blue-600'
                                        const fileTitleColor = fileStatus === 'success' ? 'text-green-900' : fileStatus === 'failed' ? 'text-red-900' : 'text-blue-900'

                                        return (
                                            <div
                                                key={filename}
                                                className={`group relative p-4 rounded-xl border-2 transition-all ${containerClasses}`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${iconBg}`}>
                                                        {fileStatus === 'success' ? (
                                                            <CheckCircle className="w-6 h-6 text-white" />
                                                        ) : fileStatus === 'failed' ? (
                                                            <AlertTriangle className="w-6 h-6 text-white" />
                                                        ) : (
                                                            <Loader2 className="w-6 h-6 text-white animate-spin" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <FileText className={`w-4 h-4 flex-shrink-0 ${fileIconColor}`} />
                                                            <span className={`text-base font-semibold truncate ${fileTitleColor}`}>
                                                                {filename}
                                                            </span>
                                                            {isCurrent && (
                                                                <span className="px-2.5 py-1 bg-blue-500 text-white text-xs font-bold rounded-full shadow-sm">
                                                                    PROCESSING
                                                                </span>
                                                            )}
                                                            {fileStatus === 'success' && (
                                                                <span className="px-2.5 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-sm">
                                                                    DONE
                                                                </span>
                                                            )}
                                                            {fileStatus === 'failed' && (
                                                                <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-sm">
                                                                    FAILED
                                                                </span>
                                                            )}
                                                        </div>
                                                        {fileStatus === 'processing' && (
                                                            <div className="text-xs text-blue-700 font-medium mt-1.5">
                                                                Analyzing document structure and extracting data...
                                                            </div>
                                                        )}
                                                        {fileStatus === 'success' && (
                                                            <div className="text-xs text-green-700 font-medium mt-1.5">
                                                                ✓ All data extracted successfully
                                                            </div>
                                                        )}
                                                        {fileStatus === 'failed' && fileResult?.error && (
                                                            <div className="text-xs text-red-800 font-medium mt-1.5 bg-red-100 px-2 py-1 rounded border border-red-200">
                                                                ⚠ {fileResult.error}
                                                            </div>
                                                        )}
                                                        {isProcessing && (
                                                            <div className="mt-3 h-2 bg-white/60 rounded-full overflow-hidden shadow-inner">
                                                                <div className={`h-full bg-gradient-to-r ${barGradient} rounded-full animate-pulse transition-all`} style={{ width: '70%' }} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="p-8 text-center bg-gray-50 rounded-xl border border-gray-200">
                                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-3" />
                                    <div className="text-sm font-medium text-gray-700">Preparing documents for processing...</div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
                                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">Statistics</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm font-medium text-gray-700">Total</span>
                                        </div>
                                        <span className="text-xl font-bold text-gray-900">{totalCount || 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                            <span className="text-sm font-medium text-gray-700">Success</span>
                                        </div>
                                        <span className="text-xl font-bold text-green-600">{summary?.successfulFiles || 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <AlertTriangle className="w-4 h-4 text-red-600" />
                                            <span className="text-sm font-medium text-gray-700">Failed</span>
                                        </div>
                                        <span className="text-xl font-bold text-red-600">{summary?.failedFiles || 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-blue-600" />
                                            <span className="text-sm font-medium text-gray-700">Remaining</span>
                                        </div>
                                        <span className="text-xl font-bold text-blue-600">
                                            {totalCount > processedCount ? totalCount - processedCount : 0}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {summary && summary.failedFiles > 0 && (
                                <div className="p-4 bg-red-50 rounded-xl border-2 border-red-200">
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <div className="text-sm font-bold text-red-900 mb-1">Issues Detected</div>
                                            <div className="text-xs text-red-700">
                                                {summary.failedFiles} file{summary.failedFiles > 1 ? 's' : ''} failed to process. Check details above.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-red-900 font-medium">{error}</div>
                            </div>
                        </div>
                    )}

                    {terminal(status?.status) && (
                        <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-gray-200">
                            {onClose && (
                                <Button size="sm" onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
                                    Close
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
}


