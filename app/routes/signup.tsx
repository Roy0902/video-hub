import { FormHeader, SignUpForm } from '../components/Auth';

export default function SignUp() {
    return (
        <div className="h-full mt-10 flex items-top justify-center">
            <div className="w-[400px] min-h-[600px]  mb-10 bg-[#1e293b] bg-opacity-100 rounded-3xl p-8 shadow-xl flex flex-col">
                <FormHeader />
                <SignUpForm />
            </div>
        </div>
    );
} 