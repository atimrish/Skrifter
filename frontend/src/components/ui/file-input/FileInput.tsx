const FileInput = (props: FileInputProps) => {
    return (
        <>
            <input
                id={props.id}
                type="file"
                onChange={props.onChange}
                value={props.value}
                className={props.className}
                accept={props.accept}
            />
        </>
    )
}

export default FileInput;