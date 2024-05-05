import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import MainLayout from "@components/layouts/MainLayout.tsx";
import Heading from "@components/ui/heading/Heading.tsx";
import ImageInput from "@components/ui/image-input/ImageInput.tsx";
import Form from "@components/ui/form/Form.tsx";
import ActiveTextInput from "@components/ui/text-input/ActiveTextInput.tsx";
import ActiveNumberInput from "@components/ui/number-Input/ActiveNumberInput.tsx";
import {useState} from "react";
import FormButton from "@components/ui/button/FormButton.tsx";
import MakeAuthRequest from "@components/ui/form/libs/MakeAuthRequest.ts";

const CreateAuthor = () => {

    const [formState, setFormState] = useState({
        surname: '',
        name: '',
        patronymic: '',
        nickname: '',
        year_of_birth: '',
        photo: null
    })

    const onSubmit = async () => {

        const formData = new FormData()

        for (const key in formState) {
            formData.append(key, formState[key])
        }

        await MakeAuthRequest({
            action: '/author',
            method: "POST",
            body: formData
        })
    }

    return (
        <>
            <MainLayout>
                <Wrapper>
                    <Heading
                        number={2}
                        text={'Добавление автора'}
                        className={'text-[24px] font-mono my-[40px]'}
                    />


                    <Form
                        onSubmit={onSubmit}
                        action={'/'}
                        method={'POST'}
                    >
                        <div className="flex flex-wrap">
                            <ImageInput
                                setValue={(file) => {
                                    setFormState({
                                        ...formState,
                                        photo: file
                                    })
                                }}
                                className={"w-[326px] h-[326px] bg-gray rounded-[10px] border-gray overflow-hidden relative mr-[20px] mb-[20px] shrink-0"}
                            />
                            <div>
                                <div className="mt-[-30px]">
                                    <ActiveTextInput
                                        placeholder={'Фамилия'}
                                        value={formState.surname}
                                        onChange={(e) => setFormState({
                                            ...formState,
                                            surname: e.target.value
                                        })}
                                    />
                                </div>
                                <ActiveTextInput
                                    placeholder={'Имя'}
                                    value={formState.name}
                                    onChange={(e) => setFormState({
                                        ...formState,
                                        name: e.target.value
                                    })}
                                />
                                <ActiveTextInput
                                    placeholder={'Отчество'}
                                    value={formState.patronymic}
                                    onChange={(e) => setFormState({
                                        ...formState,
                                        patronymic: e.target.value
                                    })}
                                />
                                <ActiveTextInput
                                    placeholder={'Псевдоним'}
                                    value={formState.nickname}
                                    onChange={(e) => setFormState({
                                        ...formState,
                                        nickname: e.target.value
                                    })}
                                />
                                <ActiveNumberInput
                                    placeholder={'Год рождения'}
                                    value={formState.year_of_birth}
                                    onChange={(e) => setFormState({
                                        ...formState,
                                        year_of_birth: e.target.value
                                    })}
                                />
                            </div>
                        </div>

                        <FormButton>Добавить</FormButton>

                    </Form>



                </Wrapper>
            </MainLayout>
        </>
    )
}

export default CreateAuthor;