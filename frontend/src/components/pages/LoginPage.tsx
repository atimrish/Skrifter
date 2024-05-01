import MainLayout from "../layouts/MainLayout.tsx";
import Heading from "@components/ui/heading/Heading.tsx"
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import Form from "@components/ui/form/Form.tsx";
import ActiveTextInput from "@components/ui/text-input/ActiveTextInput.tsx";
import FormButton from "@components/ui/button/FormButton.tsx";
import {useState} from "react";
import MakeRequest from "@components/ui/form/libs/MakeRequest.ts";
import ActiveLink from "@components/ui/link/ActiveLink.tsx";
import {Link, useNavigate} from "react-router-dom";

export default function LoginPage() {

    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        login: '',
        password: ''
    })

    const [errored, setErrored] = useState({
        login: false,
        password: false
    })

    const setLogin = (login: string) => {
        setFormState({
            ...formState,
            login: login
        })
    }

    const setPassword = (password: string) => {
        setFormState({
            ...formState,
            password: password
        })
    }

    const onSubmit = async () => {

        const res = await MakeRequest({
            method: "POST",
            action: "/login",
            body: JSON.stringify(formState),
            headers: {
                contentType: "application/json"
            }
        })

        const json = await res.json()
        if (res.status === 422 && json.message === "error") {
            setErrored({
                login: true,
                password: true
            })

            return
        }



        localStorage.setItem("refresh_token", json.refresh_token)
        navigate("/profile/my")
    }

    return (
        <>
            <MainLayout>
                <Wrapper>
                    <Heading
                        text="Вход"
                        number={1}
                        className="text-[32px] font-[FiraMono] text-center my-[50px]"
                    />
                    <Form
                        onSubmit={onSubmit}
                        action={"/login"}
                        method={"POST"}
                    >
                        <ActiveTextInput
                            placeholder={'Логин'}
                            onChange={e => setLogin(e.target.value)}
                            value={formState.login}
                            errored={errored.login}
                        />
                        <ActiveTextInput
                            placeholder={'Пароль'}
                            type={"password"}
                            onChange={e => setPassword(e.target.value)}
                            value={formState.password}
                            errored={errored.password}
                        />

                        {errored.login && (
                            <div
                                className="text-red font-mono text-center"
                            >Неверный логин или пароль</div>
                        )}


                        <FormButton
                            type="submit"
                            className="mt-10 bg-gray"
                        >Войти</FormButton>

                        <div
                            className="font-mono text-center my-[20px]"
                        >Нет аккаунта? <ActiveLink>
                        <Link to={'/register'}>
                            Создайте его
                        </Link>
                        </ActiveLink>
                        </div>

                    </Form>

                </Wrapper>
            </MainLayout>
        </>
    )
}