import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@/services/authService';
import { AUTH_ERRORS } from '@/constants/errorMessages';
import { validateLoginForm, type LoginFormData } from '@/validation/loginSchema';

type LoginFormErrors = {
    email?: string;
    password?: string;
    general?: string;
}

// Extended form data type that includes password for the form
type ExtendedLoginFormData = LoginFormData & {
    password: string;
}

const INITIAL_FORM_STATE: ExtendedLoginFormData = {
    email: '',
    password: '',
    rememberMe: false
};

export const useLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ExtendedLoginFormData>(INITIAL_FORM_STATE);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<LoginFormErrors>({});

    const validateForm = (): boolean => {
        const newErrors: LoginFormErrors = {};
        
        // Validate email using Zod
        const emailValidation = validateLoginForm({ email: formData.email, rememberMe: formData.rememberMe });
        if (!emailValidation.isValid && emailValidation.errors && 'email' in emailValidation.errors) {
            newErrors.email = emailValidation.errors.email;
        }
        
        // Validate password manually (since it's not in Zod schema)
        if (!formData.password) {
            newErrors.password = AUTH_ERRORS.PASSWORD_REQUIRED;
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const response = await loginUser(formData.email, formData.password);
            
            // Store user data in localStorage (tokens are in cookies)
            localStorage.setItem('user', JSON.stringify(response.user));
            
            navigate('/library');
        } catch (error) {
            setErrors({
                general: error instanceof Error ? error.message : AUTH_ERRORS.LOGIN_UNEXPECTED
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = () => {
        console.log('Google Sign-In clicked');
    };

    return {
        formData,
        isLoading,
        errors,
        handleInputChange,
        handleSubmit,
        handleGoogleSignIn
    };
}; 