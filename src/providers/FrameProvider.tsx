import { createContext, useEffect, useState, useContext, useCallback } from "react";
import sdk, { type FrameHost } from "@farcaster/frame-sdk";

interface FrameContextValue {
    errors: Record<string, Error> | null;
    context: FrameHost['context'] | null;
    fUser: FrameHost['context']['user'] | null;
    handleAddFrame: () => Promise<void>;
    handleSetIsFrameAdding: (state: boolean) => void;
    isFrameAdded: boolean;
    isFrameAdding: boolean;
}

const FrameSDKContext = createContext<FrameContextValue | undefined>(undefined);

export function useFrameContext() {
    const context = useContext(FrameSDKContext);
    if (context === undefined) {
        throw new Error("useFrameContext must be used within an FramSDKProvider");
    }
    return context;
}

export function FrameSDKProvider({ children }: { children: React.ReactNode }) {
    const [errors, setErrors] = useState<Record<string, Error> | null>(null);
    const [context, setContext] = useState<FrameHost['context'] | null>(null);
    const [fUser, setFUser] = useState<FrameHost['context']['user'] | null>(null);
    const [isFrameAdded, setIsframeAdded] = useState<boolean>(false);
    const [isFrameAdding, setIsFrameAdding] = useState<boolean>(false)

    const handleSetIsFrameAdding = (state: boolean) => setIsFrameAdding(state);

    const handleAddFrame = useCallback(async () => {
        try {
            console.log("this was called")
            await sdk.actions.addFrame();
            setIsframeAdded(true);
        } catch (e: any) {
            setErrors({
                ...errors,
                addFrame: new Error("Error adding frame! " + e.message)
            })
        } finally {
            setIsFrameAdding(false)
        }
    }, []);


    useEffect(() => {
        sdk.actions.ready();
    }, []);

    // Load context
    useEffect(() => {
        const load = async () => {
            try {
                const context = await sdk.context;
                setContext(context)
                setFUser(context.user);
                setIsframeAdded(context.client.added);
            } catch (e: any) {
                setErrors({
                    ...errors,
                    load: new Error("You must load this page from within Warpcast!")
                })
            }
        }
        load()
    }, []);



    return (
        <FrameSDKContext.Provider value={{
            errors,
            fUser,
            context,
            handleAddFrame,
            handleSetIsFrameAdding,
            isFrameAdded,
            isFrameAdding,

        }}>
            {children}
        </FrameSDKContext.Provider>
    );
}