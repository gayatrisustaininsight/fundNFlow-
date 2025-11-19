import { Zap } from "lucide-react"
import Image from "next/image"

const Footer = () => {
    return (
        <footer className="bg-gray-50 text-gray-300 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <Image src="/logo.png" alt="logo" width={250} height={250} />
                        <p className="text-sm">Empowering SMEs with instant credit access and smart financial solutions.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4">Product</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#features" className="hover:text-white">Features</a></li>
                            <li><a href="#how-it-works" className="hover:text-white">How It Works</a></li>
                            <li><a href="#who-we-serve" className="hover:text-white">Who We Serve</a></li>
                            <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
                        </ul>
                    </div>
                    {/* <div>
                        <h4 className="font-bold text-white mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">About Us</a></li>
                            <li><a href="#" className="hover:text-white">Careers</a></li>
                            <li><a href="#" className="hover:text-white">Blog</a></li>
                            <li><a href="#" className="hover:text-white">Contact</a></li>
                        </ul>
                    </div> */}
                    {/* <div>
                        <h4 className="font-bold text-white mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white">Security</a></li>
                            <li><a href="#" className="hover:text-white">Compliance</a></li>
                        </ul>
                    </div> */}
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
                    <p>© 2024 FundnFlow. All rights reserved. | RBI-AA Compliant Platform</p>
                </div>
            </div>
        </footer>

    )
}
export default Footer