import MainLayout from "@components/layouts/MainLayout.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import Heading from "@components/ui/heading/Heading.tsx";
import Form from "@components/ui/form/Form.tsx";
import {useState} from "react";
import MakeRequest from "@components/ui/form/libs/MakeRequest.ts";
import FirstRegisterStage from "@pages/register-page/stages/FirstRegisterStage.tsx";
import SecondRegisterStage from "@pages/register-page/stages/SecondRegisterStage.tsx";
import ActiveLink from "@components/ui/link/ActiveLink.tsx";
import {Link} from "react-router-dom";

export default function RegisterPage() {

    const [stage, setStage] = useState(1)

    const [formState, setFormState] = useState({
        login: '',
        nickname: '',
        email: '',
        year_of_birth: '',
        password: '',
        password_confirmation: '',
        checked: false
    })

    const setFormField = (field: string, value: any) => {
        setFormState({
            ...formState,
            [field]: value
        })
    }


    const onSubmit = async () => {
        const res = await MakeRequest({
            action: '/register',
            method: "POST",
            body: JSON.stringify(formState),
            headers: {
                contentType: "application/json"
            }
        })

        const json = await res.json()

        localStorage.setItem("refresh_token", json.refresh_token)
    }

    return (
        <>
            <MainLayout>
                <Wrapper>
                    <Heading
                        text="Регистрация"
                        number={1}
                        className="text-[32px] font-[FiraMono] text-center my-[50px]"
                    />
                    <Form
                        onSubmit={onSubmit}
                        action={'/register'}
                        method={"POST"}
                    >
                        <div className="transition-all ease-in-out duration-1000">
                            {
                                stage === 1 ?
                                    <FirstRegisterStage
                                        formState={formState}
                                        setStage={setStage}
                                        setFormField={setFormField}
                                        stage={stage}
                                    />
                                    :
                                    <SecondRegisterStage
                                        formState={formState}
                                        setStage={setStage}
                                        setFormField={setFormField}
                                        stage={stage}
                                    />
                            }
                        </div>

                        <div
                            className="font-mono text-center my-[20px]"
                        >Есть аккаунт? <ActiveLink>
                            <Link to={'/login'}>
                                Авторизируйтесь
                            </Link>
                        </ActiveLink>
                        </div>

                    </Form>
                </Wrapper>
            </MainLayout>
        </>
    )

}