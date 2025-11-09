"use client"
import { motion } from "framer-motion"
import { Badge } from "../badge"
import { Sparkles, X } from "lucide-react"
import { Button } from "../Button"
import { ArrowRight } from "lucide-react"
import { CheckCircle } from "lucide-react"
import { useMemo, useState } from "react"
import { Input } from "../Input"
import { useApi } from "@/hooks/useApi"
import { useToast } from "@/hooks/use-toast"
import Modal from "../Modal"

const HeroSection = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [loanAmount, setLoanAmount] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { request } = useApi()
    const { toast } = useToast();
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
            }, undefined, { withCredentials: false, baseURL: process.env.NEXT_PUBLIC_NOTIFICATIONS_BASE_URL || "https://greenaiuat.com/api/notifications" })
            toast({ title: "Submitted" })
            setName("")
            setEmail("")
            setMobileNumber("")
            setLoanAmount("")
            setIsModalOpen(false)
        } catch (e) {
            toast({ title: "Submission failed" })
        } finally {
            setSubmitting(false);
        }
    }

    const AdvisorForm = () => (
        <div className="space-y-4 pb-4" onClick={(e) => e.stopPropagation()}>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <Input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    inputMode="email"
                    autoComplete="email"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <Input
                    type="tel"
                    placeholder="Enter mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    inputMode="tel"
                    autoComplete="tel"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount</label>
                <Input
                    type="number"
                    placeholder="Enter amount in ₹"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    inputMode="numeric"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <Button size="lg" className="w-full" onClick={handleSubmit} disabled={submitting} type="button">
                    {submitting ? "Submitting..." : "Submit Details"}
                </Button>
                <Button size="lg" className="w-full bg-green-600 text-white hover:bg-green-700" onClick={handleWhatsApp} type="button">
                    Contact on WhatsApp
                </Button>
            </div>
        </div>
    )
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
                                AI-Powered Loan Approval
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
                            Get the best loan offers in minutes. Upload your documents,
                            get instant credit scoring, and access funding from 50+ lenders within 48 hours.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                        >
                            <Button size="lg" className="text-lg px-8" onClick={() => setIsModalOpen(true)}>
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
                                <Badge className="bg-green-100 text-green-700 text-sm">Get Response in 5 mins</Badge>
                            </div>
                            <AdvisorForm />
                        </motion.div>
                    </motion.div>
                </div>
            </div >

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidthClassName="max-w-2xl">
                <div className="p-4 md:p-6 pb-8 md:pb-6">
                    <div className="flex items-start md:items-center justify-between mb-4 md:mb-6 gap-2">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 flex-1">
                            <h3 className="text-xl md:text-2xl font-bold">Speak to our Advisor</h3>
                            <Badge className="bg-green-100 text-green-700 text-sm w-fit">Get Response in 5 mins</Badge>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 mt-1 md:mt-0"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <AdvisorForm />
                </div>
            </Modal>
        </section >
    )
}

export default HeroSection