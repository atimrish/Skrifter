import ActiveTextInput from "@components/ui/text-input/ActiveTextInput.tsx";
import ActiveCheckbox from "@components/ui/checkbox/ActiveCheckbox.tsx";
import ActiveLink from "@components/ui/link/ActiveLink.tsx";
import FormButton from "@components/ui/button/FormButton.tsx";
import {useState} from "react";
import ActiveModal from "@components/ui/modal/ActiveModal.tsx";
import Heading from "@components/ui/heading/Heading.tsx";

const SecondRegisterStage = (props : RegisterStageProps) => {

    const [policy, setPolicy] = useState(false)

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
                            setPolicy(true)
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

            <ActiveModal setIsOpen={setPolicy} isOpen={policy}>
                <div className="h-[70vw] overflow-y-scroll">
                    <Heading
                        number={3}
                        className={' font-mono text-center my-[20px] font-bold '}
                        text={'Политика конфиденциальности'}
                    />

                    <Heading
                        number={4}
                        className={' font-mono my-[16px] '}
                        text={'1. Обрабатываемые данные'}
                    />

                    <div className="font-mono text-black">
                        <p className="my-[10px]">
                            1.1. Мы не осуществляем сбор ваших персональных данных с использованием Сайта.
                        </p>

                        <p className="my-[10px]">
                            1.2. Все данные, собираемые на Сайте, предоставляются и принимаются в обезличенной форме (далее
                            – «Обезличенные данные»).
                        </p>

                        <p className="my-[10px]">
                            1.3. Обезличенные данные включают следующие сведения, которые не позволяют вас идентифицировать:
                        </p>

                        <p className="my-[10px]">
                            1.3.1. Информацию, которую вы предоставляете о себе самостоятельно с использованием онлайн-форм
                            и программных модулей Сайта, включая имя и номер телефона и/или адрес электронной почты.
                        </p>

                        <p className="my-[10px]">
                            1.3.2. Данные, которые передаются в обезличенном виде в автоматическом режиме в зависимости от
                            настроек используемого вами программного обеспечения.
                        </p>

                        <p className="my-[10px]">
                            1.4. Администрация вправе устанавливать требования к составу Обезличенных данных Пользователя,
                            которые собираются использованием Сайта.
                        </p>

                        <p className="my-[10px]">
                            1.5. Если определенная информация не помечена как обязательная, ее предоставление или раскрытие
                            осуществляется Пользователем на свое усмотрение. Одновременно вы даете информированное согласие
                            на доступ неограниченного круга лиц к таким данным. Указанные данные становится общедоступными с
                            момента предоставления и/или раскрытия в иной форме.
                        </p>

                        <p className="my-[10px]">
                            1.6. Администрация не осуществляет проверку достоверности предоставляемых данных и наличия у
                            Пользователя необходимого согласия на их обработку в соответствии с настоящей Политикой,
                            полагая, что Пользователь действует добросовестно, осмотрительно и прилагает все необходимые
                            усилия к поддержанию такой информации в актуальном состоянии и получению всех необходимых
                            согласий на ее использование.
                        </p>

                        <p className="my-[10px]">
                            1.7. Вы осознаете и принимаете возможность использования на Сайте программного обеспечения
                            третьих лиц, в результате чего такие лица могут получать и передавать указанные в п.1.3 данные в
                            обезличенном виде.
                        </p>

                    </div>

                </div>
            </ActiveModal>

        </>
    )
}

export default SecondRegisterStage;