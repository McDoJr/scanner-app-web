import {ArtifactType} from "../hooks/useArtifactsProvider.ts";


const Artifact = ({ artifact, onClick }: {artifact: ArtifactType, onClick: (selected: ArtifactType) => void}) => {

    return (
        <div onClick={() => onClick(artifact)} className="w-[calc((100%-80px)/5)] bg-white border-[3px] border-white overflow-hidden cursor-pointer flex flex-col justify-center items-center shadow-xl" style={{aspectRatio: .8}} title={artifact.name} >
            <img src={artifact.avatar_url} style={{width: "100%", height: "100%", objectFit: "contain"}} />
        </div>
    )
}
export default Artifact
