import { z } from 'zod'

const envSchema = z.object({
    NEXT_PUBLIC_API_BASE_URL: z.string().url().optional(),
})

export type Env = z.infer<typeof envSchema>

export function getEnv(): Env {
    const parsed = envSchema.safeParse({
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    })
    if (!parsed.success) {
        console.warn('Invalid environment configuration', parsed.error.flatten())
        return {}
    }
    return parsed.data
}


