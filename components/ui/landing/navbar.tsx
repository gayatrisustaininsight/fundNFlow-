"use client"
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { Button } from "../Button";
import { AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Navigation = () => {
    const [currentPage, setCurrentPage] = useState('landing')
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => router.push('/')}
                    >
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            FundanFlow
                        </span>
                    </motion.div>

                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
                        <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">How It Works</a>
                        <a href="#who-we-serve" className="text-gray-700 hover:text-blue-600 transition-colors">Who We Serve</a>
                        <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Testimonials</a>
                        <Button variant="outline" onClick={() => router.push('/login')}>Login</Button>
                        <Button onClick={() => router.push('/signup')}>Get Started</Button>
                    </div>

                    <div className="md:hidden">
                        <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </Button>
                    </div>
                </div>

                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden py-4 border-t border-gray-200"
                        >
                            <div className="flex flex-col space-y-4">
                                <a href="#features" className="text-gray-700 hover:text-blue-600">Features</a>
                                <a href="#how-it-works" className="text-gray-700 hover:text-blue-600">How It Works</a>
                                <a href="#who-we-serve" className="text-gray-700 hover:text-blue-600">Who We Serve</a>
                                <a href="#testimonials" className="text-gray-700 hover:text-blue-600">Testimonials</a>
                                <Button variant="outline" onClick={() => router.push('/login')} className="w-full">Login</Button>
                                <Button onClick={() => router.push('/signup')} className="w-full">Get Started</Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    )
}
export default Navigation