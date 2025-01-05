import {useEffect, useState} from "react";
import {Session} from "@supabase/supabase-js";
import {supabase} from "../../supabase/supabase.ts";
import {useLogs} from "./useLogs.ts";

export const useAuthProvider = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [appLoading, setAppLoading] = useState(true);
    const logs = useLogs(session);

    useEffect(() => {

        supabase.auth.getSession()
            .then(({data: { session }}) => {
                if(session) setSession(session);
                setAppLoading(false)
            });

        const {data} = supabase.auth.onAuthStateChange((_event, session) => setSession(session));

        return () => data.subscription.unsubscribe();
    }, []);

    const signOut = async (): Promise<boolean> => {
        const {error} = await supabase.auth.signOut();
        if(error) {
            console.log("Sign Out Error: ", error)
            return false;
        }
        logs.reset();
        localStorage.removeItem("sb-chziasxekmfmmliuaqux-auth-token");
        return true;
    }

    return {
        session,
        signOut,
        appLoading,
        ...logs
    }
}