import Discussion from "@components/ui/discussion/Discussion.tsx";
import ActiveLink from "@components/ui/link/ActiveLink.tsx";

const DiscussionList = () => {
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
                <ActiveLink>{'к обсуждениям >>'}</ActiveLink>
            </div>
        </>
    )
}

export default DiscussionList