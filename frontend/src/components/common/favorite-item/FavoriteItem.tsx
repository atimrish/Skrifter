import Image from "@components/ui/image/Image.tsx";

const FavoriteItem = (props: FavoriteItemProps) => {
    return (
        <>
            <div className="flex font-mono">
                <div
                    className="w-[68px] h-[92px] bg-light-gray rounded-[5px] overflow-hidden mr-[10px]"
                >
                    <Image src={props.photo}/>
                </div>
                <div>
                    <div className="text-[16px]">{props.title}</div>
                    <div className="text-[14px] text-gray">{props.authors.join(', ')}</div>
                </div>
            </div>
        </>
    )
}

export default FavoriteItem;