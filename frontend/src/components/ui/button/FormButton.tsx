import Button from "@components/ui/button/Button.tsx";

export default function FormButton(props: FormButtonProps) {
    return (
        <>
            <div className="mx-auto">
                <Button
                    className={"text-center w-[100%] font-mono text-[20px] font-bold py-[15px] rounded-[10px] " + props.className}
                    type={props.type}
                    onClick={props.onClick}
                >{props.children}</Button>
            </div>
        </>
    )
}