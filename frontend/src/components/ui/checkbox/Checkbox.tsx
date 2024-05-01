const Checkbox = (props: CheckboxProps) => {
    return (
        <>
            <input
                type="checkbox"
                checked={props.checked}
                className={props.className}
                onChange={props.onChange}
                id={props.id}
            />
        </>
    )
}

export default Checkbox;