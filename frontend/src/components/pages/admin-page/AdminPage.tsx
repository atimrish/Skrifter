import MainLayout from "@components/layouts/MainLayout.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import Heading from "@components/ui/heading/Heading.tsx";
import Image from "@components/ui/image/Image.tsx";
import FileInput from "@components/ui/file-input/FileInput.tsx";
import {useState} from "react";
import Form from "@components/ui/form/Form.tsx";
import ActiveTextInput from "@components/ui/text-input/ActiveTextInput.tsx";
import ActiveNumberInput from "@components/ui/number-Input/ActiveNumberInput.tsx";
import ActiveTextarea from "@components/ui/textarea/ActiveTextarea.tsx";
import ActiveSelect from "@components/ui/select/ActiveSelect.tsx";
import Option from "@components/ui/option/Option.tsx";
import useAgeRating from "../../../hooks/useAgeRating.ts";
import useProductTypes from "../../../hooks/useProductTypes.ts";
import ActiveDataSelect from "@components/ui/data-select/ActiveDataSelect.tsx";
import useGenres from "../../../hooks/useGenres.ts";

const AdminPage = () => {

    const [photo, setPhoto] = useState<any>(null);

    const onPhotoSelect = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            setPhoto(reader.result)
        }
    }

    const [ageRating] = useAgeRating()
    const [productTypes] = useProductTypes()
    const [genres, setGenres] = useGenres()

    const [formState, setFormState] = useState({
        title: '',
        description: '',
        year_of_issue: '',
        age_rating_id: null,
        product_type_id: null,
        authors: [],
        genres: [],
        cover_photo: null,
    })

    return (
        <>
            <MainLayout>
                <Wrapper>
                    <Heading
                        number={2}
                        className={" text-[24px] font-mono my-[40px]"}
                        text={'Cоздание продукта'}
                    />

                    <div className="flex">
                        <div
                            className="w-[326px] h-[424px] bg-gray rounded-[10px] border-gray overflow-hidden relative mr-[20px] ">
                            <Image src={photo}/>

                            <div className="w-[100%] h-[100%] absolute top-0 left-0 ">
                                <label
                                    htmlFor="product-photo"
                                    className="w-[100%] h-[100%] block leading-[424px] text-center font-mono "
                                >Добавить фото</label>
                                <FileInput
                                    className={" hidden "}
                                    onChange={onPhotoSelect}
                                    value={''}
                                    id={'product-photo'}
                                />
                            </div>
                        </div>

                        <div>
                            <Form
                                onSubmit={async () => {
                                }}
                                action={''}
                                method={'POST'}
                            >

                                <div className="flex">

                                    <div>
                                        <div className="mt-[-32px]">
                                            <ActiveTextInput
                                                placeholder={'Название'}
                                            />
                                        </div>
                                        <ActiveNumberInput
                                            placeholder={'Год выпуска'}
                                        />
                                        <ActiveTextarea
                                            placeholder={'Описание'}
                                        />
                                    </div>

                                    <div className="ml-[20px]">
                                        <Heading
                                            number={3}
                                            className={"font-mono mb-[10px] "}
                                            text={'Возрастной рейтинг'}
                                        />
                                        <ActiveSelect>
                                            {ageRating.map((item) => (
                                                <Option value={item.ID} key={item.ID}>{item.Name}</Option>
                                            ))}
                                        </ActiveSelect>

                                        <Heading
                                            number={3}
                                            className={"font-mono my-[10px] "}
                                            text={'Тип продукта'}
                                        />
                                        <ActiveSelect>
                                            {productTypes.map((item) => (
                                                <Option value={item.ID} key={item.ID}>{item.Name}</Option>
                                            ))}
                                        </ActiveSelect>

                                    </div>


                                </div>

                            </Form>



                        </div>
                        <div className="ml-[20px]">
                            <Heading
                                number={2}
                                className={" text-[24px] font-mono"}
                                text={'Жанры'}
                            />

                            <ActiveDataSelect
                               items={genres}
                               setItems={setGenres}
                            />

                        </div>



                    </div>

                    <div>
                        <Heading
                            number={2}
                            className={" text-[24px] font-mono my-[40px]"}
                            text={'Доп параметры'}
                        />
                    </div>

                </Wrapper>
            </MainLayout>
        </>
    )
}

export default AdminPage;