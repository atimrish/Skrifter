import Comment from "@components/ui/comment/Comment.tsx";
import ActiveLink from "@components/ui/link/ActiveLink.tsx";

const CommentList = (props: any) => {
    const text = "Идейные соображения высшего порядка, а также сплочённость команды профессионалов способствует подготовке и реализации анализа существующих паттернов поведения. Как уже неоднократно упомянуто, некоторые особенности внутренней политики могут быть указаны как претенденты на роль ключевых факторов.";

    return (
        <>
            <div>
                <Comment
                    text={text}
                    dateCreate={'20.11.2023'}
                    userName={'nickname'}
                    userPhoto={''}
                />
            </div>

            <div className="text-center font-mono mt-[40px] mb-[60px] text-[16px]">
                <ActiveLink>{'к комментариям >>'}</ActiveLink>
            </div>

        </>
    )
}

export default CommentList;