import ActiveFileInput from "@components/ui/file-input/ActiveFileInput.tsx";

const PodcastParams = (props: AdminAdditionalParams) => {
    return (
        <>
            <div>
                <ActiveFileInput
                    onChange={(e) => {
                        props.setFormState({
                            ...props.formState,
                            audio_file: e.target.files[0]
                        })
                        console.log(props.formState)
                    }
                    }
                    value={''}
                    id={'audio_file'}
                    label={'Прикрепите файл в формате MP3'}
                    accept={'.mp3'}
                />
            </div>
        </>
    )
}

export default PodcastParams