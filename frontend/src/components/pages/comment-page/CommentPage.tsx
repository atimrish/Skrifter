import ExtendLayout from "@components/layouts/extend-layout/ExtendLayout.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import ActiveModal from "@components/ui/modal/ActiveModal.tsx";
import Heading from "@components/ui/heading/Heading.tsx";
import Form from "@components/ui/form/Form.tsx";
import ActiveTextarea from "@components/ui/textarea/ActiveTextarea.tsx";
import FormButton from "@components/ui/button/FormButton.tsx";
import MakeAuthRequest from "@components/ui/form/libs/MakeAuthRequest.ts";
import useCommentsByProductId from "../../../hooks/useCommentsByProductId.ts";
import Comment from "@components/ui/comment/Comment.tsx";
import SuccessNotify from "@components/ui/notify/SuccessNotify.tsx";
import useUserInfo from "../../../hooks/useUserInfo.ts";
import UnauthorizedModal from "@pages/product-page/helper/UnauthorizedModal.tsx";

const CommentPage = () => {

    const [userInfo] = useUserInfo()

    const {id} = useParams();

    const navigate = useNavigate();
    const [modal, setModal] = useState(false)
    const [text, setText] = useState("")
    const [comments] = useCommentsByProductId(+id)
    const [notify, setNotify] = useState<boolean>(false)

    const onCommentAdd = async () => {
        const res = await MakeAuthRequest({
            method: "POST",
            action: `/product/${id}/comment`,
            body: JSON.stringify({
                text: text,
            }),
            headers: {
                contentType: "application/json"
            }
        })

        if (res.status === "true") {
            setModal(false)
            setNotify(true)

            setTimeout(() => {
                setModal(false)
            }, 3000)
        }
    }

    return (
        <>
            <ExtendLayout
                title={'Комментарии'}
                backAction={() => navigate(`/product/${id}`)}
                extraAction={() => {
                    setModal(true)
                }}
            >
                <Wrapper>
                    <ActiveModal
                        isOpen={modal}
                        setIsOpen={setModal}
                    >
                        {
                            userInfo.nickname ? (
                                <div>
                                    <Heading
                                        number={2}
                                        className={' text-[20px] font-mono my-[20px] text-center '}
                                        text={'Добавить комментарий'}
                                    />
                                    <Form
                                        onSubmit={onCommentAdd}
                                        action={`/product/${id}/comment`}
                                        method={'POST'}
                                    >
                                        <div className="mx-auto">
                                            <ActiveTextarea
                                                onChange={(e) => {
                                                    setText(e.target.value);
                                                }}
                                                className="w-[100%] mx-auto"
                                                value={text}
                                                placeholder={'Введите что-нибудь...'}
                                            />
                                        </div>
                                        <FormButton>
                                            <span className="text-[20px]">Добавить</span>
                                        </FormButton>
                                    </Form>
                                </div>
                            ) :
                            (
                                <UnauthorizedModal/>
                            )
                        }

                    </ActiveModal>

                    <div className="font-mono text-[14px]">
                        Сортировать по:&nbsp;
                        <span className="text-blue">дате написания</span>
                    </div>

                    <div>
                        {comments.map(i =>
                            <div
                                className="my-[40px]"
                            >
                                <Comment
                                    userPhoto={'/storage/' + i.user.photo}
                                    userName={i.user.nickname}
                                    dateCreate={(new Date(Date.parse(i.CreatedAt))).toLocaleDateString()}
                                    text={i.text}
                                    id={i.ID}
                                />
                            </div>
                            )
                        }
                    </div>
                    {notify && (<SuccessNotify title={'Успешно'} description={'Комментарий добавлен'}/>)}
                </Wrapper>
            </ExtendLayout>
        </>
    )
}

export default CommentPage