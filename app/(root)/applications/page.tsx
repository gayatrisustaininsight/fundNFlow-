'use client'
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import React from 'react'

const ApplicationsContent = () => (
    <div className="space-y-6">
        {[
            { lender: 'NBFC A', amount: '₹25L', status: 'In Progress', progress: 65, color: 'blue' },
            { lender: 'Bank B', amount: '₹20L', status: 'Approved', progress: 100, color: 'green' }
        ].map((app, idx) => (
            <Card key={idx} className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="font-bold text-lg">{app.lender}</h3>
                        <p className="text-gray-600">{app.amount}</p>
                    </div>
                    <Badge className={`bg-${app.color}-600 text-white`}>{app.status}</Badge>
                </div>
                <Progress value={app.progress} className="mb-2" />
                <p className="text-sm text-gray-600">
                    {app.status === 'Approved' ? 'Ready for disbursement' : 'Document verification in progress'}
                </p>
            </Card>
        ))}
    </div>
);


export default ApplicationsContent