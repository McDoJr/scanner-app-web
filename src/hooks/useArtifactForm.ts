import {useForm} from "react-hook-form";
import {supabase} from "../../supabase/supabase.ts";
import {ResponseType} from "./useSignIn.ts";

export const useArtifactForm = () => {

    const { register, handleSubmit, formState: {errors}, watch, setValue } = useForm<ArtifactFormType>();

    const upload = async (formData: ArtifactFormType): Promise<ResponseType> => {
        try {

            let avatar: File | string | null = formData.avatar;

            const fileName = `public/${Date.now()}`;
            const { error: uploadError } = await supabase
                .storage
                .from('avatars') // Replace with your bucket name
                .upload(fileName, avatar, {
                    contentType: avatar.type,
                });

            if (uploadError) throw uploadError;

            // Get the public URL for each file
            const { data } = supabase
                .storage
                .from('avatars')
                .getPublicUrl(fileName);

            if (!data) {
                console.log("Image upload error");
                avatar = null;
            }

            avatar = data.publicUrl;

            if(!avatar) {
                return {status: false, message: "Failed uploading artifact. Please try again!"};
            }

            const {error} = await supabase.from("artifacts").insert([
                {name: formData.name, description: formData.description, avatar_url: avatar, locked_avatar_url: avatar}
            ])

            if(error) {
                console.log("Upload artifact error: ", error);
                return {status: false, message: "Failed uploading artifact. Please try again!"};
            }

            return {status: true, message: "Artifact uploaded successfully!"};
        }catch (error) {
            console.log("Upload artifact error", error);
            return {status: false, message: "Failed uploading artifact. Please try again!"};
        }
    }

    return {
        register,
        handleSubmit,
        errors,
        watch,
        setValue,
        upload
    }

}

export type ArtifactFormType = {
    name: string,
    description: string,
    avatar: File,
}