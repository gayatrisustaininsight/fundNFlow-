import Sidebar from '@/components/ui/common/sibebar'
import React from 'react'
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex h-screen w-screen overflow-hidden '>
            <Sidebar />
            <div className='flex-1 overflow-auto ml-20'>
                {children}
            </div>
        </div>
    )
}
