import {createContext, PropsWithChildren, useContext, useEffect, useState,} from 'react';
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from 'firebase/auth';


interface AuthContextProps {
    signUp: (payload: { email: string; password: string }) => Promise<void>;
    signIn: (payload: { email: string; password: string }) => Promise<void>;
    logOut: () => Promise<void>;

    user: User | null | undefined; // "undefined" = inicial cargando, "null" = no hay usuario
    isLoading: boolean;
}

// Valor inicial (por defecto)
const AuthContext = createContext<AuthContextProps>({
    signUp: async () => {
    },
    signIn: async () => {
    },
    logOut: async () => {
    },
    user: undefined,
    isLoading: false,
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export function AuthProvider({children}: PropsWithChildren<{}>) {
    const auth = getAuth();

    const [user, setUser] = useState<User | null | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    // Observa el estado de autenticación con onAuthStateChanged
    useEffect(() => {
        return onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setIsLoading(false);
        });
    }, []);

    // Registrar usuario
    const signUp = async ({email, password}: { email: string; password: string }) => {
        setIsLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // Iniciar sesión
    const signIn = async ({email, password}: { email: string; password: string }) => {
        setIsLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // Cerrar sesión
    const logOut = async () => {
        setIsLoading(true);
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const value: AuthContextProps = {
        signUp,
        signIn,
        logOut,
        user,
        isLoading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
