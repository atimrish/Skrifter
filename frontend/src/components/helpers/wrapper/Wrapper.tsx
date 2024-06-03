import {Children, ReactNode} from "react";

export default function Wrapper({children} : {children?: ReactNode}) {
    return (
        <>
            <div className="w-[328px] mx-auto my-[10px] xl:w-[90%] lg:w-[95%] ">
                {Children.map(children, child => child)}
            </div>
        </>
    )
}