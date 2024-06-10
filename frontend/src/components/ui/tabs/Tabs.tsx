
const Tabs = (props: TabsProps) => {

    // useEffect(() => {
    //     console.log(props.titles)
    //     props.titles?.forEach(i => {
    //         i.selected = i.id === selected
    //     })
    // }, [selected]);

    return (
        <>
            <div
                className="flex items-center w-[100%] overflow-x-scroll"
                style={{
                    scrollbarWidth: 'none'
                }}
            >
                {props.titles.map((i) => (
                    <div
                        className="font-mono text-[14px] text-nowrap pb-[5px] px-[14px] text-center border-b-[3px] border-transparent transition-all ease-in "
                        onClick={() => {
                            props.setSelected(i.id)
                        }}
                        style={{
                            borderBottomColor: i.selected ? 'black' : 'transparent'
                        }}
                        key={i.id}
                    >{i.title}</div>
                ))}
            </div>
        </>
    )
}

export default Tabs;