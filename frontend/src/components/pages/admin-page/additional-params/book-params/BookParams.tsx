import ActiveTextInput from "@components/ui/text-input/ActiveTextInput.tsx";
import ActiveFileInput from "@components/ui/file-input/ActiveFileInput.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";

const BookParams = (props: AdminAdditionalParams) => {

    return (
        <>
            <Wrapper>
                <div className=" flex flex-wrap items-center justify-between ">
                    <div className={" w-[464px] "}>
                        <ActiveTextInput
                            placeholder={'Примерное время чтения'}
                            value={props.formState.read_time ?? ''}
                            onChange={(e) => {
                                props.setFormState(
                                    {
                                        ...props.formState,
                                        read_time: e.target.value
                                    }
                                )
                            }
                            }
                        />
                    </div>
                    <div className={" w-[464px] "}>
                        <ActiveFileInput
                            label={'Прикрепите файл в формате PDF'}
                            value={''}
                            onChange={(e) => {
                                const file = e.target.files[0]
                                const reader = new FileReader();
                                reader.readAsBinaryString(e.target.files[0])
                                reader.onloadend = () => {
                                    const count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
                                    props.setFormState(
                                        {
                                            ...props.formState,
                                            pages_count: count,
                                            book_file: file
                                        }
                                    )
                                }
                            }
                            }
                            id={'book_file'}
                            accept={'.pdf'}
                        />
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

export default BookParams