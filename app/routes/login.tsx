// app/routes/login.tsx
import { useState } from 'react';
import { useAuth } from 'react-use-auth';
import { useNavigate } from 'react-router-dom';
import { RxVideo } from "react-icons/rx"; 

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            await login(email, password);
            navigate('/library');
        } catch (error) {
            setError('Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1e293b]">
            <div className="w-[400px] bg-[#1e293b] bg-opacity-100 rounded-3xl p-8 shadow-xl">

                <div className="flex flex-row pb-4 mb-4 items-center justify-start gap-4 border-b-2 border-gray-400">
                    <RxVideo size={50} className="text-blue-500" />
                    <h1 className="font-bold text-2xl text-white">Welcome Back</h1>
                </div>


                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-10 rounded-md border border-gray-600 bg-[#1e293b] px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-10 rounded-md border border-gray-600 bg-[#1e293b] px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-600 bg-[#1e293b] text-blue-500 focus:ring-blue-500"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
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
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Signing in...
                            </div>
                        ) : (
                            'Sign in'
                        )}
                    </button>

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