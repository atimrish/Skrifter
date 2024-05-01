import ActiveTextInput from "@components/ui/text-input/ActiveTextInput.tsx";

const ActiveNumberInput = (props: ActiveNumberInputProps) => {
    return (
        <>
            <ActiveTextInput
                type="number"
                value={props.value}
                onChange={props.onChange}
                onFocusout={props.onFocusout}
                onFocus={props.onFocus}
                className={props.className + " appearance-none "}
                placeholder={props.placeholder}
            />
        </>
    )
}

export default ActiveNumberInput;