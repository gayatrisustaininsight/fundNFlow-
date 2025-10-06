import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/Button';
import React from 'react'
const loanOffers = [
    { lender: 'NBFC A', amount: '₹25L', rate: '14%', time: '3-5 days', type: 'Business Loan' },
    { lender: 'Bank B', amount: '₹20L', rate: '13.5%', time: '7-10 days', type: 'Working Capital' },
    { lender: 'NBFC C', amount: '₹15L', rate: '16%', time: '2-3 days', type: 'Equipment Loan' }
];

const LoanOffersContent = () => (
    <div className="space-y-6">
        {loanOffers.map((offer, idx) => (
            <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="grid md:grid-cols-4 gap-6 items-center">
                    <div>
                        <h3 className="font-bold text-lg mb-1">{offer.lender}</h3>
                        <Badge variant="outline">{offer.type}</Badge>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{offer.amount}</div>
                        <div className="text-sm text-gray-600">Loan Amount</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{offer.rate}</div>
                        <div className="text-sm text-gray-600">Interest Rate</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button className="w-full">Apply Now</Button>
                        <Button variant="outline" className="w-full">View Details</Button>
                    </div>
                </div>
            </Card>
        ))}
    </div>
);


export default LoanOffersContent