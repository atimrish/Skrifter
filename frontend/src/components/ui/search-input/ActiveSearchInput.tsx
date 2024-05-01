import TextInput from "@components/ui/text-input/TextInput.tsx";
import Search from "@components/icons/search/Search.tsx";

const ActiveSearchInput = (props: any) => {
    return (
        <>
            <div className="h-[52px] w-[328px] border border-light-gray rounded-[10px] flex justify-between items-center xl:w-[556px]">
                <TextInput
                    value={props.value}
                    onChange={props.onChange}
                    onFocusout={props.onFocusout}
                    onFocus={props.onFocus}
                    type={'text'}
                    className={props.className + " w-[276px] h-[100%] font-mono text-[20px] pl-[10px] shrink-0 rounded-l-[10px] outline-none "}
                />
                <div className="w-[52px] h-[52px] bg-gray shrink-0 rounded-r-[10px] relative cursor-pointer ">
                    <div className="absolute top-[6px] left-[6px]">
                        <Search/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ActiveSearchInput;