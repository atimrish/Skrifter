import Image from "@components/ui/image/Image.tsx";

const MainProduct = (props: {
    title: string
    author: string
    photo: string
}) => {
    return (
        <>
            <div className="w-[233px] h-[383px] p-[10px] font-mono">
                <div className="bg-light-gray w-[120px] h-[180px] mx-auto">
                    <Image src={props.photo}/>
                </div>
                <div className="my-[10px] text-center">{props.title}</div>
                <div className="text-center text-gray">{props.author}</div>
            </div>
        </>
    )
}

export default MainProduct;