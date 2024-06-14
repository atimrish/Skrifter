import Reply from "@components/icons/reply/Reply.tsx";
import Image from "@components/ui/image/Image.tsx";
import ActiveLink from "@components/ui/link/ActiveLink.tsx";
import useIsAdmin from "../../../hooks/useIsAdmin.ts";
import MakeAuthRequest from "@components/ui/form/libs/MakeAuthRequest.ts";

const Discussion = (props: DiscussionProps) => {

    const [isAdmin] = useIsAdmin()

    const deleteDiscussion = async () => {
        await MakeAuthRequest({
            action: `/discussion/${props.id}`,
            method: 'DELETE'
        })
    }

    return (
        <>
            <div>

                <div className="flex items-start">
                    <div className="w-[32px] h-[32px] rounded-[5px] bg-gray overflow-hidden">
                        <Image src={props.userPhoto}/>
                    </div>
                    <div className="ml-[15px] text-[14px] font-mono leading-[14px]">{props.userName}</div>
                    <div className="ml-[15px] text-[14px] font-mono leading-[14px]">{props.timeAgo}</div>
                </div>

                <div className="flex items-start mb-[15px] justify-between">
                    <div className="text-[16px] font-mono font-bold ">{props.title}</div>
                    <div className="flex items-center">
                        <div className="w-[16px] h-[16px]">
                            <Reply/>
                        </div>
                        <div className="ml-[5px]">{props.repliesCount}</div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <ActiveLink className={"font-mono"}>{'перейти >>'}</ActiveLink>
                    {isAdmin && <div
                        className="ml-[20px] text-red font-mono"
                        onClick={deleteDiscussion}
                    >удалить</div>}
                </div>

            </div>
        </>
    )
}

export default Discussion