import { AUTH_ERRORS } from '@/constants/errorMessages';

// Spring Boot API Response Types
type ApiResponse<T> = {
    code: number;
    message: string;
    data: T;
}

type Response = {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        email: string;
        name: string;
    }
}

type LoginResponse = ApiResponse<Response>;

// Sign up request type
type SignUpRequest = {
    name: string;
    email: string;
    password: string;
}

// Sign up response type (same as login response)
type SignUpResponse = ApiResponse<Response>;

const setCookie = (name: string, value: string, expires: number) => {
    const date = new Date();
    date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));
    
    const expiresString = `; expires=${date.toUTCString()}`;
    const secureString = '; secure';
    const sameSiteString = '; samesite=strict';
    const pathString = '; path=/';
    
    document.cookie = `${name}=${value}${expiresString}${pathString}${secureString}${sameSiteString}`;
};

const getCookie = (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

const removeCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const loginUser = async (email: string, password: string): Promise<Response> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
        const response = await fetch('http://localhost:8081/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password }),
            signal: controller.signal
        });

        clearTimeout(timeoutId); 

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || AUTH_ERRORS.LOGIN_FAILED);
        }

        const apiResponse: LoginResponse = await response.json();
        
        // Check if the API response indicates success
        if (apiResponse.code !== 200) {
            throw new Error(apiResponse.message || AUTH_ERRORS.LOGIN_FAILED);
        }

        const loginData = apiResponse.data;

        setCookie('accessToken', loginData.accessToken, 1); 
        setCookie('refreshToken', loginData.refreshToken, 30); 
        
        return loginData;
    } catch (error) {
        clearTimeout(timeoutId); // Clear timeout on error
        
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                throw new Error(AUTH_ERRORS.LOGIN_TIMEOUT);
            }
            throw error;
        }
        
        throw new Error(AUTH_ERRORS.LOGIN_UNEXPECTED);
    }
};

export const signUpUser = async (name: string, email: string, password: string): Promise<Response> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
        const response = await fetch('http://localhost:8081/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password } as SignUpRequest),
            signal: controller.signal
        });

        clearTimeout(timeoutId); 

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || AUTH_ERRORS.SIGNUP_FAILED);
        }

        const apiResponse: SignUpResponse = await response.json();
        
        if (apiResponse.code !== 200) {
            throw new Error(apiResponse.message || AUTH_ERRORS.SIGNUP_FAILED);
        }

        const signUpData = apiResponse.data;

        setCookie('accessToken', signUpData.accessToken, 1); 
        setCookie('refreshToken', signUpData.refreshToken, 30); 
        
        return signUpData;
    } catch (error) {
        clearTimeout(timeoutId); // Clear timeout on error
        
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                throw new Error(AUTH_ERRORS.SIGNUP_TIMEOUT);
            }
            throw error;
        }
        
        throw new Error(AUTH_ERRORS.SIGNUP_UNEXPECTED);
    }
};

export const logoutUser = () => {
    // Remove tokens from cookies
    removeCookie('accessToken');
    removeCookie('refreshToken');
    
    localStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
};

export const getAccessToken = (): string | null => {
    return getCookie('accessToken');
};

export const getRefreshToken = (): string | null => {
    return getCookie('refreshToken');
};

export const refreshAccessToken = async (): Promise<string> => {
    const refreshToken = getRefreshToken();
    
    if (!refreshToken) {
        throw new Error(AUTH_ERRORS.NO_REFRESH_TOKEN);
    }

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds

    try {
        const response = await fetch('http://localhost:8081/api/user/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
            signal: controller.signal
        });

        clearTimeout(timeoutId); // Clear timeout if request completes

        if (!response.ok) {
            throw new Error(AUTH_ERRORS.REFRESH_FAILED);
        }

        const { accessToken } = await response.json();
        
        setCookie('accessToken', accessToken, 1);
        
        return accessToken;
    } catch (error) {
        clearTimeout(timeoutId); // Clear timeout on error
        
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                throw new Error(AUTH_ERRORS.REFRESH_TIMEOUT);
            }
            throw error;
        }
        
        throw new Error(AUTH_ERRORS.REFRESH_UNEXPECTED);
    }
}; 