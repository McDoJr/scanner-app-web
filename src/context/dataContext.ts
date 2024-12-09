import {createContext} from "react";
import {ArtifactType} from "../hooks/useArtifactsProvider.ts";
import {ResponseType} from "../hooks/useSignIn.ts";

export const DataContext = createContext<DataContextType>({
    artifacts: [],
    reloadArtifacts: async () => ({status: false, message: ""})
});

type DataContextType = {
    artifacts: ArtifactType[],
    reloadArtifacts: () => Promise<ResponseType>
}