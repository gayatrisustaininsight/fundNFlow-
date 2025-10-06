import Sidebar from '@/components/ui/common/sibebar'
import React from 'react'
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Sidebar />
            {children}
        </div>
    )
}
