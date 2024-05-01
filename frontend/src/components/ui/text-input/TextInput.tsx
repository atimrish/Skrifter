export default function TextInput(props: TextInputProps) {
    return (
        <>
            <input
                type={props.type ?? 'text'}
                value={props.value}
                onChange={props.onChange}
                className={props.className}
                onFocus={props.onFocus}
                onBlur={props.onFocusout}
            />
        </>
    );
}