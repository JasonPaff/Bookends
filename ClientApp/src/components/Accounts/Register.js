import {useState} from "react";
import { Redirect } from "react-router-dom";
import login from "../../Services/loginService";
import {validateRegisterInfo} from "../../Services/registerService";
import {register} from "../../Services/registerService";

export default function Register(props) {
    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [confirmPasswordText, setConfirmPasswordText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [redirect, setRedirect] = useState(false);

    async function submit() {
        const accountInfo = {
            email: emailText,
            password: passwordText,
            confirmPassword: confirmPasswordText
        };

        const reply = validateRegisterInfo(accountInfo);

        if (reply.length <= 0) {
            const reply = await register(accountInfo);

            if (reply.length <= 0) {
                const reply = await login(accountInfo.email, accountInfo.password);

                if (reply.length > 0) {
                    setErrorMessage(reply);
                } else {
                    setErrorMessage("");
                    setRedirect(true);
                }
            }
        } else {
            setErrorMessage(reply)
        }
    }

    function handleChange(e) {
        if (e.target.name === 'email') {
            setEmailText(e.target.value);
        } else if (e.target.name === 'password') {
            setPasswordText(e.target.value);
        } else if (e.target.name === 'confirmPassword') {
            setConfirmPasswordText(e.target.value);
        }
    }

    if (redirect) {
        return <Redirect to="/" />
    }

    return (
        <>
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        autoComplete="current-password"
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="mb-4 text-center text-2xl text-gray-900">{errorMessage}</div>

                            <div>
                                <button
                                    type="submit"
                                    onClick={submit}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}