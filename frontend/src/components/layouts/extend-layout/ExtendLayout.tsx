import {Children} from "react";
import GoBack from "@components/icons/go-back/GoBack.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";

const ExtendLayout = (props: ExtendLayoutProps) => {
    return (
        <>
            <div>
                <Wrapper>
                    <div className="flex items-center justify-between py-[10px]">
                        <div className="w-[46px]" onClick={props.backAction}>
                            <GoBack/>
                        </div>
                        <div className="font-mono text-[20px]">{props.title}</div>
                        <div className="w-[46px]"></div>
                    </div>
                </Wrapper>
                <main>
                    {Children.map(props.children, child => child)}
                </main>
            </div>
        </>
    )
}

export default ExtendLayout