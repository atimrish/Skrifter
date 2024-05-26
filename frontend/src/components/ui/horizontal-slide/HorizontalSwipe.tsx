import {Children} from "react";

const HorizontalSwipe = (props: HorizontalSwipeProps) => {
    return (
        <>
            <div
                className="overflow-x-scroll"
                style={{
                    scrollbarWidth: 'none'
                }}
            >
                <div className="flex">
                    {Children.map(props.children, child => child)}
                </div>
            </div>
        </>
    )
}

export default HorizontalSwipe;