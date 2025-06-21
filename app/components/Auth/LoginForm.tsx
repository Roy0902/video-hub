import { FormInput } from '@/components/Auth/FormInput';
import { LoadingSpinner } from '@/components/Auth/LoadingSpinner';
import { GoogleSignInButton } from '@/components/Auth/GoogleSignInButton';
import { useLogin } from '@/hooks/useLogin';
import { Link } from 'react-router-dom';

export const LoginForm = () => {
    const {
        formData,
        isLoading,
        errors,
        handleInputChange,
        handleSubmit,
        handleGoogleSignIn
    } = useLogin();

    return (
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

            <GoogleSignInButton onClick={handleGoogleSignIn} />

            <div className="text-center text-sm text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-500 hover:text-blue-400">
                    Sign up
                </Link>
            </div>
        </form>
    );
}; 