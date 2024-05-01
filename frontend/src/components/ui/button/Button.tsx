export default function Button(props: ButtonProps) {
    return (
        <>
            <button
                type={props.type}
                className={props.className}
                onClick={props.onClick}
            >
                {props.children}
            </button>
        </>
    )
}