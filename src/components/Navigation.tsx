import * as React from "react";
import {FaRegEye} from "react-icons/fa";
import {FaArrowRightFromBracket, FaRegPenToSquare} from "react-icons/fa6";
import Logo from "../assets/logo.png"
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/authContext.ts";
import {useNavigate} from "react-router-dom";
import LoadingAnimation from "./LoadingAnimation.tsx";

const Navigation = ({ children, name }: {children?: React.ReactNode, name: string}) => {

    const navigate = useNavigate();
    const { signOut, session } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!loading && !session) navigate("/");
    }, [session, loading]);

    const onSignOut = () => {
        setLoading(true);
        signOut().then(_ => {
            setLoading(false);
        })
    }

    return (
        <div className="w-full h-screen flex bg-background relative">
            <div className="h-screen w-[300px] flex flex-col py-10 px-14 bg-primary">
                <div className="bg-background w-[100px] h-[100px] mx-auto mb-20">
                    <img src={Logo} className="contain" />
                </div>
                <div onClick={() => navigate("/admin/logs")} className={`w-full flex items-center gap-5 py-4 cursor-pointer ${name === "logs" ? 'border-b border-zinc-300' : 'bg-transparent'}`}>
                    <FaRegEye className="text-white"/>
                    <span className="text-white font-roboto">Logs</span>
                </div>
                <div onClick={() => navigate("/admin/items")} className={`w-full flex items-center gap-5 py-4 cursor-pointer ${name === "items" ? 'border-b border-zinc-300' : 'bg-transparent'}`}>
                    <FaRegPenToSquare className="text-white"/>
                    <span className="text-white font-roboto">Manage Items</span>
                </div>
                <div onClick={onSignOut} className="w-full flex items-center gap-5 py-4 mt-auto cursor-pointer">
                    <FaArrowRightFromBracket className="text-white"/>
                    <span className="text-white font-roboto">Logout</span>
                </div>
            </div>
            {children}
            {loading && <LoadingAnimation />}
        </div>
    )
}
export default Navigation
