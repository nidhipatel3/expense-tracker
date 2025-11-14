import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    fullName: string;
    email: string;
    profileImageURL?: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initUser = () => {
            if (!document.cookie.includes('token=')) {
                setUser(null);
                setLoading(false);
                return;
            }

            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    if (parsedUser && typeof parsedUser === 'object') {
                        setUser(parsedUser);
                    } else {
                        setUser(null);
                    }
                } catch (error) {
                    console.error("Failed to parse stored user:", error);
                    localStorage.removeItem("user");
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        };
        initUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};