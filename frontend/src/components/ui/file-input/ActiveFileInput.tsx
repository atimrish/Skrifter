import FileInput from "@components/ui/file-input/FileInput.tsx";
import Plus from "@components/icons/plus/Plus.tsx";

const ActiveFileInput = (props: FileInputProps) => {
    return (
        <>
            <div>
                <label htmlFor={props.id} className="flex items-center">
                    <span>Прикрепите файл в формате PDF</span>
                    <FileInput
                        className={"hidden"}
                        onChange={props.onChange}
                        value={props.value}
                        id={props.id}
                        accept={props.accept}
                    />
                    <div className="rounded-[10px] w-[40px] h-[40px] bg-light-gray ml-[10px]">
                        <div
                            className="w-[26px] h-[26px]"
                            style={{
                                transform: 'translateX(7px) translateY(7px)',
                            }}
                        >
                            <Plus/>
                        </div>
                    </div>
                </label>
            </div>
        </>
    )
}

export default ActiveFileInput;