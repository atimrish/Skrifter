import ActiveTextInput from "@components/ui/text-input/ActiveTextInput.tsx";
import ActiveNumberInput from "@components/ui/number-Input/ActiveNumberInput.tsx";
import FormButton from "@components/ui/button/FormButton.tsx";
import makeRequest from "@components/ui/form/libs/MakeRequest.ts";
import {useState} from "react";

const FirstRegisterStage = (props : RegisterStageProps) => {

    const [errored, setErrored] = useState({
        login: false,
        nickname: false,
        email: false,
    })

    const firstStageHandler = async () => {
        const loginCheck = new Promise<any>((resolve) => {
            resolve(makeRequest({
                method: "POST",
                action: "/users/check-exists",
                body: JSON.stringify({
                    field: 'login',
                    value: props.formState.login,
                }),
                headers: {
                    contentType: "application/json"
                }
            }))
        })

        const nicknameCheck = new Promise<any>((resolve) => {
            resolve(makeRequest({
                method: "POST",
                action: "/users/check-exists",
                body: JSON.stringify({
                    field: 'nickname',
                    value: props.formState.nickname,
                }),
                headers: {
                    contentType: "application/json"
                }
            }))
        })

        const emailCheck = new Promise<any>((resolve) => {
            resolve(makeRequest({
                method: "POST",
                action: "/users/check-exists",
                body: JSON.stringify({
                    field: 'email',
                    value: props.formState.email,
                }),
                headers: {
                    contentType: "application/json"
                }
            }))
        })

        const checkResult = await Promise.all([
            loginCheck,
            nicknameCheck,
            emailCheck,
        ])

        const errors = {
            login: false,
            nickname: false,
            email: false,
        }

        let hasError = false

        Object.keys(errors).forEach((key, index) => {
            errors[key] = checkResult[index].status === 422

            if (errors[key]) {
                hasError = true
            }
        })

        if (hasError) {
            setErrored(errors)
        } else {
            props.setStage(2)
        }

    }


    return (
        <>
            <ActiveTextInput
                placeholder={'Логин'}
                onChange={(e) => props.setFormField('login', e.target.value)}
                value={props.formState.login}
                errored={errored.login}
            />

            <ActiveTextInput
                placeholder={'Никнейм'}
                onChange={(e) => props.setFormField('nickname', e.target.value)}
                value={props.formState.nickname}
                errored={errored.nickname}
            />

            <ActiveTextInput
                placeholder={'Email'}
                onChange={(e) => props.setFormField('email', e.target.value)}
                value={props.formState.email}
                errored={errored.email}
            />

            <ActiveNumberInput
                placeholder={'Год рождения'}
                onChange={(e) => props.setFormField('year_of_birth', e.target.value)}
                value={props.formState.year_of_birth}
            />

            <FormButton
                type={"button"}
                className="mt-10 bg-gray"
                onClick={firstStageHandler}
            >{'Далее >>'}</FormButton>
        </>
    )
}

export default FirstRegisterStage;