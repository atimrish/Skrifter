import {Children} from "react";

const Option = (props: OptionProps) => {
    return (
        <>
            <div
                className={" font-mono text-gray text-[16px] leading-[46px] pl-[10px] hover:bg-light-gray rounded-[10px] " + props.className }
                onClick={props.onClick}
            >
                {Children.map(props.children, child => child)}
            </div>
        </>
    )
}

export default Option