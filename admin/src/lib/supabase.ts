/**
 * Placeholder Supabase helper.
 * The portfolio snapshot does not surface the real authentication integration.
 */
export const supabase = null

export const handleSupabaseError = () => 'Authentication not available in this snapshot'

export const sanitizeInput = (input: string): string => input.trim()

export const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const validatePassword = (password: string): boolean =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password)

export const handleSupabaseError = (error: any) => {
  logger.error('Supabase error:', error)
  
  // Hide error details in production
  if (import.meta.env.PROD) {
    if (error.code === 'PGRST301') {
      return 'Authentication required. Please log in.'
    }
    
    if (error.code === 'PGRST302') {
      return 'Access denied. You do not have permission for this action.'
    }
    
    if (error.code === 'PGRST303') {
      return 'Data not found.'
    }
    
    return 'An error occurred. Please try again.'
  }
  
  // Dev mode - show full error
  return error.message || 'An unexpected error occurred.'
}

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '')
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean => {
  // 8+ chars, at least one letter and one number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}
