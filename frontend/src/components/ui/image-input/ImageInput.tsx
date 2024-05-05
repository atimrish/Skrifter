import Image from "@components/ui/image/Image.tsx";
import FileInput from "@components/ui/file-input/FileInput.tsx";
import {useState} from "react";

const ImageInput = (props: ImageInputProps) => {

    const [photo, setPhoto] = useState<ArrayBuffer|string|null>(null);

    const fileReader = new FileReader();

    const onChange = (e) => {
        fileReader.readAsDataURL(e.target.files[0]);
        fileReader.onloadend = () => {
            setPhoto(fileReader.result)
        }
        props.setValue(e.target.files[0]);
    }

    return (
        <>
            <div
                className={props.className + " relative "}>
                <Image src={photo}/>
                <div className="w-[100%] h-[100%] absolute top-0 left-0 ">
                    <label
                        htmlFor="product-photo"
                        className="w-[100%] h-[100%] block text-center font-mono "
                    >
                        <span
                            className="absolute leading-[16px] w-[100%] left-0"
                            style={{
                                top: 'calc(50% - 8px)',
                            }}
                        >
                            { props.placeholder ?? 'Добавить фото' }
                        </span>
                    </label>
                    <FileInput
                        className={" hidden "}
                        onChange={onChange}
                        value={''}
                        id={'product-photo'}
                    />
                </div>
            </div>
        </>
    )
}

export default ImageInput;