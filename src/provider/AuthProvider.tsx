import {AuthContext} from "../context/authContext.ts";
import * as React from "react";
import {useAuthProvider} from "../hooks/useAuthProvider.ts";
import {DataContext} from "../context/dataContext.ts";
import {useArtifactsProvider} from "../hooks/useArtifactsProvider.ts";

type Props = {
    children?: React.ReactNode
}

const AuthProvider = ({ children }: Props) => {
    const auth = useAuthProvider();
    const artifacts = useArtifactsProvider(auth.session);
    return (
        <AuthContext.Provider value={{...auth}}>
            <DataContext.Provider value={artifacts}>{children}</DataContext.Provider>
        </AuthContext.Provider>
    )
}
export default AuthProvider
