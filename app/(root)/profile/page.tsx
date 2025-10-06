'use client'
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import React, { useState } from 'react'


const ProfileContent = () => {
    const [formData, setFormData] = useState({
        businessName: '',
        panGstin: '',
        email: '',
        mobile: ''
    });
    return (

        <div className="max-w-2xl">
            <Card className="p-6">
                <h3 className="font-bold mb-6">Business Information</h3>
                <div className="space-y-4">
                    <div>
                        <Label>Business Name</Label>
                        <Input value={formData.businessName}
                            placeholder="Your Business Name"
                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label>PAN/GSTIN</Label>
                        <Input value={formData.panGstin}
                            placeholder="PAN or GSTIN Number"
                            onChange={(e) => setFormData({ ...formData, panGstin: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input value={formData.email}
                            placeholder="email@business.com"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label>Mobile</Label>
                        <Input value={formData.mobile}
                            placeholder="Mobile Number"
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        />
                    </div>
                    <Button className="w-full">Update Profile</Button>
                </div>
            </Card>
        </div>

    );

}

export default ProfileContent