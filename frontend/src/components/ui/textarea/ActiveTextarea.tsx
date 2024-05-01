import Textarea from "@components/ui/textarea/Textarea.tsx";

const ActiveTextarea = (props: ActiveTextareaProps) => {
    return (
        <>
            <Textarea
                className={"w-[328px] xl:w-[464px] border border-gray rounded-[10px] font-mono outline-none p-[10px]"}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
            />
        </>
    )
}

export default ActiveTextarea;