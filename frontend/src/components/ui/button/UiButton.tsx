import Button from "@components/ui/button/Button.tsx";

const UiButton = (props: ButtonProps) => {
    return (
        <>
            <Button
                className={" font-mono text-[20px] bg-gray rounded-[10px] text-center" +
                    " w-[100%] py-[10px] " + props.className
            }
                onClick={props.onClick}
                type="button"
            >{props.children}</Button>
        </>
    )
}

export default UiButton;