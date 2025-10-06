import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MessageCircle } from "lucide-react";
import { Mail } from "lucide-react";

const HelpContent = () => (
    <div className="max-w-3xl">
        <Card className="p-6 mb-6">
            <h3 className="font-bold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
                {[
                    { q: 'How long does approval take?', a: 'Most applications are approved within 24-48 hours.' },
                    { q: 'What documents do I need?', a: 'Bank statements, GST returns, and business registration documents.' },
                    { q: 'How is my GraphScore calculated?', a: 'Based on cash flow, GST compliance, and banking behavior.' }
                ].map((faq, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-2">{faq.q}</h4>
                        <p className="text-gray-600 text-sm">{faq.a}</p>
                    </div>
                ))}
            </div>
        </Card>

        <Card className="p-6">
            <h3 className="font-bold mb-4">Contact Support</h3>
            <div className="space-y-3">
                <Button className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start Live Chat
                </Button>
                <Button variant="outline" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Support
                </Button>
            </div>
        </Card>
    </div>
);
export default HelpContent