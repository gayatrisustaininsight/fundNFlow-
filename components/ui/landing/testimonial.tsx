import { motion } from 'framer-motion'
import React from 'react'
import Image from 'next/image'
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
                    <Badge className="mb-4 bg-green-100 text-green-700 text-lg">Testimonials</Badge>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Thousands of SMEs</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { name: 'Priya Sharma', company: 'Tech Solutions Pvt Ltd', text: 'FundnFlow helped us get ₹25L working capital in just 2 days. The process was incredibly smooth!', rating: 5, image: 'https://media.istockphoto.com/id/2160568808/photo/confident-young-indian-businesswoman-standing-in-corporate-office-smiling-looking-at-camera.jpg?s=2048x2048&w=is&k=20&c=6jc2tZSpgHdCQjw10PNzDw79gghd45K2qZHBoMV7Y_o=' },
                        { name: 'Rajesh Kumar', company: 'Fashion Boutique', text: 'Best platform for SME loans. The credit score feature helped me understand my eligibility clearly.', rating: 5, iamge: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735' },
                        { name: 'Amit Patel', company: 'Manufacturing Co', text: 'Transparent process, competitive rates, and excellent support. Highly recommended!', rating: 5, image: 'https://media.istockphoto.com/id/1325137723/photo/home-improvement.jpg?s=2048x2048&w=is&k=20&c=dzswsEh_9ivpudTyFUwIvO5YE0XP1M7hKup8Rryj7YI=' }
                    ].map((review, idx) => (
                        <Card key={idx} className="p-6">
                            <div className="flex mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-4">"{review.text}"</p>
                            <div className="flex items-center gap-3">
                                <Image
                                    src={(review as any).image || (review as any).iamge || `https://i.pravatar.cc/96?u=${encodeURIComponent(review.name)}-${idx}`}
                                    alt={review.name}
                                    width={64}
                                    height={64}
                                    className="rounded-full w-16 h-16 object-cover ring-2 ring-gray-200"
                                />
                                <div>
                                    <div className="font-bold">{review.name}</div>
                                    <div className="text-sm text-gray-500">{review.company}</div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}

export default Testimonial