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
        href: '/',
    },
    {
        label: 'Trainers',
        icon: <Settings size={20} />,
        href: '/settings',
    },
]

const collapsibleGroup = {
    label: 'Users',
    items: [
        { label: 'Submenu 1', href: '/submenu1' },
        { label: 'Submenu 2', href: '/submenu2' },
    ],
}

export default function AdminDashboard() {
    const [collapsed, setCollapsed] = useState(false)
    const [groupOpen, setGroupOpen] = useState(false)

    return (
        <aside
            className={clsx(
                'h-screen transition-all duration-300 bg-[#1B1B1B] text-white p-4',
                collapsed ? 'w-16' : 'w-64'
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                {!collapsed && <h1 className="text-xl font-bold text-orange-500">MyApp</h1>}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-white focus:outline-none"
                >
                    <Menu size={20} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center space-x-3 p-2 rounded-md hover:bg-orange-500 transition"
                    >
                        <span>{item.icon}</span>
                        {!collapsed && <span>{item.label}</span>}
                    </Link>
                ))}

                {/* Collapsible group */}
                <div>
                    <button
                        onClick={() => setGroupOpen(!groupOpen)}
                        className="w-full flex items-center justify-between p-2 rounded-md hover:bg-orange-500 transition"
                    >
            <span className="flex items-center space-x-3">
              <Settings size={20} />
                {!collapsed && <span>{collapsibleGroup.label}</span>}
            </span>
                        {!collapsed &&
                            (groupOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />)}
                    </button>
                    {groupOpen && !collapsed && (
                        <div className="ml-7 mt-1 space-y-1">
                            {collapsibleGroup.items.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="block text-sm hover:text-orange-500 transition"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-4 left-4 right-4">
                <button className="w-full flex items-center space-x-3 p-2 rounded-md text-red-500 hover:bg-red-500 hover:text-white transition">
                    <LogOut size={20} />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </aside>
    )
}
