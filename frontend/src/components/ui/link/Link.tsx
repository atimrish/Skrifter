import {Children} from "react";

const Link = (props: LinkProps) => {
    return (
        <>
            <a href={props.href}
               onClick={props.onClick}
               className={props.className}
            >
                {Children.map(props.children, child => child)}
            </a>
        </>
    )
}

export default Link