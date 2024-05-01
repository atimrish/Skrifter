import TextInput from "@components/ui/text-input/TextInput.tsx";
import {useState} from "react";

export default function ActiveTextInput(props: ActiveTextInputProps) {

    const [plStyles, setPlStyles] = useState({});

    const onFocus = () => {
        setPlStyles({
            top: '-20px',
            fontSize: '14px'
        })
    }

    const onFocusout = () => {
        setPlStyles({
            top: '10px',
            fontSize: '20px'
        })
    }

    return (
        <>
            <div
                className={"relative " +
                    "w-[328px] " +
                    "h-[52px] " +
                    "border " +
                    "border-gray " +
                    "rounded-[10px] " +
                    "group my-8 " +
                    " xl:w-[464px] " +
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
                    style={plStyles}
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