'use client'

import { useEffect, useState, useRef } from 'react'
import { useAIJobs, AIJobStatusResponse } from '@/lib/api/documents'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Loader2, CheckCircle, AlertTriangle, Clock, X } from 'lucide-react'

interface ExtractionMonitorProps {
    jobId: string
    onClose?: () => void
    refreshIntervalMs?: number
}

export default function ExtractionMonitor({ jobId, onClose, refreshIntervalMs = 4000 }: ExtractionMonitorProps) {
    const { getJobStatus } = useAIJobs()
    const [status, setStatus] = useState<AIJobStatusResponse['data'] | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

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
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jobId])

    useEffect(() => {
        if (terminal(status?.status) && timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
        }
    }, [status?.status])

    const renderStatusIcon = () => {
        if (status?.status === 'completed') return <CheckCircle className="w-5 h-5 text-green-600" />
        if (status?.status === 'failed') return <AlertTriangle className="w-5 h-5 text-red-600" />
        return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
    }

    return (
        <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    {renderStatusIcon()}
                    <div className="font-semibold">Extraction Status</div>
                </div>
                {onClose && (
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="w-4 h-4" />
                    </Button>
                )}
            </div>

            <div className="text-sm text-gray-600 space-y-2 mb-4">
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Job ID: {jobId}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-gray-700">Status:</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${status?.status === 'completed' ? 'bg-green-100 text-green-800' : status?.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                        {status?.status || 'loading...'}
                    </span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded overflow-hidden">
                    <div className={`h-2 ${status?.status === 'failed' ? 'bg-red-500' : 'bg-blue-600'}`} style={{ width: `${typeof status?.progress === 'number' ? Math.min(100, Math.max(0, status.progress)) : status?.status === 'completed' ? 100 : status?.status === 'running' ? 66 : 10}%` }} />
                </div>
                {error && (
                    <div className="text-red-600">{error}</div>
                )}
            </div>

            {status?.logs && status.logs.length > 0 && (
                <div className="max-h-56 overflow-auto bg-gray-50 border rounded p-2 text-xs">
                    {status.logs.map((log, idx) => (
                        <div key={idx} className="flex gap-2">
                            <span className="text-gray-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                            <span className={log.level === 'error' ? 'text-red-600' : log.level === 'warn' ? 'text-yellow-600' : 'text-gray-800'}>
                                {log.message}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {terminal(status?.status) && status?.results && (
                <div className="mt-3">
                    <div className="font-semibold mb-1">Results</div>
                    <pre className="text-xs bg-gray-50 border rounded p-2 overflow-auto max-h-80">{JSON.stringify(status.results, null, 2)}</pre>
                </div>
            )}

            <div className="mt-3 flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={fetchStatus} disabled={isLoading}>
                    {isLoading ? (<><Loader2 className="w-4 h-4 animate-spin mr-1" /> Refreshing...</>) : 'Refresh Now'}
                </Button>
                {terminal(status?.status) && onClose && (
                    <Button size="sm" onClick={onClose}>Close</Button>
                )}
            </div>
        </Card>
    )
}


