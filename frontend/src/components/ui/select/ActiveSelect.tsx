import Dropdown from "@components/icons/dropdown/Dropdown.tsx";
import Option from "@components/ui/option/Option.tsx";
import React, {Children, useState} from "react";
const ActiveSelect = (props: ActiveSelectProps) => {

    ///TODO: зарезервированный блок под selected

    const [isOpen, setIsOpen] = useState(false);

    const [selected, setSelected] = useState({
        value: 0,
        text: 'Выберите ...'
    })

    return (
        <>
            <div
                className="relative bg-white"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="w-[328px] h-[46px] border border-gray rounded-[10px] bg-transparent appearance-none">
                    <div>
                        <Option value={selected.value}>{selected.text}</Option>
                    </div>
                    <div
                        className="overflow-hidden border border-gray bg-white rounded-[10px] absolute top-[50px] w-[100%] max-h-[138px] overflow-y-scroll z-20 "
                        style={{
                            display: isOpen ? "block" : "none",
                        }}
                    >
                        {Children.map(props.children, (child) => {

                            if (React.isValidElement(child)) {
                                return React.cloneElement(child, {
                                    onClick: () => {
                                        setSelected({
                                            value: child.props.value,
                                            text: child.props.children
                                        })
                                    }
                                })
                            }

                            return child
                        }

                        )}
                    </div>
                </div>

                <div className="absolute top-[18px] right-[8px] w-[35px] h-[18px]">
                    <Dropdown/>
                </div>

            </div>
        </>
    )
}

export default ActiveSelect;