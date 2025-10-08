import { useCallback } from 'react'
import api from '@/lib/api'

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

export function useApi() {
    const request = useCallback(async <TData = unknown, TBody = unknown>(
        method: HttpMethod,
        url: string,
        body?: TBody,
        params?: Record<string, unknown>
    ): Promise<TData> => {
        const response = await api.request<TData>({ method, url, data: body, params })
        return response.data
    }, [])

    return { request }
}


