import {ResponseType} from "../hooks/useSignIn.ts";
import {FaCircleCheck, FaCircleXmark} from "react-icons/fa6";

type Props = {
    response?: ResponseType
}

const LoadingAnimation = ({ response }: Props) => {
    return (
        <div className="w-full h-screen flex justify-center items-center fixed top-0 left-0 bg-primary/80">
            {!response ? <span className="loader"/> : (
                <div className="bg-white py-5 px-14 rounded-[15px] flex flex-col gap-5 items-center">
                    {response.status ? <FaCircleCheck className="text-green-400 w-[50px] h-[50px]"/> : <FaCircleXmark className="text-red-400 w-[50px] h-[50px]" />}
                    <span className={`text-black text-xl`}>{response.message}</span>
                </div>
            )}
        </div>
    )
}
export default LoadingAnimation
