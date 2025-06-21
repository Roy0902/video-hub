type FormInputProps ={
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    error?: string;
    required?: boolean;
}

export const FormInput = ({ 
    id, 
    label, 
    type, 
    value, 
    onChange, 
    placeholder, 
    error,
    required = false 
}: FormInputProps) => (
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