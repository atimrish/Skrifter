import Image from "@components/ui/image/Image.tsx";
import ActiveLink from "@components/ui/link/ActiveLink.tsx";
import useIsAdmin from "../../../hooks/useIsAdmin.ts";

const Comment = (props: CommentProps) => {

    const [isAdmin] = useIsAdmin()

    return (
        <>
            <div className="w-[100%]">
                <div className="flex items-start justify-between">
                    <div className="flex items-start">
                        <div className="w-[48px] h-[48px] rounded-[10px] bg-gray overflow-hidden mr-[15px]">
                            <Image src={props.userPhoto}/>
                        </div>

                        <div className="font-mono font-bold text-[14px] leading-[14px]">{props.userName}</div>

                    </div>

                    <div className="font-mono text-[14px] leading-[14px]">{props.dateCreate}</div>

                </div>
                <div className="font-main text-[14px] my-[20px]">
                    {props.text}
                </div>

                <div className="flex justify-end">
                    <ActiveLink className={"font-mono"}>ответить</ActiveLink>
                    {isAdmin && <div className="ml-[20px] text-red font-mono">удалить</div>}
                </div>

            </div>
        </>
    )
}

export default Comment