import {ArtifactType} from "../hooks/useArtifactsProvider.ts";


const Artifact = ({ artifact }: {artifact: ArtifactType}) => {

    return (
        <div className="w-[150px] h-[200px] bg-white border-[3px] border-white overflow-hidden cursor-pointer"  title={artifact.name} >
            <img src={artifact.avatar_url} style={{objectFit: "contain"}} />
        </div>
    )
}
export default Artifact
