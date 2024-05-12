import TextInput from "@components/ui/text-input/TextInput.tsx";
import {useState} from "react";

export default function ActiveTextInput(props: ActiveTextInputProps) {

    const [plStyles, setPlStyles] = useState({});

    const [focused, setFocused] = useState(false);

    const onFocus = () => {
        setFocused(true);
        setPlStyles({
            top: '-20px',
            fontSize: '14px',
        })
    }

    const onFocusout = () => {
        setFocused(false);
        setPlStyles({
            top: '10px',
            fontSize: '20px'
        })
    }

    return (
        <>
            <div
                className={"relative " +
                    "w-[100%] " +
                    "h-[52px] " +
                    "border " +
                    "border-gray " +
                    "rounded-[10px] " +
                    "group my-8 " +
                    (props.errored ? 'border-red ' : '')}
            >
                <div
                    className="
                        absolute
                        font-[FiraMono]
                        text-[20px]
                        top-[10px]
                        left-[10px]
                        transition-all
                        ease-in-out
                        duration-200
                        text-gray
                        -z-10
                    "
                    style={{
                        ...plStyles,
                        display: (!focused && (props.value.length > 0)) ? "none" : "block",
                    }}
                >{props.placeholder}</div>
                <TextInput
                    value={props.value}
                    onChange={props.onChange}
                    className={"w-[100%] " +
                        "h-[100%] " +
                        "px-2 " +
                        "font-[FiraMono] " +
                        "text-[20px] " +
                        "outline-none " +
                        "rounded-[10px] " +
                        "bg-transparent " +
                        props.className}
                    type={props.type}
                    onFocus={onFocus}
                    onFocusout={onFocusout}
                />

            </div>
        </>
    )
}