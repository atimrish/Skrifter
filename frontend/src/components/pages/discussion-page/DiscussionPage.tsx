import ExtendLayout from "@components/layouts/extend-layout/ExtendLayout.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import ActiveModal from "@components/ui/modal/ActiveModal.tsx";
import Heading from "@components/ui/heading/Heading.tsx";
import Form from "@components/ui/form/Form.tsx";
import FormButton from "@components/ui/button/FormButton.tsx";
import {useState} from "react";
import MakeAuthRequest from "@components/ui/form/libs/MakeAuthRequest.ts";
import useDiscussionsByProductId from "../../../hooks/useDiscussionsByProductId.ts";
import Discussion from "@components/ui/discussion/Discussion.tsx";
import ActiveTextInput from "@components/ui/text-input/ActiveTextInput.tsx";

const DiscussionPage = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [modal, setModal] = useState(false);
    const [text, setText] = useState("")
    const [discussion] = useDiscussionsByProductId(+id)

    const onDiscussionAdd = async () => {
        const res = await MakeAuthRequest({
            method: "POST",
            action: `/product/${id}/discussion`,
            body: JSON.stringify({
                text: text,
            }),
            headers: {
                contentType: "application/json"
            }
        })

        if (res.status === "true") {
            setModal(false)
        }
    }

    return (
        <>
            <ExtendLayout
                title={'Обсуждения'}
                backAction={() => navigate(`/product/${id}`)}
                extraAction={() => setModal(true)}
            >
                <Wrapper>
                    <ActiveModal
                        isOpen={modal}
                        setIsOpen={setModal}
                    >
                        <Heading
                            number={2}
                            className={' text-[20px] font-mono my-[20px] text-center '}
                            text={'Создать обсуждение'}
                        />

                        <Form
                            onSubmit={onDiscussionAdd}
                            action={`/product/${id}/discussion`}
                            method={'POST'}
                        >
                            <div>
                                <ActiveTextInput
                                    onChange={(e) => {
                                        setText(e.target.value);
                                    }}
                                    value={text}
                                    placeholder={'Введите что-нибудь...'}
                                />
                            </div>

                            <FormButton>
                                <span className="text-[20px]">Добавить</span>
                            </FormButton>
                        </Form>
                    </ActiveModal>

                    <div className="font-mono text-[14px]">
                        Сортировать по:&nbsp;
                        <span className="text-blue">дате написания</span>
                    </div>

                    <div>
                        {discussion.map(i =>
                            <div
                                className="my-[40px]"
                            >
                                <Discussion
                                    userPhoto={'/storage/' + i.user.photo}
                                    userName={i.user.nickname}
                                    timeAgo={'test'}
                                    title={i.title}
                                    repliesCount={0}
                                />
                            </div>
                        )
                        }
                    </div>

                </Wrapper>
            </ExtendLayout>
        </>
    )
}

export default DiscussionPage;