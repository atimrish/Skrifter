import {Children} from "react";

const Select = (props: SelectProps) => {
    return (
        <>
            <select
                onChange={props.onChange}
                value={props.value}
                className={props.className}
            >
                {Children.map(props.children, (child) => child)}
            </select>
        </>
    )
}

export default Select;