import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '@/services/authService';
import { AUTH_ERRORS } from '@/constants/errorMessages';
import { validateSignUpForm, type SignUpFormData } from '@/validation/signUpSchema';

type SignUpFormErrors = {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    agreeToTerms?: string;
    general?: string;
}

const INITIAL_FORM_STATE: SignUpFormData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
};

export const useSignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<SignUpFormData>(INITIAL_FORM_STATE);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<SignUpFormErrors>({});

    const validateForm = (): boolean => {
        // Use Zod validation
        const validationResult = validateSignUpForm(formData);
        
        if (validationResult.isValid) {
            setErrors({});
            return true;
        } else {
            setErrors(validationResult.errors as SignUpFormErrors);
            return false;
        }
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
            const response = await signUpUser(formData.name, formData.email, formData.password);
            
            // Store user data in localStorage (tokens are in cookies)
            localStorage.setItem('user', JSON.stringify(response.user));
            
            navigate('/library');
        } catch (error) {
            setErrors({
                general: error instanceof Error ? error.message : AUTH_ERRORS.SIGNUP_UNEXPECTED
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignUp = () => {
        console.log('Google Sign-Up clicked');
    };

    return {
        formData,
        isLoading,
        errors,
        handleInputChange,
        handleSubmit,
        handleGoogleSignUp
    };
}; 