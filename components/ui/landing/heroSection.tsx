"use client"
import { motion } from "framer-motion"
import { Badge } from "../badge"
import { Sparkles } from "lucide-react"
import { Button } from "../Button"
import { ArrowRight } from "lucide-react"
import { CheckCircle } from "lucide-react"
import { Building2 } from "lucide-react"
import { Progress } from "../Progress"
import { useMemo, useState } from "react"
import { Input } from "../Input"
import { useApi } from "@/hooks/useApi"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const HeroSection = () => {
    const [currentPage, setCurrentPage] = useState('landing')
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [loanAmount, setLoanAmount] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const { request } = useApi()
    const { toast } = useToast();
    const router = useRouter();
    const waPhone = useMemo(() => {
        const configured = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "+91 98714 21515"
        const digits = configured.replace(/[^0-9]/g, "")
        if (digits.length === 10) return `91${digits}`
        return digits
    }, [])
    const waLink = useMemo(() => {
        return `https://api.whatsapp.com/send?phone=${waPhone}`
    }, [waPhone])
    const handleWhatsApp = () => {
        const isValid = /^\d{11,15}$/.test(waPhone)
        if (!isValid) {
            toast({ title: "Invalid WhatsApp number format. Use country code, e.g. 919876543210" })
            return
        }
        window.open(waLink, "_blank")
    }
    const handleSubmit = async () => {
        if (!name || !email || !mobileNumber || !loanAmount) {
            toast({ title: "Please fill all fields" })
            return
        }
        setSubmitting(true)
        try {
            await request("post", "/fundnflow/lead", {
                email,
                name,
                loanAmount: Number(loanAmount),
                mobileNumber,
            }, undefined, { withCredentials: false, baseURL: process.env.NEXT_PUBLIC_NOTIFICATIONS_BASE_URL || "http://localhost:3000/api/notifications" })
            toast({ title: "Submitted" })
            setName("")
            setEmail("")
            setMobileNumber("")
            setLoanAmount("")
        } catch (e) {
            toast({ title: "Submission failed" })
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 md:py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200 text-lg">
                                <Sparkles className="w-6 h-6 mr-1" />
                                AI-Powered Credit Assessment
                            </Badge>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                        >
                            Instant Credit Access for{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Growing SMEs
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-xl text-gray-600 mb-8"
                        >
                            Get matched with the best loan offers in minutes. Upload your documents,
                            get instant credit scoring, and access funding from 50+ lenders within 48 hours.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                        >
                            <Button size="lg" className="text-lg px-8" onClick={() => router.push('/signup')}>
                                Get Started Free
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                            <Button size="lg" variant="outline" className="text-lg px-8">
                                Watch Demo
                            </Button>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6"
                        >
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span className="text-gray-600">No Hidden Fees</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span className="text-gray-600">Quick Approval</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span className="text-gray-600">Secure Platform</span>
                            </div>
                        </motion.div>
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <motion.div
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
                        >
                            <div className="flex items-center mb-6 gap-1">
                                <h3 className="text-xl md:text-xl font-bold">Speak to our Advisor </h3>
                                <Badge className="bg-green-100 text-green-700 text-sm">Response within 5 mins</Badge>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <Input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                    <Input type="tel" placeholder="Enter mobile number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount</label>
                                    <Input type="number" placeholder="Enter amount in ₹" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <Button size="lg" className="w-full" onClick={handleSubmit} disabled={submitting}>
                                        {submitting ? "Submitting..." : "Submit Details"}
                                    </Button>
                                    <Button size="lg" className="w-full bg-green-600 text-white hover:bg-green-700" onClick={handleWhatsApp}>
                                        Contact on WhatsApp
                                    </Button>
                                </div>
                                {/* <p className="text-sm text-gray-500 text-center mt-4">
                                    We'll get back to you within 5 mins
                                </p> */}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div >
        </section >
    )
}

export default HeroSection