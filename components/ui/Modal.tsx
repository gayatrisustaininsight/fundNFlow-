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
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.removeEventListener('keydown', onKey)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center overflow-y-auto p-0 md:p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/50" />
            <div
                className={`relative w-full ${maxWidthClassName} bg-white rounded-none md:rounded-xl shadow-xl border border-gray-200 min-h-screen md:min-h-0 my-0 md:my-auto`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="max-h-[100vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}


