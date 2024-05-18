import {useState} from "react";

const Tabs = (props: TabsProps) => {

    const [selected, setSelected] = useState<string|null>(props.titles[0]);

    return (
        <>
            <div
                className="flex items-center w-[100%] overflow-x-scroll"
                style={{
                    scrollbarWidth: 'none'
                }}
            >
                {props.titles.map((title, i) => (
                    <div
                        className="font-mono text-[14px] text-nowrap pb-[5px] px-[14px] text-center border-b-[3px] border-transparent "
                        onClick={() => setSelected(title)}
                        style={{
                            borderBottomColor: (selected === title) ? 'black' : 'transparent'
                        }}
                        key={i}
                    >{title}</div>
                ))}
            </div>
        </>
    )
}

export default Tabs;