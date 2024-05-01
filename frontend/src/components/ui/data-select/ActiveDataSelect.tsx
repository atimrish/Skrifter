import TextInput from "@components/ui/text-input/TextInput.tsx";
import {useState} from "react";
import DataItem from "@components/ui/data-select/DataItem.tsx";

const ActiveDataSelect = (props: ActiveDataSelectProps) => {

    const [isOpen, setIsOpen] = useState(true);

    const [match, setMatch] = useState("")

    const rendered = props.items.filter(item => (new RegExp(match, "i")).test(item.Name))

    return (
        <>
            <div>
                <TextInput
                    className={"w-[328px] h-[52px] font-mono text-[20px] pl-[5px] outline-none rounded-[10px] border border-gray"}
                    onChange={(e) => {
                        setMatch(e.target.value)
                    }}
                    value={match}
                />

                <div
                    className="mb-[10px] max-h-[162px] overflow-y-scroll"
                    style={{
                        display: isOpen ? "block" : "none",
                    }}
                >
                    {rendered.map(item => <DataItem
                        selected={item.selected ?? false }
                        value={item.ID}
                        name={item.Name}
                        key={item.ID}
                        onClick={() => {
                            props.setItems(props.items.map(i => {

                                if (i.ID === item.ID) {
                                    i.selected = !i.selected
                                    console.log(i)
                                }
                                return i
                            }))
                        }}
                    />)}
                </div>

            </div>
        </>
    )
}

export default ActiveDataSelect;