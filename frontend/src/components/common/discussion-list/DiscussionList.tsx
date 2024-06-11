import Discussion from "@components/ui/discussion/Discussion.tsx";
import ActiveLink from "@components/ui/link/ActiveLink.tsx";
import {Link} from "react-router-dom";
import useDiscussionsByProductId from "../../../hooks/useDiscussionsByProductId.ts";

const DiscussionList = (props: DiscussionListProps) => {

    const [discussions] = useDiscussionsByProductId(props.productId)

    return (
        <>
            <div>
                {discussions.map(i => (
                    <Discussion
                        title={i.text}
                        repliesCount={12}
                        userName={i.user.nickname}
                        userPhoto={'/storage/user/' + i.user.photo}
                        timeAgo={'5 дней назад'}
                    />
                ))}
            </div>

            <div className="text-center font-mono mt-[40px] mb-[60px] text-[16px]">
                <ActiveLink>
                    <Link
                        to={`/product/${props.productId}/discussions`}
                    >
                        {'к обсуждениям >>'}
                    </Link>
                </ActiveLink>
            </div>
        </>
    )
}

export default DiscussionList