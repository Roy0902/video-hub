import { FcGoogle } from "react-icons/fc";

interface GoogleSignInButtonProps {
    onClick: () => void;
}

export const GoogleSignInButton = ({ onClick }: GoogleSignInButtonProps) => (
    <button
        type="button"
        onClick={onClick}
        className="w-full py-3 px-4 text-gray-700 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm text-center flex items-center justify-center gap-2 border border-gray-300"
    >
        <FcGoogle size={20} />
        Sign in with Google
    </button>
); 