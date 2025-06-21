import { FormHeader, LoginForm } from '../components/Auth';

export default function Login() {
    return (
        <div className="h-full mt-25 flex items-top justify-center">
            <div className="w-[400px] min-h-[600px] bg-[#1e293b] bg-opacity-100 rounded-3xl p-8 shadow-xl flex flex-col">
                <FormHeader />
                <LoginForm />
            </div>
        </div>
    );
}