import {createElement} from "react";

export default function Heading(props : HeadingProps) {
    return createElement(`h${props.number}`, {className: props.className}, props.text)
}