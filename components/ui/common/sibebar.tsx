'use client'
import { Home, TrendingUp, CreditCard, FileText, Upload, BarChart3, UserCircle, Settings, HelpCircle, LogOut, Zap, X, Menu } from 'lucide-react'
import { Button } from '../Button'
import { Badge } from '../badge'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { useAppStore } from '@/store/appStore'

const Sidebar = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const { businessData } = useAppStore()
    const [currentSection, setCurrentSection] = useState('dashboard')
    const [currentPage, setCurrentPage] = useState('dashboard')

    const menuItems = [
        { id: 'dashboard', icon: Home, label: 'Dashboard', badge: null },
        { id: 'credit-score', icon: TrendingUp, label: 'Credit Score', badge: null },
        { id: 'loan-offers', icon: CreditCard, label: 'Loan Offers', badge: '3' },
        { id: 'applications', icon: FileText, label: 'My Applications', badge: '2' },
        { id: 'documents', icon: Upload, label: 'Documents', badge: null },
        { id: 'analytics', icon: BarChart3, label: 'Analytics', badge: null },
        { id: 'profile', icon: UserCircle, label: 'Profile', badge: null },
        { id: 'settings', icon: Settings, label: 'Settings', badge: null },
    ];

    const bottomMenuItems = [
        { id: 'help', icon: HelpCircle, label: 'Help & Support', badge: null },
        { id: 'logout', icon: LogOut, label: 'Logout', badge: null },
    ];

    return (
        <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 h-screen sticky top-0`}>
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                {!sidebarCollapsed && (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            FundanFlow
                        </span>
                    </div>
                )}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="p-1"
                >
                    {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                </Button>
            </div>



            {/* Main Menu */}
            <nav className="flex-1 p-3 overflow-y-auto">
                <div className="space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setCurrentSection(item.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${currentSection === item.id
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            {!sidebarCollapsed && (
                                <>
                                    <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                                    {item.badge && (
                                        <Badge className="bg-blue-600 text-white text-xs px-2">
                                            {item.badge}
                                        </Badge>
                                    )}
                                </>
                            )}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Bottom Menu */}
            <div className="p-3 border-t border-gray-200">
                {/* User Info */}
                {!sidebarCollapsed && (
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {businessData.businessName ? businessData.businessName.charAt(0) : 'B'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-sm truncate">
                                    {businessData.businessName || 'Business Name'}
                                </div>
                                <div className="text-xs text-gray-500 truncate">
                                    {businessData.email || 'email@company.com'}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {sidebarCollapsed && (
                    <div className="p-4 border-b border-gray-200 flex justify-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {businessData.businessName ? businessData.businessName.charAt(0) : 'B'}
                        </div>
                    </div>
                )}
                <div className="space-y-1">
                    {bottomMenuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                if (item.id === 'logout') {
                                    setCurrentPage('landing');
                                } else {
                                    setCurrentSection(item.id);
                                }
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            {!sidebarCollapsed && (
                                <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default Sidebar