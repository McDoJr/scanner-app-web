import {createContext} from "react";
import {Session} from "@supabase/supabase-js";
import {LogType} from "../hooks/useLogs.ts";
import {ResponseType} from "../hooks/useSignIn.ts";

export const AuthContext = createContext<AuthContextType>({
    session: null,
    signOut: async () => false,
    appLoading: true,
    logs: [],
    loading: false,
    loadLogs: async () => ({status: false, message: "", hasMore: true}),
    reset: () => {},
    hasMore: false
});

export type AuthContextType = {
    session: Session | null;
    signOut: () => Promise<boolean>,
    appLoading: boolean,
    logs: LogType[],
    loading: boolean,
    loadLogs: () => Promise<ResponseType & {hasMore: boolean}>,
    reset: () => void,
    hasMore: boolean
}