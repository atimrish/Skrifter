import Checkbox from "@components/ui/checkbox/Checkbox.tsx";
import Success from "@components/icons/success/Success.tsx";

const ActiveCheckbox = (props: ActiveCheckboxProps) => {
    return (
        <>
            <label htmlFor={props.id} className="w-[32px] h-[32px] border rounded-[6px] border-gray block shrink-0">
                    <Checkbox
                        checked={props.checked}
                        onChange={props.onChange}
                        className="peer hidden"
                        id={props.id}
                    />
                    <div
                        className="hidden w-[100%] h-[100%] relative peer-checked:block"
                    >
                        <div className="absolute top-[5px] left-[4px]">
                            <Success/>
                        </div>
                    </div>
            </label>
        </>
    )
}

export default ActiveCheckbox