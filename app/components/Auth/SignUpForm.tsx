import { FormInput } from '@/components/Auth/FormInput';
import { LoadingSpinner } from '@/components/Auth/LoadingSpinner';
import { GoogleSignInButton } from '@/components/Auth/GoogleSignInButton';
import { useSignUp } from '@/hooks/useSignUp';
import { Link } from 'react-router-dom';

export const SignUpForm = () => {
    const {
        formData,
        isLoading,
        errors,
        handleInputChange,
        handleSubmit,
        handleGoogleSignUp
    } = useSignUp();

    return (
        <form onSubmit={handleSubmit} className="space-y-4 flex-1" noValidate>
            <div className="space-y-4">
                <FormInput
                    id="name"
                    label="Full Name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    error={errors.name}
                    required
                />

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
                    placeholder="Create a password"
                    error={errors.password}
                    required
                />

                <FormInput
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    error={errors.confirmPassword}
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

            <div className="flex items-center">
                <input
                    id="agreeToTerms"
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-600 bg-[#1e293b] text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-300">
                    I agree to the{' '}
                    <a href="#" className="text-blue-500 hover:text-blue-400">
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-500 hover:text-blue-400">
                        Privacy Policy
                    </a>
                </label>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? <LoadingSpinner /> : 'Create Account'}
            </button>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#1e293b] text-gray-400">Or continue with</span>
                </div>
            </div>

            <GoogleSignInButton onClick={handleGoogleSignUp} />

            <div className="text-center text-sm text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500 hover:text-blue-400">
                    Sign in
                </Link>
            </div>
        </form>
    );
}; 