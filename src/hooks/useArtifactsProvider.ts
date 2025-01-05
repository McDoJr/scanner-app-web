import {useEffect, useState} from "react";
import {Session} from "@supabase/supabase-js";
import {ResponseType} from "./useSignIn.ts";
import {supabase} from "../../supabase/supabase.ts";

export const useArtifactsProvider = (session: Session | null) => {

    const [artifacts, setArtifacts] = useState<ArtifactType[]>([]);

    useEffect(() => {
        if(session && session.user) {
            reloadArtifacts();

            const channel = session.user.id + "_artifact_"

            const artifact_insert_channel = supabase.channel(channel + "insert")
                .on(
                    "postgres_changes",
                    {
                        event: "INSERT",
                        schema: "public",
                        table: "artifacts"
                    },
                    (payload) => {
                        setArtifacts(prevState => ([payload.new as ArtifactType, ...prevState]));
                    }
                ).subscribe();

            const artifact_delete_channel = supabase.channel(channel + "insert")
                .on(
                    "postgres_changes",
                    {
                        event: "DELETE",
                        schema: "public",
                        table: "artifacts"
                    },
                    (payload) => {
                        setArtifacts(prevState => prevState.filter(item => item.id !== payload.old.id));
                    }
                ).subscribe();

            return () => {
                supabase.removeChannel(artifact_insert_channel).catch(console.log);
                supabase.removeChannel(artifact_delete_channel).catch(console.log);
            }
        }

    }, [session]);

    const reloadArtifacts = async (): Promise<ResponseType> => {
        try {
            const { data, error } = await supabase
                .from("artifacts")
                .select("*")
                .order('created_at', {ascending: false});
            if(error) {
                throw error;
            }
            setArtifacts(data);
            return {status: true, message: "Artifacts loaded successfully!"}
        }catch (error) {
            console.log(error);
            return {status: false, message: "Failed loading artifacts. Try to load it again!"};
        }
    }

    return {
        artifacts,
        reloadArtifacts
    }

}

export type ArtifactType = {
    id: string,
    name: string,
    description: string,
    avatar_url: string,
    locked_avatar_url: string,
    created_at: string
}