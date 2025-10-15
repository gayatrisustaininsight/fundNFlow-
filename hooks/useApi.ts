import { useCallback } from 'react'
import api from '@/lib/api'
import { AxiosRequestConfig } from 'axios'

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

export function useApi() {
    const request = useCallback(async <TData = unknown, TBody = unknown>(
        method: HttpMethod,
        url: string,
        body?: TBody,
        params?: Record<string, unknown>,
        config?: AxiosRequestConfig
    ): Promise<TData> => {
        const response = await api.request<TData>({ method, url, data: body, params, ...(config || {}) })
        return response.data
    }, [])

    return { request }
}


