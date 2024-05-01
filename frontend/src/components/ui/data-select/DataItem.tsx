import Plus from "@components/icons/plus/Plus.tsx";
import Minus from "@components/icons/minus/Minus.tsx";

const DataItem = (props: DataItemProps) => {

    return (
        <>
            <div
                className="px-[5px] flex items-center justify-between py-[15px]"
                onClick={props.onClick}
            >
                <div className="font-mono">{props.name}</div>
                <div className="w-[24px] h-[24xp] cursor-pointer">
                    {props.selected ? <Minus/> : <Plus/>}
                </div>
            </div>
        </>
    )
}

export default DataItem