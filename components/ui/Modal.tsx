'use client'

import { ReactNode, useEffect } from 'react'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
    maxWidthClassName?: string
}

export default function Modal({ isOpen, onClose, children, maxWidthClassName = 'max-w-3xl' }: ModalProps) {
    useEffect(() => {
        if (!isOpen) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/50" />
            <div
                className={`relative w-full ${maxWidthClassName} bg-white rounded-xl shadow-xl border border-gray-200`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}


