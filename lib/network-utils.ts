/**
 * Network utility functions for handling connectivity issues and retries
 */

export interface RetryOptions {
  maxRetries?: number
  baseDelay?: number
  maxDelay?: number
  backoffFactor?: number
}

export class NetworkError extends Error {
  constructor(message: string, public readonly originalError?: Error) {
    super(message)
    this.name = 'NetworkError'
  }
}

/**
 * Retry a function with exponential backoff
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    backoffFactor = 2
  } = options

  let lastError: Error

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      
      // Don't retry on the last attempt
      if (attempt === maxRetries) {
        break
      }

      // Only retry on network-related errors
      if (!isNetworkError(error as Error)) {
        throw error
      }

      // Calculate delay with exponential backoff
      const delay = Math.min(baseDelay * Math.pow(backoffFactor, attempt), maxDelay)
      
      console.warn(`Network request failed (attempt ${attempt + 1}/${maxRetries + 1}), retrying in ${delay}ms...`, error)
      
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw new NetworkError(`Failed after ${maxRetries + 1} attempts`, lastError)
}

/**
 * Check if an error is network-related
 */
export function isNetworkError(error: Error): boolean {
  const message = error.message.toLowerCase()
  return (
    message.includes('network') ||
    message.includes('fetch') ||
    message.includes('timeout') ||
    message.includes('connection') ||
    message.includes('rsc payload') ||
    error.name === 'NetworkError' ||
    error.name === 'TypeError' && message.includes('failed to fetch')
  )
}

/**
 * Enhanced fetch with retry logic
 */
export async function fetchWithRetry(
  input: RequestInfo | URL,
  init?: RequestInit,
  retryOptions?: RetryOptions
): Promise<Response> {
  return withRetry(async () => {
    const response = await fetch(input, init)
    
    // Throw on HTTP errors to trigger retry
    if (!response.ok) {
      throw new NetworkError(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    return response
  }, retryOptions)
}

/**
 * Check if the browser is online
 */
export function isOnline(): boolean {
  return typeof navigator !== 'undefined' ? navigator.onLine : true
}

/**
 * Wait for the browser to come back online
 */
export function waitForOnline(): Promise<void> {
  return new Promise((resolve) => {
    if (isOnline()) {
      resolve()
      return
    }

    const handleOnline = () => {
      window.removeEventListener('online', handleOnline)
      resolve()
    }

    window.addEventListener('online', handleOnline)
  })
}
