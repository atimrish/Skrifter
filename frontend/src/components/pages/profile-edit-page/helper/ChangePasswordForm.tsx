import ActiveTextInput from "@components/ui/text-input/ActiveTextInput.tsx";
import FormButton from "@components/ui/button/FormButton.tsx";
import Form from "@components/ui/form/Form.tsx";
import {useState} from "react";
import ErrorNotify from "@components/ui/notify/ErrorNotify.tsx";
import MakeAuthRequest from "@components/ui/form/libs/MakeAuthRequest.ts";
import SuccessNotify from "@components/ui/notify/SuccessNotify.tsx";

const ChangePasswordForm = () => {

    const [formState, setFormState] = useState({
        old: '',
        new: '',
        confirm: ''
    })

    const [errors, setErrors] = useState({
        old: false,
        new: false,
        confirm: false
    })

    const [errorNotify, setErrorNotify] = useState<
        {
            title: string,
            description: string,
        }
    |null>(null)


    const [success, setSuccess] = useState<
        {
            title: string,
            description: string,
        }
        |null>(null)

    const onSubmit  = async () => {

        if (formState.new !== formState.confirm) {
            setErrors({
                ...errors,
                new: true,
                confirm: true
            })

            setErrorNotify({
                title: 'Ошибка',
                description: 'Новый пароль и подтверждение пароля не совпадают'
            })

            setTimeout(() => {
                setErrorNotify(null)
            }, 5000)
            return
        }

        if (formState.new.length < 8) {
            setErrors({
                ...errors,
                new: true
            })

            setErrorNotify({
                title: 'Ошибка',
                description: 'Минимальная длина пароля: 8 символов'
            })
            setTimeout(() => {
                setErrorNotify(null)
            }, 5000)
            return
        }

        if (formState.old === '') {
            setErrors({
                ...errors,
                old: true
            })
            setErrorNotify({
                title: 'Ошибка',
                description: 'Минимальная длина пароля: 8 символов'
            })
            setTimeout(() => {
                setErrorNotify(null)
            }, 5000)
            return
        }

        setErrors({
            old: false,
            new: false,
            confirm: false
        })

        const res = await MakeAuthRequest({
            method: 'PUT',
            body: JSON.stringify({
                old_password: formState.old,
                new_password: formState.new,
            }),
            headers: {
                contentType: "application/json"
            },
            action: '/user/change-password'
        })

        if (res.message === "старый пароль неверен") {
            setErrors({
                ...errors,
                old: true
            })

            setErrorNotify({
                title: 'Ошибка',
                description: res.message,
            })

        } else {
            setErrors({
                ...errors,
                old: false
            })
            setSuccess({
                title: 'Успешно',
                description: 'Пароль изменен'
            })
        }

    }

    return (
        <>
            <Form
                onSubmit={onSubmit}
                action={'/users/change-password'}
                method={"POST"}
            >
                <ActiveTextInput
                    value={formState.old}
                    placeholder={'Старый пароль'}
                    onChange={(e) => setFormState({
                        ...formState,
                        old: e.target.value
                    })}
                    errored={errors.old}
                />

                <ActiveTextInput
                    value={formState.new}
                    placeholder={'Новый пароль'}
                    onChange={(e) => setFormState({
                        ...formState,
                        new: e.target.value
                    })}
                    errored={errors.new}
                />

                <ActiveTextInput
                    value={formState.confirm}
                    placeholder={'Подтвердите пароль'}
                    onChange={(e) => setFormState({
                        ...formState,
                        confirm: e.target.value
                    })}
                    errored={errors.confirm}
                />

                <FormButton
                    className="h-[48px] bg-light-gray py-[5px] hover:bg-black hover:text-white transition-all duration-300 "
                >Изменить</FormButton>

            </Form>
            {errorNotify && <ErrorNotify title={errorNotify.title} description={errorNotify.description}/>}
            {success && <SuccessNotify title={success.title} description={success.description}/>}
        </>
    )
}

export default ChangePasswordForm;