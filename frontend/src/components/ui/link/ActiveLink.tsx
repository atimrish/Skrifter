import Link from "@components/ui/link/Link.tsx";
import {Children} from "react";

const ActiveLink = (props: ActiveLinkProps) => {
    return (
        <>
            <Link
                className={"text-blue " + props.className}
                onClick={props.onClick}
                href={props.href}
            >
                {Children.map(props.children, child => child)}
            </Link>
        </>
    )
}

export default ActiveLink;