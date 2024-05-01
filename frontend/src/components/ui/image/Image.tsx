const Image = (props: ImageProps) => {
    return (
        <>
            <img
                src={props.src}
                alt=""
                className="w-[100%] h-[100%] object-center object-cover"
            />
        </>
    )
}

export default Image