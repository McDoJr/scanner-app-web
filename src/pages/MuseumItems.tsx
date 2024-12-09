import Navigation from "../components/Navigation.tsx";
import {FaMagnifyingGlass} from "react-icons/fa6";
import Artifact from "../components/Artifact.tsx";
import {useContext, useState} from "react";
import ArtifactForm from "../components/ArtifactForm.tsx";
import {DataContext} from "../context/dataContext.ts";

const MuseumItems = () => {

    const { artifacts } = useContext(DataContext);
    const [formVisible, setFormVisible] = useState(false);

    return (
        <Navigation name="items">
            <div className="w-full h-full flex flex-col p-10 items-start">
                <div className="w-full flex justify-between items-center">
                    <div className="flex items-center rounded-[30px] overflow-hidden shadow-[15px]">
                        <div className="w-[500px] bg-white flex items-center gap-5 py-3 px-7">
                            <FaMagnifyingGlass/>
                            <input type="text" placeholder="Search" className="outline-none bg-transparent w-full"/>
                        </div>
                        <button type="button"
                                className="px-7 bg-primary py-3 h-full text-white hover:bg-primary/80 outline-none">Search
                        </button>
                    </div>
                    <div className="flex gap-10">
                        <button type="button" onClick={() => setFormVisible(true)} className="text-white bg-green-600 py-2 px-7 hover:bg-green-400">Upload</button>
                    </div>
                </div>
                <div className="w-full h-full mt-14 flex flex-wrap gap-[20px]">
                    {artifacts.map((item, index) => (<Artifact artifact={item} key={index.toString()}/>))}
                </div>
            </div>
            {formVisible && <ArtifactForm close={() => setFormVisible(false)} />}
        </Navigation>
    )
}
export default MuseumItems
