import { motion } from 'framer-motion'
import React from 'react'
import { Badge } from '../badge'
import { Card } from '../Card'
import { Star } from 'lucide-react'

const Testimonial = () => {
    return (
        <motion.section
            id="testimonials"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="py-20 bg-white"
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <Badge className="mb-4 bg-green-100 text-green-700">Testimonials</Badge>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Thousands of SMEs</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { name: 'Rajesh Kumar', company: 'Tech Solutions Pvt Ltd', text: 'FundanFlow helped us get ₹25L working capital in just 2 days. The process was incredibly smooth!', rating: 5 },
                        { name: 'Priya Sharma', company: 'Fashion Boutique', text: 'Best platform for SME loans. The credit score feature helped me understand my eligibility clearly.', rating: 5 },
                        { name: 'Amit Patel', company: 'Manufacturing Co', text: 'Transparent process, competitive rates, and excellent support. Highly recommended!', rating: 5 }
                    ].map((review, idx) => (
                        <Card key={idx} className="p-6">
                            <div className="flex mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-4">"{review.text}"</p>
                            <div>
                                <div className="font-bold">{review.name}</div>
                                <div className="text-sm text-gray-500">{review.company}</div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}

export default Testimonial