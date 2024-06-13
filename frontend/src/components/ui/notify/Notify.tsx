import CloseNotify from "@components/icons/close-notify/CloseNotify.tsx";
import {CSSProperties, useState} from "react";

const Notify = (props: NotifyProps) => {

    const [styles, setStyles] = useState<CSSProperties>({
        bottom: '-100px'
    })

    const [visible, setVisible] = useState<boolean>(true)

    const push = () => {
        setStyles({
            ...styles,
            bottom: "20px",
        })
        if (props.temporary) {
            setTimeout(() => {
                setVisible(false)
            }, 3000)
        }
    }

    setTimeout(push, 1000)

    return (
        <>
            {visible && (
                <div
                    className="w-[328px] h-[64px] bg-[#F5F5F5] p-[5px] transition-all ease-in duration-[900] flex justify-between rounded-[10px] fixed right-[20px] items-start"
                    style={styles}
                >
                    <div className="flex">
                        <div
                            className="w-[28px] h-[28px] bg-[#E9E9E9] rounded-[10px] mr-[5px] text-[12px] overflow-hidden shrink-0 ">
                            {props.icon}
                        </div>
                        <div>
                            <div className="font-mono font-bold">{props.title}</div>
                            <div className="font-main">{props.description}</div>
                        </div>
                    </div>
                    <div
                        className="shrink-0"
                        onClick={props.onClose}
                    >
                        <CloseNotify/>
                    </div>
                </div>
            )}
        </>
    )
}

export default Notify