import {createElement} from "react";

export default function Heading(props) {
    return createElement(`h${props.number}`, {className: props.className}, props.text)
}