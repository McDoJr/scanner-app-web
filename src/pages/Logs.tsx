import Navigation from "../components/Navigation.tsx";
import {useContext, useState} from "react";
import {AuthContext} from "../context/authContext.ts";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import LoadingAnimation from "../components/LoadingAnimation.tsx";

const Logs = () => {

    const { logs, loading, totalPages, onLoadPage } = useContext(AuthContext);
    const [page, setPage] = useState(1);
    const pages = [page > 1 && page-1, page, page < totalPages && page+1];

    const next = () => {
        if(page < totalPages) {
            setPage(page + 1);
            onLoadPage(page + 1);
        }
    }

    const previous = () => {
        if(page > 1) {
            setPage(page - 1);
            onLoadPage(page - 1);
        }
    }

    return (
        <Navigation name="logs">
            <div className="w-full h-full text-4xl py-[100px] px-[50px] select-none">
                <h5 className="font-roboto">Logs</h5>
                <div className="mt-[50px] w-full h-full flex flex-col gap-[5px]">
                    <div className="flex items-center gap-2">
                        <FaChevronLeft size={18} className="cursor-pointer" onClick={previous} />
                        {pages.map((item, index) => {
                            return <p className={`text-[18px] ${item === page ? "font-bold" : "text-zinc-300"}`} key={index}>{item}</p>
                        })}
                        <FaChevronRight size={18} className="cursor-pointer" onClick={next} />
                    </div>
                    <div className="w-full py-[3px] flex items-center border-b border-zinc-300">
                        <span className="w-[calc((100%/5)-180px)] font-bold text-[18px]">ID</span>
                        <span className="w-[calc((100%/5)-50px)] font-bold text-[18px]">Full Name</span>
                        <span className="w-[calc((100%/5)+100px)] font-bold text-[18px]">Artifact</span>
                        <span className="w-[calc((100%/5)-150px)] font-bold text-[18px]">Date</span>
                        <span className="w-[calc((100%/5)-150px)] font-bold text-[18px]">Time</span>
                    </div>
                    {logs.reverse().map((item, index) => {

                        return (
                            <div className="w-full py-[3px] flex items-center border-b border-zinc-300" key={index}>
                                <span className="w-[calc((100%/5)-180px)] text-[16px]">{item.id}</span>
                                <span className="w-[calc((100%/5)-50px)] text-[16px]">{item.fullname}</span>
                                <span className="w-[calc((100%/5)+100px)] text-[16px]">{item.artifact}</span>
                                <span className="w-[calc((100%/5)-150px)] text-[16px]">{item.date}</span>
                                <span className="w-[calc((100%/5)-150px)] text-[16px]">{item.time}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            {loading && <LoadingAnimation />}
        </Navigation>
    )
}
export default Logs
