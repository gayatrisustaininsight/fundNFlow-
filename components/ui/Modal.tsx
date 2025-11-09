'use client'

import { ReactNode, useEffect, useRef } from 'react'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
    maxWidthClassName?: string
}

export default function Modal({ isOpen, onClose, children, maxWidthClassName = 'max-w-3xl' }: ModalProps) {
    const modalContentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isOpen) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', onKey)
        if (isOpen) {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
            if (!isMobile) {
                const scrollY = window.scrollY
                document.body.style.overflow = 'hidden'
                document.body.style.position = 'fixed'
                document.body.style.top = `-${scrollY}px`
                document.body.style.width = '100%'
            } else {
                document.body.style.overflow = 'hidden'
            }
        }
        return () => {
            document.removeEventListener('keydown', onKey)
            const scrollY = document.body.style.top
            document.body.style.overflow = 'unset'
            document.body.style.position = 'unset'
            document.body.style.top = 'unset'
            document.body.style.width = 'unset'
            if (scrollY && scrollY !== 'unset') {
                window.scrollTo(0, parseInt(scrollY.replace('-', '')) || 0)
            }
        }
    }, [isOpen, onClose])

    useEffect(() => {
        if (isOpen && modalContentRef.current) {
            const scrollableContainer = modalContentRef.current.querySelector('[data-scrollable]') as HTMLElement
            let activeInput: HTMLElement | null = null

            const handleFocus = (e: FocusEvent) => {
                const target = e.target as HTMLElement
                if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                    activeInput = target
                    setTimeout(() => {
                        if (scrollableContainer && target && document.activeElement === target) {
                            const inputRect = target.getBoundingClientRect()
                            const containerRect = scrollableContainer.getBoundingClientRect()
                            const scrollTop = scrollableContainer.scrollTop
                            const inputTop = inputRect.top - containerRect.top + scrollTop
                            const inputHeight = inputRect.height
                            const containerHeight = containerRect.height

                            if (inputTop < scrollTop) {
                                scrollableContainer.scrollTo({ top: inputTop - 20, behavior: 'smooth' })
                            } else if (inputTop + inputHeight > scrollTop + containerHeight) {
                                scrollableContainer.scrollTo({ top: inputTop + inputHeight - containerHeight + 20, behavior: 'smooth' })
                            }
                        }
                    }, 300)
                }
            }

            const handleBlur = (e: FocusEvent) => {
                const target = e.target as HTMLElement
                if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                    const relatedTarget = e.relatedTarget as HTMLElement
                    if (!relatedTarget || (!relatedTarget.closest('[data-scrollable]') && relatedTarget.tagName !== 'INPUT' && relatedTarget.tagName !== 'TEXTAREA')) {
                        setTimeout(() => {
                            if (activeInput && document.activeElement !== activeInput && !document.activeElement?.closest('button')) {
                                activeInput.focus()
                            }
                        }, 10)
                    }
                }
            }

            const handleClick = (e: MouseEvent) => {
                const target = e.target as HTMLElement
                if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.closest('input, textarea')) {
                    e.stopPropagation()
                }
            }

            const handleTouchStart = (e: TouchEvent) => {
                const target = e.target as HTMLElement
                if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.closest('input, textarea, button')) {
                    e.stopPropagation()
                    return
                }
            }
            const handleTouchMove = (e: TouchEvent) => {
                const target = e.target as HTMLElement
                if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.closest('input, textarea')) {
                    return
                }
                const scrollable = target.closest('[data-scrollable]')
                if (!scrollable) {
                    e.preventDefault()
                }
            }

            document.addEventListener('focusin', handleFocus, true)
            document.addEventListener('focusout', handleBlur, true)
            document.addEventListener('click', handleClick, true)
            document.addEventListener('touchstart', handleTouchStart, { passive: true, capture: true })
            document.addEventListener('touchmove', handleTouchMove, { passive: false })
            return () => {
                document.removeEventListener('focusin', handleFocus, true)
                document.removeEventListener('focusout', handleBlur, true)
                document.removeEventListener('click', handleClick, true)
                document.removeEventListener('touchstart', handleTouchStart, true)
                document.removeEventListener('touchmove', handleTouchMove)
                activeInput = null
            }
        }
    }, [isOpen])

    if (!isOpen) return null

    const handleBackdropClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement
        if (target === e.currentTarget && !target.closest('input, textarea, button')) {
            onClose()
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-0 md:p-4"
            onClick={handleBackdropClick}
            style={{ touchAction: 'none' }}
        >
            <div className="absolute inset-0 bg-black/50" />
            <div
                ref={modalContentRef}
                className={`relative w-full ${maxWidthClassName} bg-white rounded-none md:rounded-xl shadow-xl border border-gray-200 min-h-screen md:min-h-0 my-0 md:my-auto`}
                onClick={(e) => {
                    const target = e.target as HTMLElement
                    if (!target.closest('input, textarea, button')) {
                        e.stopPropagation()
                    }
                }}
                style={{ touchAction: 'pan-y' }}
            >
                <div
                    className="max-h-[100dvh] overflow-y-auto overscroll-contain"
                    data-scrollable
                    style={{ WebkitOverflowScrolling: 'touch' }}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}


