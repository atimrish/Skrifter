import MainLayout from "@components/layouts/MainLayout.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import AdminLinks from "@pages/admin-page/helper/AdminLinks.tsx";
import Heading from "@components/ui/heading/Heading.tsx";
import Form from "@components/ui/form/Form.tsx";
import ActiveTextInput from "@components/ui/text-input/ActiveTextInput.tsx";
import {useState} from "react";
import FormButton from "@components/ui/button/FormButton.tsx";
import MakeAuthRequest from "@components/ui/form/libs/MakeAuthRequest.ts";

const CreateGenre = () => {

    const [name, setName] = useState("");

    const onSubmit = async () => {
        const res = await MakeAuthRequest({
            action: '/genre',
            method: 'POST',
            body: JSON.stringify({name: name}),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    return (
        <>
            <MainLayout>
                <Wrapper>
                    <AdminLinks/>
                    <Heading
                        number={2}
                        text={'Добавление жанра'}
                        className={'text-[24px] font-mono my-[40px]'}
                    />
                    <Form
                        onSubmit={onSubmit}
                        action={'/genre'}
                        method={'POST'}
                    >
                        <ActiveTextInput
                            placeholder={'Название'}
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                        <FormButton type={"submit"}>Добавить</FormButton>
                    </Form>
                </Wrapper>
            </MainLayout>
        </>
    )
}

export default CreateGenre;