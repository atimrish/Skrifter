import Image from "@components/ui/image/Image.tsx";
import UiButton from "@components/ui/button/UiButton.tsx";
import Rating from "@components/icons/rating/Rating.tsx";

const Product = (props: ProductProps) => {
    return (
        <>
            <div className="flex font-mono">
                <div className="w-[120px] h-[156px] bg-light-gray rounded-[10px] mr-[15px] overflow-hidden shrink-0">
                    <Image src={props.cover_photo ?? ''}/>
                </div>
                <div className="flex flex-col justify-between">
                    <div>
                        <div>{props.title}</div>
                        <div className="text-gray overflow-hidden text-ellipsis max-h-[50px]">{props.authors.join(', ')}</div>

                        <div className="flex items-center my-[10px]">
                            <div className="w-[29px] h-[29px] mr-[5px]">
                                <Rating/>
                            </div>
                            <div>
                                {props.rating}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product;