import Navigation from "../components/Navigation.tsx";
import {FaMagnifyingGlass} from "react-icons/fa6";
import Artifact from "../components/Artifact.tsx";
import {useContext, useState} from "react";
import ArtifactForm from "../components/ArtifactForm.tsx";
import {DataContext} from "../context/dataContext.ts";
import {ArtifactType} from "../hooks/useArtifactsProvider.ts";

const MuseumItems = () => {

    const { artifacts } = useContext(DataContext);
    const [search, setSearch] = useState("");
    const items = artifacts.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    const [formVisible, setFormVisible] = useState(false);
    const [artifact, setArtifact] = useState<ArtifactType | null>(null);

    const itemsToRows = () => {
        const datas: ArtifactType[][] = [];
        for(let i = 0; i < items.length; i += 6) {
            datas.push(items.slice(i, i + 6));
        }
        return datas;
    }

    return (
        <Navigation name="items">
            <div className="w-full h-full flex flex-col p-10 items-start">
                <div className="w-full flex justify-between items-center">
                    <div className="flex items-center rounded-[30px] overflow-hidden shadow-[15px]">
                        <div className="w-[500px] bg-white flex items-center gap-5 py-3 px-7">
                            <FaMagnifyingGlass/>
                            <input type="text" onChange={e => setSearch(e.target.value)} placeholder="Search" className="outline-none bg-transparent w-full"/>
                        </div>
                        <button type="button"
                                className="px-7 bg-primary py-3 h-full text-white hover:bg-primary/80 outline-none">Search
                        </button>
                    </div>
                    <div className="flex gap-10">
                        <button type="button" onClick={() => setFormVisible(true)}
                                className="text-white bg-green-600 py-2 px-7 hover:bg-green-400">Upload
                        </button>
                    </div>
                </div>
                <div className="w-full h-full mt-10 flex flex-col">
                    {itemsToRows().map((items, index) => (
                        <div className={`w-full flex gap-[20px] ${index > 0 && 'mt-[20px]'}`} key={index}>
                            {items.map((item, index) => <Artifact artifact={item} onClick={selected => setArtifact(selected)} key={index.toString()}/>)}
                        </div>
                    ))}
                </div>
            </div>
            {artifact && (
                <div onClick={() => setArtifact(null)} className="w-full h-screen p-[50px] fixed top-0 left-0 flex justify-center items-center bg-black/80">
                    <div className="h-full bg-white my-auto mx-auto overflow-hidden flex flex-col justify-center items-center" style={{aspectRatio: .5}}>
                        <img src={artifact.avatar_url} className="object-contain" />
                        <p>{artifact.name}</p>
                        <p>{artifact.description}</p>
                    </div>
                </div>
            )}
            {formVisible && <ArtifactForm close={() => setFormVisible(false)}/>}
        </Navigation>
    )
}
export default MuseumItems
