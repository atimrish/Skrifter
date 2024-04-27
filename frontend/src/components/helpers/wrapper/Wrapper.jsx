import {Children} from "react";

export default function Wrapper({children}) {
    return (
        <>
            <div className="w-[328px] mx-auto my-[10px]">
                {Children.map(children, child => child)}
            </div>
        </>
    )
}