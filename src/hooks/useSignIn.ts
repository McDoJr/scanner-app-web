import {RegisterOptions, useForm} from "react-hook-form";
import {supabase} from "../../supabase/supabase.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export type SignInType = {
    email: string,
    password: string
}

export type ResponseType = {
    status: boolean,
    message: string
}

export const useSignIn = () => {

    const navigate = useNavigate();
    const { handleSubmit, register, formState: {errors}, reset, watch } = useForm<SignInType>();
    const [loading, setLoading] = useState(false);

    const signInWithEmail = async (formData: SignInType): Promise<ResponseType> => {
        try {
            const {error} = await supabase.auth.signInWithPassword(formData);

            if(error) {
                console.log("Sign In Unexpected Error", error);
                return {status: false, message: "Invalid Email or Password!"}
            }

            return {status: true, message: "Sign In Successful!"}
        }catch (error) {
            console.log("Sign In Unexpected Error", error);
            return {status: false, message: ""}
        }
    }

    const onSubmit = (formData: SignInType) => {
        setLoading(true);
        signInWithEmail(formData).then(result => {
            setLoading(false);
            if(result.status) {
                navigate("/admin/items");
            }
        }).catch(() => setLoading(false));
    }

    const rules: {email: RegisterOptions<SignInType>, password: RegisterOptions<SignInType>} = {
        email: {
            required: "Email is required *",
            pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format"
            }
        },
        password: {
            required: "Password is required *",
            minLength: {
                value: 6,
                message: "Minimum of 6 characters"
            }
        }
    }

    return {
        rules,
        handleSubmit,
        register,
        errors,
        reset,
        onSubmit,
        watch,
        loading
    }
}