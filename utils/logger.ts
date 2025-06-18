export const secureLog = {
  info: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(message, data)
    }
  },
  
  error: (message: string, error?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(message, error)
    } else {
      // In production, only log non-sensitive error messages
      console.error(message)
    }
  },
  
  warn: (message: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(message)
    }
  }
}