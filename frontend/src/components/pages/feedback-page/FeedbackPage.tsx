import MainLayout from "@components/layouts/MainLayout.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import Heading from "@components/ui/heading/Heading.tsx";
import ActiveTextarea from "@components/ui/textarea/ActiveTextarea.tsx";
import {useState} from "react";
import Form from "@components/ui/form/Form.tsx";
import FormButton from "@components/ui/button/FormButton.tsx";
import SuccessNotify from "@components/ui/notify/SuccessNotify.tsx";

const FeedbackPage = () => {

    const [text, setText] = useState("");
    const [notify, setNotify] = useState(false);

    return (
        <>
            <MainLayout>
                <Wrapper>
                    <Heading
                        number={2}
                        className={"text-[24px] font-mono my-[40px] text-center "}
                        text={'Опишите проблему'}
                    />
                    <Form
                        action={'/feedback'}
                        method={'POST'}
                        onSubmit={async () => {
                            setNotify(true)

                            setTimeout(() => {
                                setNotify(false)
                            }, 3000)
                        }}
                    >
                        <ActiveTextarea
                            value={text}
                            onChange={e => setText(e.target.value)}
                            placeholder={'Введите что-нибудь'}
                            className={" min-h-[200px] "}
                        />
                        <FormButton
                            className={"bg-light-gray my-[30px]"}
                        >Отправить</FormButton>
                    </Form>
                    {notify && (<SuccessNotify title={'Успешно'} description={'Обращение отправлено'}/>)}
                </Wrapper>
            </MainLayout>
        </>
    )
}

export default FeedbackPage;