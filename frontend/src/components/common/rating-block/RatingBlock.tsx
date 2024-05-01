import Rating from "@components/icons/rating/Rating.tsx";

const RatingBlock = (props: RatingBlockProps) => {
    return (
        <>
            <div className="flex items-start justify-around font-mono text-[24px] my-[30px]">
                <div className="">
                    <div>{props.value}</div>
                    <div className="w-[35px] h-[35px] mx-auto mt-[3px] ">
                        <Rating/>
                    </div>
                </div>
                <div className="text-center">
                    <div>{props.count}</div>
                    <div className="text-[14px] mt-[10px]">кол-во оценок</div>
                </div>
            </div>
        </>
    )
}

export default RatingBlock