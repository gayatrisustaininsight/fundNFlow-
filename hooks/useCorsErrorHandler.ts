import { useToast } from '@/hooks/use-toast'
import { isCorsError, getCorsErrorMessage } from '@/lib/config/api'

export const useCorsErrorHandler = () => {
  const { toast } = useToast()

  const handleCorsError = (error: any) => {
    if (isCorsError(error)) {
      toast({
        title: 'CORS Error',
        description: getCorsErrorMessage(error),
        variant: 'destructive',
        duration: 10000, // Show for 10 seconds
      })
      
      // Log detailed error information
      console.error('🚨 CORS Error Details:', {
        message: error.message,
        code: error.code,
        config: error.config,
        request: error.request,
      })
    }
  }

  return { handleCorsError }
}
