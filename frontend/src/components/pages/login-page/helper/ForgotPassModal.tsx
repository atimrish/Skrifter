import ActiveModal from "@components/ui/modal/ActiveModal.tsx";
import ActiveTextInput from "@components/ui/text-input/ActiveTextInput.tsx";
import {useState} from "react";
import Heading from "@components/ui/heading/Heading.tsx";
import Form from "@components/ui/form/Form.tsx";

const ForgotPassModal = (props: ModalProps) => {

    const [formState, setFormState] = useState({
        email: ''
    })

    const onSubmit = async () => {

    }

    return (
        <>
            <ActiveModal
                setIsOpen={props.setIsOpen}
                isOpen={props.isOpen}
            >
                <Form
                    onSubmit={onSubmit}
                    action={'/user/forgot-pass'}
                    method={'POST'}
                >
                    <Heading
                        number={4}
                        text={'Введите почту, привязанную к аккаунту'}
                        className={'text-[20px] font-mono my-[20px] text-center'}
                    />
                    <ActiveTextInput
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder={'email'}
                    />
                </Form>
            </ActiveModal>
        </>
    )
}

export default ForgotPassModal;