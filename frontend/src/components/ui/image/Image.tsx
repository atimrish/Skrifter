const Image = (props: ImageProps) => {
    return (
        <>
            <img
                src={props.src}
                alt=""
                className="w-[100%] h-[100%] object-center object-cover"
                style={{
                    display: (props.src) ? 'block' : 'none',
                }}
            />
        </>
    )
}

export default Image