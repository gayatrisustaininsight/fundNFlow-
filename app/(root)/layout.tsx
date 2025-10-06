import Sidebar from '@/components/ui/common/sidebar'
import React from 'react'
import { Providers } from '@/components/Providers'
import { Toaster } from '@/components/ui/toaster'
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex h-screen w-screen overflow-hidden '>
            <Providers>
                <Sidebar />
                <Toaster />
                <div className='flex-1 overflow-auto p-4 bg-gray-100' >
                    {children}
                </div>
            </Providers>
        </div>
    )
}
