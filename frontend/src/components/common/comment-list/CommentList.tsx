import Comment from "@components/ui/comment/Comment.tsx";
import ActiveLink from "@components/ui/link/ActiveLink.tsx";
import {Link} from "react-router-dom";
import useCommentsByproductId from "../../../hooks/useCommentsByProductId.ts";


const CommentList = (props: CommentListProps) => {
    const [comments] = useCommentsByproductId(props.productId)
    const sliced = comments.slice(0, props.maxCount);

    return (
        <>
            <div>
                {sliced.map(i =>
                    <div
                        className="my-[40px]"
                    >
                        <Comment
                            userPhoto={'/storage/' + i.user.photo}
                            userName={i.user.nickname}
                            dateCreate={(new Date(Date.parse(i.CreatedAt))).toLocaleDateString()}
                            text={i.text}
                        />
                    </div>
                )
                }
            </div>

            <div className="text-center font-mono mt-[40px] mb-[60px] text-[16px]">
                <ActiveLink>
                    <Link
                        to={`/product/${props.productId}/comments`}
                    >
                        {'к комментариям >>'}
                    </Link>
                </ActiveLink>
            </div>

        </>
    )
}

export default CommentList;