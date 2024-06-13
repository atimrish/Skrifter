import Notify from "@components/ui/notify/Notify.tsx";

const ErrorNotify = (props: NotifyProps) => {
    const icon = (
        <div className="w-[100%] h-[100%] relative bg-[#FF00001A]">
            <div
                className="w-[16px] h-[16px] absolute"
                style={{
                    left: 'calc(50% - 7px)',
                    top: 'calc(50% - 7px)',
                }}
            >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.61816 3.45096L10.5201 10.6872" stroke="#FF0000" stroke-width="2"
                          stroke-linecap="round"/>
                    <path d="M3.45117 10.5201L10.6874 3.61814" stroke="#FF0000" stroke-width="2"
                          stroke-linecap="round"/>
                </svg>

            </div>
        </div>
    )

    return (
        <>
            <Notify
                {...props}
                icon={icon}
            />
        </>
    )
}

export default ErrorNotify;