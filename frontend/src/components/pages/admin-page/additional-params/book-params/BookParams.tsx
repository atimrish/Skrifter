import ActiveTextInput from "@components/ui/text-input/ActiveTextInput.tsx";
import ActiveFileInput from "@components/ui/file-input/ActiveFileInput.tsx";

const BookParams = (props: AdminAdditionalParams) => {
    return (
        <>
            <div className=" flex flex-wrap items-center justify-between ">
                <div className={" w-[464px] "}>
                    <ActiveTextInput
                        placeholder={'Примерное время чтения'}
                        value={props.formState.read_time ?? ''}
                        onChange={(e) => props.setFormState(
                            {
                                ...props.formState,
                                read_time: e.target.value
                            })}
                    />
                </div>
                <div className={" w-[464px] "}>
                    <ActiveFileInput
                        value={''}
                        onChange={(e) => props.setFormState(
                            {
                                ...props.formState,
                                book_file: e.target.files[0]
                            }
                        )
                    }
                        id={'book_file'}
                        accept={'.pdf'}
                    />
                </div>
            </div>
        </>
    )
}

export default BookParams