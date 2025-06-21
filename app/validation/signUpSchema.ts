import { z } from 'zod';
import { AUTH_ERRORS } from '@/constants/errorMessages';

// Individual field schemas for real-time validation
export const nameSchema = z.string()
  .min(1, AUTH_ERRORS.NAME_REQUIRED)
  .min(2, AUTH_ERRORS.NAME_TOO_SHORT)
  .max(50, AUTH_ERRORS.NAME_TOO_LONG)
  .regex(/^[a-zA-Z\s\-']+$/, AUTH_ERRORS.NAME_INVALID_CHARS)
  .refine((name) => !/\s{2,}/.test(name), {
    message: AUTH_ERRORS.NAME_CONSECUTIVE_SPACES
  })
  .transform((name) => name.trim());

export const emailSchema = z.string()
  .min(1, AUTH_ERRORS.EMAIL_REQUIRED)
  .email(AUTH_ERRORS.EMAIL_INVALID)
  .max(254, AUTH_ERRORS.EMAIL_TOO_LONG)
  .refine((email) => !email.startsWith('.') && !email.endsWith('.') && !email.includes('..'), {
    message: AUTH_ERRORS.EMAIL_INVALID_FORMAT
  });

export const passwordSchema = z.string()
  .min(1, AUTH_ERRORS.PASSWORD_REQUIRED)
  .min(8, AUTH_ERRORS.PASSWORD_TOO_SHORT)
  .max(128, AUTH_ERRORS.PASSWORD_TOO_LONG)
  .regex(/[A-Z]/, AUTH_ERRORS.PASSWORD_NO_UPPERCASE)
  .regex(/[a-z]/, AUTH_ERRORS.PASSWORD_NO_LOWERCASE)
  .regex(/\d/, AUTH_ERRORS.PASSWORD_NO_NUMBER)
  .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, AUTH_ERRORS.PASSWORD_NO_SPECIAL)
  .refine((password) => !/(.)\1{2,}/.test(password), {
    message: AUTH_ERRORS.PASSWORD_REPEATED_CHARS
  })
  .refine((password) => !/(123|abc|qwe|password|admin|123456)/i.test(password), {
    message: AUTH_ERRORS.PASSWORD_COMMON_SEQUENCE
  });

// Sign up schema with comprehensive validation
export const signUpSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string()
    .min(1, AUTH_ERRORS.CONFIRM_PASSWORD_REQUIRED),

  agreeToTerms: z.boolean()
    .refine((agree) => agree === true, {
      message: AUTH_ERRORS.TERMS_REQUIRED
    })
}).refine((data) => data.password === data.confirmPassword, {
  message: AUTH_ERRORS.PASSWORDS_DONT_MATCH,
  path: ["confirmPassword"]
});

// Type inference from schema
export type SignUpFormData = z.infer<typeof signUpSchema>;

// Validation functions
export const validateSignUpForm = (data: SignUpFormData) => {
  try {
    const result = signUpSchema.parse(data);
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
export const validateName = (name: string) => {
  try {
    nameSchema.parse(name);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0].message };
    }
    return { isValid: false, error: 'Validation failed' };
  }
};

export const validateEmail = (email: string) => {
  try {
    emailSchema.parse(email);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0].message };
    }
    return { isValid: false, error: 'Validation failed' };
  }
};

export const validatePassword = (password: string) => {
  try {
    passwordSchema.parse(password);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0].message };
    }
    return { isValid: false, error: 'Validation failed' };
  }
}; 