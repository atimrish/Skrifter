import TextInput from "@components/ui/text-input/TextInput.jsx";

export default function ActiveTextInput(props) {
    return (
        <>
            <div>
                <TextInput
                    value={props.value}
                    onChange={props.onChange}
                />
            </div>
        </>
    )
}