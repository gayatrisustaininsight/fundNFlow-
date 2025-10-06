'use client'
import { Document } from '@/types'
import { CheckCircle } from 'lucide-react'
import React from 'react'

function AnalyzingScreen({ documents }: any) {
    return (
        <div className="max-w-3xl mx-auto p-8">
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Analyzing Your Documents</h2>
                <p className="text-gray-600 mb-12 text-lg">
                    Our AI is processing your financial data to generate your credit profile
                </p>

                <div className="space-y-3 max-w-xl mx-auto">
                    {documents.map((doc: Document) => (
                        <div key={doc.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                {doc.status === 'processed' ? (
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                ) : (
                                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                )}
                            </div>
                            <div className="flex-1 text-left">
                                <div className="font-medium text-gray-900">{doc.name}</div>
                                <div className="text-sm text-gray-500">
                                    {doc.status === 'processed' ? 'Analysis complete' : 'Analyzing...'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


export default AnalyzingScreen