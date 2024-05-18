import Notify from "@components/ui/notify/Notify.tsx";

const SuccessNotify = (props: NotifyProps) => {
    const icon = (
        <div className="w-[100%] h-[100%] relative bg-[#3CAE4E1A]">
            <div
                className="w-[16px] h-[16px] absolute"
                style={{
                    left: 'calc(50% - 8px)',
                    top: 'calc(50% - 8px)',
                }}
            >
                <svg width="16" height="16" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 10.6167L10.2059 17.4841L20.4004 1.91739" stroke="#3CAE4E" stroke-width="3"
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

export default SuccessNotify;