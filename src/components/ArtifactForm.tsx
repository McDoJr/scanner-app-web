import {ArtifactFormType, useArtifactForm} from "../hooks/useArtifactForm.ts";
import {FaRegImage} from "react-icons/fa";
import {FaXmark} from "react-icons/fa6";
import {useState} from "react";
import {ResponseType} from "../hooks/useSignIn.ts";
import LoadingAnimation from "./LoadingAnimation.tsx";

type Props = {
    close: () => void
}

const ArtifactForm = ({ close }: Props) => {

    const [uploading, setUploading] = useState(false);
    const [response, setResponse] = useState<ResponseType>()
    const { register, handleSubmit, watch, setValue, upload } = useArtifactForm();

    const avatar = watch("avatar");
    const avatar_shadow = watch("avatar_shadow");

    const onSubmit = (formData: ArtifactFormType) => {
        const {avatar, avatar_shadow} = formData;
        if(!avatar || !avatar_shadow) return;
        setUploading(true);
        upload(formData).then(result => {
            setResponse(result);
            setTimeout(() => {
                setUploading(false);
                close();
            }, 2000);
        })
    }

    return (
        <div className="absolute top-0 left-0 w-full h-screen bg-black/80 flex justify-center items-center">
            <form action="" className="w-[600px] bg-background py-5 px-14 pb-10 flex flex-col relative" onSubmit={handleSubmit(onSubmit)}>
                <FaXmark className="absolute cursor-pointer w-8 h-8 top-[10px] right-[10px]" onClick={close} />
                <h3 className="font-roboto text-3xl mb-16 text-center">Upload Artifact</h3>
                <label className="mb-2">Artifact Name</label>
                <input type="text" {...register("name")}
                       className="outline-none py-2 px-2 border border-zinc-300 rounded-md mb-5"/>
                <label className="mb-2">Artifact Description</label>
                <input type="text" {...register("description")}
                       className="outline-none py-2 px-2 border border-zinc-300 rounded-md mb-5"/>
                <div className="flex justify-center gap-20">
                    <div className="flex flex-col">
                        <label className="mb-2 text-center">Image</label>
                        <div
                            className="w-[150px] h-[150px] flex justify-center items-center bg-white border border-zinc-300 relative overflow-hidden cursor-pointer">
                            {!avatar ? <FaRegImage className="w-[50px] h-[50px]"/> : (
                                <img src={URL.createObjectURL(avatar)} className="w-full h-full"/>
                            )}
                            <input type="file"
                                   onChange={event => {
                                       const files = event.target.files;
                                       if(files) setValue("avatar", files[0]);
                                   }}
                                   className="absolute top-[-50px] left-[-50px] w-[500px] h-[500px] cursor-pointer bg-transparent"/>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2 text-center">Image Shadow</label>
                        <div
                            className="w-[150px] h-[150px] flex justify-center items-center bg-white border border-zinc-300 relative overflow-hidden cursor-pointer">
                            {!avatar_shadow ? <FaRegImage className="w-[50px] h-[50px]"/> : (
                                <img src={URL.createObjectURL(avatar_shadow)} className="w-full h-full"/>
                            )}
                            <input type="file"
                                   onChange={event => {
                                       const files = event.target.files;
                                       if(files) setValue("avatar_shadow", files[0]);
                                   }}
                                   className="absolute top-[-50px] left-[-50px] w-[500px] h-[500px] cursor-pointer bg-transparent"/>
                        </div>
                    </div>
                </div>
                <button type="submit" className="bg-primary py-3 px-14 mt-10 text-white self-center hover:bg-primary/80">Upload</button>
            </form>
            {uploading && <LoadingAnimation response={response} />}
        </div>
    )
}
export default ArtifactForm
