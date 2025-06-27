import { useContext, createContext, useEffect, useState } from "react";
import { useFrameContext } from "./FrameProvider";
import axios from "axios";


interface AuthContextValue {
    isAuthenticated: boolean;
    signer_uuid: string;
    authentication_url?: string;
    deadline: number;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [signer_uuid, setSignerUuid] = useState<string>("");
    const [authentication_url, setAuthenticationUrl] = useState<string | undefined>(undefined);
    const [deadline, setDeadline] = useState<number>(0);

    const { fUser } = useFrameContext();

    useEffect(() => {
        if (!fUser) return;
        const fetchAuthData = async () => {
            try {
                const { data } = await axios.post("/api/get_signer", {
                    u_fid: fUser.fid
                });
                console.log(data);
                setIsAuthenticated(true);
                setSignerUuid("");
                setAuthenticationUrl("");
                setDeadline(0)
            } catch (error) {
                console.error("Error fetching authentication data:", error);
            }
        };
        fetchAuthData();
    }, [fUser]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, signer_uuid, authentication_url, deadline }}>
            {children}
        </AuthContext.Provider>
    );
}
