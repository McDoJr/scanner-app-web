import Navigation from "../components/Navigation.tsx";
import {useContext} from "react";
import {AuthContext} from "../context/authContext.ts";

const Logs = () => {

    const { logs } = useContext(AuthContext);

    return (
        <Navigation name="logs">
            <div className="w-full h-full text-4xl py-[100px] px-[50px]">
                <h5 className="font-roboto">Logs</h5>
                <div className="mt-[50px] w-full h-full flex flex-col gap-[5px]">
                    <div className="w-full py-[3px] flex items-center border-b border-zinc-300">
                        <span className="w-[calc((100%/5)-180px)] font-bold text-[18px]">ID</span>
                        <span className="w-[calc((100%/5)+50px)] font-bold text-[18px]">Full Name</span>
                        <span className="w-[calc((100%/5)-50px)] font-bold text-[18px]">Artifact</span>
                        <span className="w-[calc((100%/5)-150px)] font-bold text-[18px]">Date</span>
                        <span className="w-[calc((100%/5)-150px)] font-bold text-[18px]">Time</span>
                    </div>
                    {logs.reverse().map((item, index) => {

                        return (
                            <div className="w-full py-[3px] flex items-center border-b border-zinc-300" key={index}>
                                <span className="w-[calc((100%/5)-180px)] text-[16px]">{item.id}</span>
                                <span className="w-[calc((100%/5)+50px)] text-[16px]">{item.fullname}</span>
                                <span className="w-[calc((100%/5)-50px)] text-[16px]">{item.artifact}</span>
                                <span className="w-[calc((100%/5)-150px)] text-[16px]">{item.date}</span>
                                <span className="w-[calc((100%/5)-150px)] text-[16px]">{item.time}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Navigation>
    )
}
export default Logs
