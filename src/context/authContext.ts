import {createContext} from "react";
import {Session} from "@supabase/supabase-js";
import {LogType} from "../hooks/useLogs.ts";
import {ResponseType} from "../hooks/useSignIn.ts";

export const AuthContext = createContext<AuthContextType>({
    session: null,
    signOut: async () => false,
    appLoading: true,
    logs: [],
    totalPages: 1,
    loading: false,
    onLoadPage: async (_) => ({status: false, message: ""})
});

export type AuthContextType = {
    session: Session | null;
    signOut: () => Promise<boolean>,
    appLoading: boolean,
    logs: LogType[],
    totalPages: number,
    loading: boolean,
    onLoadPage: (currentPage: number) => Promise<ResponseType>
}