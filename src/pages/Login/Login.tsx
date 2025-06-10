import {LoginForm} from "@/components/login-form.tsx";
import {loginReq} from "@/api/API.ts";
import {toast} from "sonner";

export default function Login({onLoginSuccess}: {
    onLoginSuccess: (token: string) => void;
}) {


    function logInHandler(username: string, password: string) {
        loginReq(username, password).then((res) => {
            onLoginSuccess(res);
        }).catch(() => {
            toast("Wrong Username or Password!");
        })
    }

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <LoginForm loginHandler={logInHandler}/>
            </div>
        </div>
    )
}