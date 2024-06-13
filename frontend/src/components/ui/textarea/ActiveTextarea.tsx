import Textarea from "@components/ui/textarea/Textarea.tsx";

const ActiveTextarea = (props: ActiveTextareaProps) => {
    return (
        <>
            <Textarea
                className={"w-[100%] border border-gray rounded-[10px] font-mono outline-none p-[10px] " + props.className}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
            />
        </>
    )
}

export default ActiveTextarea;