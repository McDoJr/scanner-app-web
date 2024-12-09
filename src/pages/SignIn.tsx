import Logo from "../assets/logo.png";
import {useSignIn} from "../hooks/useSignIn.ts";
import {FaEnvelope, FaLock, FaRegEye, FaRegEyeSlash} from "react-icons/fa";
import {useContext, useState} from "react";
import {AuthContext} from "../context/authContext.ts";
import {useNavigate} from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation.tsx";

const SignIn = () => {

    const navigate = useNavigate();
    const { session, appLoading } = useContext(AuthContext);
    const [hidden, setHidden] = useState(true);
    const { handleSubmit, onSubmit, register, errors, rules, loading } = useSignIn();
    const togglePassword = () => setHidden(prevState => !prevState);

    if(!appLoading && session && session.user) navigate("/admin/items");

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-background">
            <img src={Logo}/>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-10">
                {errors.email && <p className="text-red-700 mb-2 text-sm">{errors.email.message}</p>}
                <div className="flex flex-row items-center gap-3 border border-zinc-400 p-2 mb-5">
                    <FaEnvelope className="text-lg text-primary"/>
                    <input type="text" {...register("email", rules.email)} className="bg-transparent font-roboto outline-none"
                           placeholder="Email"/>
                </div>
                {errors.password && <p className="text-red-700 mb-2 text-sm">{errors.password.message}</p>}
                <div className="flex flex-row items-center input-line gap-3 mb-5 border border-zinc-400 p-2">
                    <FaLock className="text-lg text-primary"/>
                    <input type={hidden ? "password" : "text"} {...register("password", rules.password)} className="bg-transparent font-roboto outline-none"
                           placeholder="Password"/>
                    {hidden ? <FaRegEyeSlash className="text-lg text-primary cursor-pointer" onClick={togglePassword} /> : <FaRegEye className="text-lg text-primary cursor-pointer" onClick={togglePassword}/>}
                </div>
                <button type="submit"
                        className="bg-primary font-roboto font-lg text-white py-2">LOGIN
                </button>
                {loading && <LoadingAnimation />}
            </form>
        </div>
    )
}
export default SignIn
