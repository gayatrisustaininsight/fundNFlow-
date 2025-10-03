import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(num: number): string {
  if (num >= 10000000) {
    return Math.round(num / 10000000) + 'Cr'
  } else if (num >= 100000) {
    return Math.round(num / 100000) + 'L'
  } else if (num >= 1000) {
    return Math.round(num / 1000) + 'K'
  }
  return num.toString()
}
