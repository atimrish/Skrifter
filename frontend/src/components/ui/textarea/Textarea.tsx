const Textarea = (props: TextareaProps) => {
    return (
        <>
            <textarea
                onInput={props.onChange}
                className={props.className}
                value={props.value}
                placeholder={props.placeholder}
            >{props.value}</textarea>
        </>
    )
}

export default Textarea