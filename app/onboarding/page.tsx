'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Label } from '@/components/ui/Label'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { FileText, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

const BusinessOnboarding = () => {
    const router = useRouter()
    const { verifyPAN, verifyGSTIN, isVerifyingPAN, isVerifyingGSTIN, completeOnboarding, isLoading } = useAuthStore()
    const { toast } = useToast()
    const [pan, setPan] = useState('')
    const [gstin, setGstin] = useState('')
    const [panValid, setPanValid] = useState<null | boolean>(null)
    const [gstValid, setGstValid] = useState<null | boolean>(null)

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/

    const handleVerifyPAN = async () => {
        const ok = panRegex.test(pan)
        setPanValid(ok)
        if (!ok) return
        const serverOk = await verifyPAN(pan)
        setPanValid(serverOk)
        if (!serverOk) toast({ title: 'PAN verification failed' })
        else toast({ title: 'PAN verified' })
    }

    const handleVerifyGST = async () => {
        if (!gstin) {
            setGstValid(null)
            return
        }
        const ok = gstRegex.test(gstin)
        setGstValid(ok)
        if (!ok) return
        const serverOk = await verifyGSTIN(gstin)
        setGstValid(serverOk)
        if (!serverOk) toast({ title: 'GSTIN verification failed' })
        else toast({ title: 'GSTIN verified' })
    }

    const handleComplete = async () => {
        if (!panValid) {
            toast({ title: 'Please verify PAN', variant: 'destructive' })
            return
        }
        try {
            await completeOnboarding()
            toast({ title: 'Onboarding completed' })
            router.push('/(root)/dashboard')
        } catch {
            toast({ title: 'Failed to complete onboarding', variant: 'destructive' })
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="max-w-3xl mx-auto p-6 py-12">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-8">
                    <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Business Profile</h1>
                    <p className="text-gray-600">Add and verify PAN/GSTIN to unlock offers</p>
                </motion.div>

                <Card className="p-8 shadow-xl">
                    <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <Label className="flex items-center gap-2 mb-2 text-sm font-semibold"><FileText className="w-4 h-4 text-blue-600" />PAN Number</Label>
                                <div className="flex gap-2">
                                    <Input placeholder="ABCDE1234F" className="uppercase" maxLength={10} value={pan} onChange={(e) => setPan(e.target.value.toUpperCase())} />
                                    <Button onClick={handleVerifyPAN} variant="outline" size="sm" disabled={!pan || isVerifyingPAN}>
                                        {isVerifyingPAN ? 'Verifying...' : 'Verify'}
                                    </Button>
                                </div>
                                {panValid !== null && (
                                    <p className={`text-xs mt-1 ${panValid ? 'text-green-600' : 'text-red-600'}`}>{panValid ? 'PAN looks valid' : 'Invalid PAN'}</p>
                                )}
                            </div>
                            <div>
                                <Label className="flex items-center gap-2 mb-2 text-sm font-semibold"><FileText className="w-4 h-4 text-blue-600" />GSTIN <span className="text-gray-400">(Optional)</span></Label>
                                <div className="flex gap-2">
                                    <Input placeholder="22ABCDE1234F1Z5" className="uppercase" maxLength={15} value={gstin} onChange={(e) => setGstin(e.target.value.toUpperCase())} />
                                    <Button onClick={handleVerifyGST} variant="outline" size="sm" disabled={!gstin || isVerifyingGSTIN}>
                                        {isVerifyingGSTIN ? 'Verifying...' : 'Verify'}
                                    </Button>
                                </div>
                                {gstValid !== null && (
                                    <p className={`text-xs mt-1 ${gstValid ? 'text-green-600' : 'text-red-600'}`}>{gstValid ? 'GSTIN looks valid' : 'Invalid GSTIN'}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button variant="outline" onClick={() => router.back()} className="flex-1">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                            <Button onClick={handleComplete} className="flex-1" disabled={isLoading}>
                                {isLoading ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Finishing...</>) : 'Finish'}
                                <CheckCircle className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default BusinessOnboarding


