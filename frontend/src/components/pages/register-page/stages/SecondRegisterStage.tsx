import ActiveTextInput from "@components/ui/text-input/ActiveTextInput.tsx";
import ActiveCheckbox from "@components/ui/checkbox/ActiveCheckbox.tsx";
import ActiveLink from "@components/ui/link/ActiveLink.tsx";
import FormButton from "@components/ui/button/FormButton.tsx";

const SecondRegisterStage = (props : RegisterStageProps) => {
    return (
        <>
            <ActiveTextInput
                placeholder={'Пароль'}
                type={'password'}
                onChange={(e) => props.setFormField('password', e.target.value)}
                value={props.formState.password}
            />

            <ActiveTextInput
                placeholder={'Подтвердите пароль'}
                type={'password'}
                onChange={(e) => props.setFormField('password_confirmation', e.target.value)}
                value={props.formState.password_confirmation}
            />

            <div className="flex items-center max-w-[328px]">
                <ActiveCheckbox
                    id={'checked'}
                    onChange={(e) => props.setFormField('checked', e.target.checked)}
                    checked={props.formState.checked}
                />

                <div className="ml-3 font-mono">Я прочитал(а) и соглашаюсь с&nbsp;
                    <ActiveLink
                        onClick={e => {
                            e.preventDefault()
                        }}
                    >правилами сайта</ActiveLink>
                </div>
            </div>

            <FormButton
                type={"submit"}
                className="mt-10 bg-gray"
            >{'Зарегистрироваться'}</FormButton>

            <div className="mt-[20px] cursor-pointer">
                <ActiveLink
                    className="font-bold font-mono"
                    onClick={e => {
                        e.preventDefault()
                        props.setStage(1)
                    }}
                >{'<< к прошлому шагу'}</ActiveLink>
            </div>
        </>
    )
}

export default SecondRegisterStage;