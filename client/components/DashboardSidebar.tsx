'use client'

import { useState } from 'react'
import {
    Home,
    Settings,
    Menu,
    ChevronRight,
    ChevronDown,
    LogOut,
} from 'lucide-react'
import Link from 'next/link'
import clsx from 'clsx'

const navItems = [
    {
        label: 'Admins',
        icon: <Home size={20} />,
        href: '/admin-dashboard/admins',
    },
    {
        label: 'Trainers',
        icon: <Settings size={20} />,
        href: '/admin-dashboard/trainers',
    },
]

const collapsibleGroup = {
    label: 'Users',
    items: [
        { label: 'Submenu 1', href: '/submenu1' },
        { label: 'Submenu 2', href: '/submenu2' },
    ],
}

export default function DashboardSidebar() {
    const [collapsed, setCollapsed] = useState(false)
    const [groupOpen, setGroupOpen] = useState(false)

    return (
        <aside
            className={clsx(
                'h-screen transition-all duration-300 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white shadow-xl px-4 py-6',
                collapsed ? 'w-16' : 'w-64'
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                {!collapsed && (
                    <h1 className="text-2xl font-bold text-blue-400 tracking-wide">Dashboard</h1>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-gray-400 hover:text-blue-400 transition"
                >
                    <Menu size={22} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="space-y-3">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 hover:text-white transition"
                    >
                        <span>{item.icon}</span>
                        {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                    </Link>
                ))}

                {/* Collapsible group */}
                <div>
                    <button
                        onClick={() => setGroupOpen(!groupOpen)}
                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-600 transition"
                    >
                        <span className="flex items-center space-x-3">
                            <Settings size={20} />
                            {!collapsed && (
                                <span className="text-sm font-medium">
                                    {collapsibleGroup.label}
                                </span>
                            )}
                        </span>
                        {!collapsed &&
                            (groupOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />)}
                    </button>
                    {groupOpen && !collapsed && (
                        <div className="ml-8 mt-1 space-y-1">
                            {collapsibleGroup.items.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="block text-sm text-gray-300 hover:text-blue-400 transition"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-6 left-4 right-4">
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition">
                    <LogOut size={20} />
                    {!collapsed && <span className="text-sm font-medium">Logout</span>}
                </button>
            </div>
        </aside>
    )
}
