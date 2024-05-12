import Discussion from "@components/ui/discussion/Discussion.tsx";
import ActiveLink from "@components/ui/link/ActiveLink.tsx";
import {Link} from "react-router-dom";
import useDiscussionsByProductId from "../../../hooks/useDiscussionsByProductId.ts";

const DiscussionList = (props: DiscussionListProps) => {

    const [discussions] = useDiscussionsByProductId(props.productId)

    console.log(discussions)

    return (
        <>
            <div>
                <Discussion
                    title={'Какое-то длинное название обсуждения'}
                    repliesCount={12}
                    userName={'texte'}
                    userPhoto={''}
                    timeAgo={'5 дней назад'}
                />
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