import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const SettingsContent = () => (
    <div className="max-w-2xl space-y-6">
        <Card className="p-6">
            <h3 className="font-bold mb-4">Notifications</h3>
            <div className="space-y-3">
                {['Email notifications', 'SMS alerts', 'Application updates', 'Marketing emails'].map((setting, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{setting}</span>
                        <input type="checkbox" className="w-5 h-5" defaultChecked />
                    </div>
                ))}
            </div>
        </Card>

        <Card className="p-6">
            <h3 className="font-bold mb-4">Security</h3>
            <div className="space-y-3">
                <Button variant="outline" className="w-full">Change Password</Button>
                <Button variant="outline" className="w-full">Enable Two-Factor Authentication</Button>
            </div>
        </Card>
    </div>
);
export default SettingsContent