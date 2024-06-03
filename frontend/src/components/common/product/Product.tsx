import Image from "@components/ui/image/Image.tsx";
import UiButton from "@components/ui/button/UiButton.tsx";
import Rating from "@components/icons/rating/Rating.tsx";

const Product = (props: ProductProps) => {
    return (
        <>
            <div className="flex font-mono shadow">
                <div className="w-[120px] h-[156px] bg-light-gray rounded-[10px] mr-[15px] overflow-hidden">
                    <Image src={props.cover_photo ?? ''}/>
                </div>
                <div className="flex flex-col justify-between">
                    <div>
                        <div>{props.title}</div>
                        <div className="text-gray">{props.authors}</div>

                        <div className="flex items-center my-[10px]">
                            <div className="w-[29px] h-[29px] mr-[5px]">
                                <Rating/>
                            </div>
                            <div>
                                {props.rating}
                            </div>
                        </div>
                    </div>
                    <UiButton className={' w-[181px] bg-yellow text-black !text-[14px] py-[5px] '}>В избранное</UiButton>
                </div>
            </div>
        </>
    )
}

export default Product;