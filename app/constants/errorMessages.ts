// Authentication Error Messages
export const AUTH_ERRORS = {
    // Login errors
    LOGIN_FAILED: 'Login failed',
    LOGIN_TIMEOUT: 'Login request timed out. Please try again.',
    LOGIN_UNEXPECTED: 'An unexpected error occurred during login',
    
    // Sign up errors
    SIGNUP_FAILED: 'Sign up failed',
    SIGNUP_TIMEOUT: 'Sign up request timed out. Please try again.',
    SIGNUP_UNEXPECTED: 'An unexpected error occurred during sign up',
    
    // Token errors
    NO_REFRESH_TOKEN: 'No refresh token available',
    REFRESH_FAILED: 'Failed to refresh token',
    REFRESH_TIMEOUT: 'Token refresh request timed out. Please try again.',
    REFRESH_UNEXPECTED: 'An unexpected error occurred during token refresh',
    
    // Form validation errors
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Email is invalid',
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
    NAME_REQUIRED: 'Name is required',
    NAME_TOO_SHORT: 'Name must be at least 2 characters',
    CONFIRM_PASSWORD_REQUIRED: 'Please confirm your password',
    PASSWORDS_DONT_MATCH: 'Passwords do not match',
    TERMS_REQUIRED: 'You must agree to the Terms of Service and Privacy Policy',
    
    // Enhanced validation errors
    NAME_TOO_LONG: 'Name must be less than 50 characters',
    NAME_INVALID_CHARS: 'Name can only contain letters, spaces, hyphens, and apostrophes',
    NAME_CONSECUTIVE_SPACES: 'Name cannot contain consecutive spaces',
    EMAIL_TOO_LONG: 'Email must be less than 254 characters',
    EMAIL_INVALID_FORMAT: 'Email format is invalid',
    PASSWORD_TOO_LONG: 'Password must be less than 128 characters',
    PASSWORD_NO_UPPERCASE: 'Password must contain at least one uppercase letter',
    PASSWORD_NO_LOWERCASE: 'Password must contain at least one lowercase letter',
    PASSWORD_NO_NUMBER: 'Password must contain at least one number',
    PASSWORD_NO_SPECIAL: 'Password must contain at least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)',
    PASSWORD_REPEATED_CHARS: 'Password cannot contain repeated characters (e.g., aaa, 111)',
    PASSWORD_COMMON_SEQUENCE: 'Password cannot contain common sequences'
} as const; 