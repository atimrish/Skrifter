import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import Heading from "@components/ui/heading/Heading.tsx";
import Form from "@components/ui/form/Form.tsx";
import {useState} from "react";
import MakeRequest from "@components/ui/form/libs/MakeRequest.ts";
import FirstRegisterStage from "@pages/register-page/stages/FirstRegisterStage.tsx";
import SecondRegisterStage from "@pages/register-page/stages/SecondRegisterStage.tsx";
import ActiveLink from "@components/ui/link/ActiveLink.tsx";
import {Link, useNavigate} from "react-router-dom";
import AuthLayout from "@components/layouts/auth-layout/AuthLayout.tsx";
import Image from "@components/ui/image/Image.tsx";

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

    const navigate = useNavigate();

    const onSubmit = async () => {
        const res = await MakeRequest({
            action: '/register',
            method: "POST",
            body: JSON.stringify({
                ...formState,
                year_of_birth: +formState.year_of_birth,
            }),
            headers: {
                contentType: "application/json"
            }
        })

        const json = await res.json()

        if (res.status === 200) {
            localStorage.setItem("refresh_token", json.refresh_token)
            navigate('/profile/my')
        }

    }

    return (
        <>
            <AuthLayout>
                <Wrapper>

                    <div className="
                    flex
                    xl:w-[1130px]
                    justify-between
                    mx-auto
                    rounded-[10px]
                    overflow-hidden
                    items-center
                    xl:shadow-2xl
                    xl:mt-[30px]
                    ">
                        <div className="xl:block hidden h-[900px] bg-gray w-[674px]">
                            <Image src={'./src/assets/images/register-back.svg'} />
                        </div>
                        <div className="xl:px-[60px]">
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
                                <div className="w-[328px]">
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
                                </div>
                            </Form>
                        </div>
                    </div>
                </Wrapper>
            </AuthLayout>
        </>
    )

}