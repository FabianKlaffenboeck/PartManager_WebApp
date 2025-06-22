import {LoginForm} from "@/components/login-form.tsx";
import {loginReq, signupReq} from "@/api/API.ts";
import {toast} from "sonner";
import {useState} from "react";
import {RegisterForm} from "@/components/register-form.tsx";

export default function Login({onLoginSuccess}: {
    onLoginSuccess: (token: string) => void;
}) {

    const [showLogin, setShowLogin] = useState(true);


    function loginHandler(username: string, password: string) {
        loginReq(username, password).then((res) => {
            onLoginSuccess(res);
        }).catch(() => {
            toast("Wrong Username or Password!");
        })
    }

    function registerHandler(username: string, password: string) {
        signupReq(username, password).then(() => {
            setShowLogin(true);
            toast("User registered successfully.");
        }).catch(() => {
            toast("User already exists!");
        })
    }

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                {
                    showLogin ? <LoginForm loginHandler={loginHandler} switchToRegister={() => setShowLogin(false)}/> :
                        <RegisterForm registerHandler={registerHandler} switchToLogin={() => setShowLogin(true)}/>
                }
            </div>
        </div>
    )
}