import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RxVideo } from "react-icons/rx"; 
import { FcGoogle } from "react-icons/fc";

type LoginFormData = {
    email: string;
    password: string;
    rememberMe: boolean;
}

type LoginFormErrors = {
    email?: string;
    password?: string;
    general?: string;
}

type LoginResponse = {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    }
}

const INITIAL_FORM_STATE: LoginFormData = {
    email: '',
    password: '',
    rememberMe: false
};

const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch('https://api.example.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
    }

    return response.json();
};

const FormHeader = () => (
    <div className="flex flex-row pb-4 mb-4 items-center justify-start gap-4 border-b-2 border-gray-400">
        <RxVideo size={50} className="text-blue-500" />
        <h1 className="font-bold text-2xl text-white">Welcome Back</h1>
    </div>
);

const FormInput = ({ 
    id, 
    label, 
    type, 
    value, 
    onChange, 
    placeholder, 
    error,
    required = false 
}: { 
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    error?: string;
    required?: boolean;
}) => (
    <div className="min-h-[75px]">
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
            {label}
        </label>
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            className={`w-full h-10 rounded-md border ${error ? 'border-red-500' : 'border-gray-600'} bg-[#1e293b] px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
            placeholder={placeholder}
            required={required}
        />
        <div className="min-h-[20px]">
            {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
        </div>
    </div>
);

const LoadingSpinner = () => (
    <div className="flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
        Signing in...
    </div>
);

const GoogleSignInButton = () => (
    <button
        type="button"
        className="w-full py-3 px-4 text-gray-700 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm text-center flex items-center justify-center gap-2 border border-gray-300"
    >
        <FcGoogle size={20} />
        Sign in with Google
    </button>
);

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginFormData>(INITIAL_FORM_STATE);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<LoginFormErrors>({});

    const validateForm = (): boolean => {
        const newErrors: LoginFormErrors = {};
        
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
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
            
            if (formData.rememberMe) {
                localStorage.setItem('authToken', response.token);
            } else {
                sessionStorage.setItem('authToken', response.token);
            }

            localStorage.setItem('user', JSON.stringify(response.user));
            
            navigate('/library');
        } catch (error) {
            setErrors({
                general: error instanceof Error ? error.message : 'An error occurred during login'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = () => {
        console.log('Google Sign-In clicked');
    };

    return (
        <div className="h-full mt-25 flex items-top justify-center">
            <div className="w-[400px] min-h-[600px] bg-[#1e293b] bg-opacity-100 rounded-3xl p-8 shadow-xl flex flex-col">
                <FormHeader />

                <form onSubmit={handleSubmit} className="space-y-4 flex-1" noValidate>
                    <div className="space-y-4">
                        <FormInput
                            id="email"
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            error={errors.email}
                            required
                        />

                        <FormInput
                            id="password"
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                            error={errors.password}
                            required
                        />
                    </div>

                    <div className="min-h-[4px]">
                        {errors.general && (
                            <div className="text-red-500 text-sm">
                                {errors.general}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="rememberMe"
                                type="checkbox"
                                checked={formData.rememberMe}
                                onChange={handleInputChange}
                                className="h-4 w-4 rounded border-gray-600 bg-[#1e293b] text-blue-500 focus:ring-blue-500"
                            />
                            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-300">
                                Remember me
                            </label>
                        </div>
                        <a href="#" className="text-sm text-blue-500 hover:text-blue-400">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <LoadingSpinner /> : 'Sign in'}
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-[#1e293b] text-gray-400">Or continue with</span>
                        </div>
                    </div>

                    <GoogleSignInButton />

                    <div className="text-center text-sm text-gray-400">
                        Don't have an account?{' '}
                        <a href="#" className="text-blue-500 hover:text-blue-400">
                            Sign up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}