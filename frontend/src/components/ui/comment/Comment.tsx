import Image from "@components/ui/image/Image.tsx";
import ActiveLink from "@components/ui/link/ActiveLink.tsx";

const Comment = (props: CommentProps) => {
    return (
        <>
            <div className="w-[328px]">
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
                </div>

            </div>
        </>
    )
}

export default Comment