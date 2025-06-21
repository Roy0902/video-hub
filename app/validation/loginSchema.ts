import { z } from 'zod';
import { AUTH_ERRORS } from '@/constants/errorMessages';

// Login schema
export const loginSchema = z.object({
  email: z.string()
    .min(1, AUTH_ERRORS.EMAIL_REQUIRED)
    .email(AUTH_ERRORS.EMAIL_INVALID),

  rememberMe: z.boolean().default(false)
});

// Type inference from schema
export type LoginFormData = z.infer<typeof loginSchema>;

// Individual field schemas for real-time validation
export const loginEmailSchema = loginSchema.shape.email;

// Validation functions
export const validateLoginForm = (data: LoginFormData) => {
  try {
    const result = loginSchema.parse(data);
    return { isValid: true, data: result, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const field = err.path[0] as string;
        errors[field] = err.message;
      });
      return { isValid: false, data: null, errors };
    }
    return { isValid: false, data: null, errors: { general: 'Validation failed' } };
  }
};

// Individual field validation
export const validateLoginEmail = (email: string) => {
  try {
    loginEmailSchema.parse(email);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0].message };
    }
    return { isValid: false, error: 'Validation failed' };
  }
}; 