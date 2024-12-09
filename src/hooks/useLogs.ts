import {useEffect, useState} from "react";
import {Session} from "@supabase/supabase-js";
import {supabase} from "../../supabase/supabase.ts";
import {ResponseType} from "./useSignIn.ts";

export const useLogs = (session: Session | null) => {
    const [logs, setLogs] = useState<LogType[]>([]);
    const [loading, setLoading] = useState(false);
    const [pages, setPages] = useState<number[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        if(session) {
            const channel = session.user.id + "_logs_";
            fetchTotalPages().then(result => {
                if(result) {
                    onLoadPage(1);
                }
            })

            const artifact_insert_channel = supabase.channel(channel + "insert")
                .on(
                    "postgres_changes",
                    {
                        event: "INSERT",
                        schema: "public",
                        table: "logs"
                    },
                    (payload) => {
                        setLogs(prevState => ([...prevState, payload.new as LogType]));
                    }
                ).subscribe();

            return () => {
                supabase.removeChannel(artifact_insert_channel).catch(console.log);
            }
        }
    }, [session]);

    const fetchTotalPages = async (): Promise<boolean> => {
        const { count, error } = await supabase
            .from('logs')
            .select('*', { count: 'exact', head: true });

        if (error) {
            console.error('Error fetching total count:', error);
            return false;
        }

        setTotalPages(Math.ceil((count ?? 0) / ITEMS_PER_PAGE));
        return true;
    }

    const loadLogs = async (currentPage: number): Promise<ResponseType> => {
        setLoading(true);
        const from = (currentPage - 1) * ITEMS_PER_PAGE;
        const to = from + ITEMS_PER_PAGE - 1;

        const { data, error } = await supabase
            .from('logs')
            .select('*')
            .range(from, to);

        if (error) {
            console.error('Error fetching logs:', error);
        } else {
            setLogs(data ?? []);
            return {status: true, message: ""}
        }
        setLoading(false);
        return {status: false, message: "Error loading logs"}
    }

    const onLoadPage = async (currentPage: number): Promise<ResponseType> => {
        if(pages.includes(currentPage)) return {status: false, message: ""};
        setPages(prevState => ([...prevState, currentPage]));
        return loadLogs(currentPage);
    }

    return {
        logs,
        totalPages,
        onLoadPage,
        loading,
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