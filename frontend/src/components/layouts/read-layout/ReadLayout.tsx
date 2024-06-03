import GoBack from "@components/icons/go-back/GoBack.tsx";
import {Children, ReactNode} from "react";
import List from "@components/icons/list/List.tsx";
import Settings from "@components/icons/settings/Settings.tsx";
import Mark from "@components/icons/mark/Mark.tsx";

const ReadLayout = (props: ReadLayoutProps) => {
    return (
        <>
            <div className="font-mono">
                <div className="w-[100%] h-[64px] bg-light-gray flex items-center justify-between px-[10px] sticky top-0 left-0">
                    <div
                        className="w-[37px] h-[23px]"
                        onClick={props?.backAction}
                    >
                        <GoBack/>
                    </div>
                    <div>{props.title}</div>
                    <div className="font-bold">...</div>
                </div>
            </div>

            <div
                style={{
                    height: "auto",
                }}
            >
                {Children.map(props.children, (child: ReactNode) => child)}
            </div>

            <div className="h-[104px] w-[100%] bg-light-gray bottom-0 left-0">
                <div className="text-center py-[10px]">{props.currentPage ?? 7}/{props.countPages ?? 100}</div>
                <div className="flex items-center justify-between px-[10px] py-[5px]">
                    <div className="w-[40px] h-[40px]">
                        <List/>
                    </div>
                    <div className="w-[40px] h-[40px]">
                        <Settings/>
                    </div>
                    <div className="w-[27px] h-[36px]">
                        <Mark/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReadLayout