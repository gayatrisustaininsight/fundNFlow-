'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useAIJobsHistory } from '@/lib/api/documents'
import { useAppStore } from '@/store/appStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const AnalysisHistory = () => {
    const { user } = useAuthStore()
    const { getAIJobsHistory } = useAIJobsHistory()
    const { setCurrentStep, setAnalysis } = useAppStore()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [jobs, setJobs] = useState<any[]>([])
    const [page, setPage] = useState(1)
    const [limit] = useState(20)
    const [total, setTotal] = useState(0)
    const [pages, setPages] = useState(1)

    const load = async (p = 1) => {
        if (!user) return
        setLoading(true)
        try {
            const res = await getAIJobsHistory({ userId: user.id, page: p, limit })
            setJobs(res?.data?.jobs || [])
            setTotal(res?.data?.pagination?.total || 0)
            setPages(res?.data?.pagination?.pages || 1)
            setPage(res?.data?.pagination?.page || p)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        load(1)
    }, [user])

    const viewDetails = (job: any) => {
        const analysis = job?.results?.analysis
        if (analysis) {
            setAnalysis({
                score: analysis.score,
                metrics: analysis.metrics,
                eligibility: analysis.eligibility,
                recommendations: analysis.recommendations,
                matches: analysis.matches,
                isFinancialDocument: analysis.isFinancialDocument,
                error: analysis.error,
            })
            setCurrentStep('credit-passport')
            router.push('/documents')
        }
    }

    return (
        <div className="min-h-screen w-full bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="text-2xl font-bold text-gray-900">Analysis History</div>
                        <div className="text-sm text-gray-500">Past AI analyses for your uploaded documents</div>
                    </div>
                    <Link href="/documents" className="px-3 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium">Back to Documents</Link>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                        <div className="text-sm text-gray-700">Total: {total}</div>
                        <div className="flex items-center gap-2 text-sm">
                            <button disabled={page <= 1 || loading} onClick={() => load(page - 1)} className={`px-3 py-1.5 rounded border ${page <= 1 || loading ? 'text-gray-400 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}>Prev</button>
                            <div className="text-gray-600">{page}/{pages}</div>
                            <button disabled={page >= pages || loading} onClick={() => load(page + 1)} className={`px-3 py-1.5 rounded border ${page >= pages || loading ? 'text-gray-400 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}>Next</button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="p-8 text-center text-sm text-gray-600">Loading...</div>
                    ) : jobs.length === 0 ? (
                        <div className="p-8 text-center text-sm text-gray-600">No history available.</div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {jobs.map((job) => {
                                const status = job?.status
                                const createdAt = job?.createdAt || job?.startedAt
                                const score = job?.results?.analysis?.score
                                const eligible = job?.results?.analysis?.eligibility?.eligible
                                return (
                                    <div key={job.id || job.jobId} className="p-4 flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="text-sm font-semibold text-gray-900">{status === 'completed' ? 'Completed' : status?.toUpperCase()}</div>
                                                {typeof score === 'number' && (
                                                    <span className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[11px] text-blue-700">Score {score}</span>
                                                )}
                                                {eligible === true && (
                                                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-700">Eligible</span>
                                                )}
                                                {eligible === false && (
                                                    <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[11px] text-amber-700">Not Eligible</span>
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-600">{createdAt ? new Date(createdAt).toLocaleString() : ''}</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => viewDetails(job)} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium">View</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AnalysisHistory


