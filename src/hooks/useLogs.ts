import {useEffect, useRef, useState} from "react";
import {Session} from "@supabase/supabase-js";
import {supabase} from "../../supabase/supabase.ts";
import {ResponseType} from "./useSignIn.ts";

export const useLogs = (session: Session | null) => {
    const [logs, setLogs] = useState<LogType[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const mounted = useRef(false);
    const ITEMS_PER_PAGE = 12;

    useEffect(() => {
        if(session) {
            const channel = session.user.id + "_logs_";
            if(!mounted.current) {
                mounted.current = true;
                loadLogs();
            }

            const artifact_insert_channel = supabase.channel(channel + "insert")
                .on(
                    "postgres_changes",
                    {
                        event: "INSERT",
                        schema: "public",
                        table: "logs"
                    },
                    (payload) => {
                        setLogs(prevState => {
                            const data = [payload.new as LogType, ...prevState];
                            setHasMore(data.length > ITEMS_PER_PAGE);
                            if(prevState.length > ITEMS_PER_PAGE) {
                                data.pop();
                            }
                            return data;
                        });
                    }
                ).subscribe();

            return () => {
                supabase.removeChannel(artifact_insert_channel).catch(console.log);
            }
        }
    }, [session]);

    const loadLogs = async (): Promise<ResponseType & {hasMore: boolean}> => {
        setLoading(true);
        const from = logs.length;
        const to = from + (ITEMS_PER_PAGE - 1);

        const { data, error } = await supabase
            .from('logs')
            .select('*')
            .order('created_at', { ascending: false })
            .range(from, to);
        if (error) {
            console.error('Error fetching logs:', error);
        } else {
            setLogs(prevState => [...prevState, ...data]);
            setLoading(false)
            setHasMore(data && data.length === ITEMS_PER_PAGE);
            return {status: true, message: "", hasMore: data && data.length == ITEMS_PER_PAGE}
        }
        setLoading(false);
        return {status: false, message: "Error loading logs", hasMore: true}
    }

    const reset = () => {
        mounted.current = false;
        setLogs([]);
    }

    return {
        logs,
        loadLogs,
        loading,
        reset,
        hasMore
    }
}

export type LogType = {
    id: string,
    artifact_id: string,
    user_id: string,
    fullname: string,
    artifact: string,
    date: string,
    time: string
}