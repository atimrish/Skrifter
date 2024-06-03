import {Children, FormEvent} from "react";

export default function Form(props: FormProps) {

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        await props.onSubmit()
    }

    return (
        <>
            <form
                action={props.action}
                method={props.method}
                onSubmit={onSubmit}
            >
                {Children.map(props.children, child => child)}
            </form>
        </>
    )
}