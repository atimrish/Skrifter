import MainLayout from "@components/layouts/MainLayout.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import Heading from "@components/ui/heading/Heading.tsx";
import {useEffect, useState} from "react";
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
import FormButton from "@components/ui/button/FormButton.tsx";
import MakeAuthRequest from "@components/ui/form/libs/MakeAuthRequest.ts";
import ImageInput from "@components/ui/image-input/ImageInput.tsx";
import useAuthors from "../../../hooks/useAuthors.ts";
import SuccessNotify from "@components/ui/notify/SuccessNotify.tsx";
import BookParams from "@pages/admin-page/additional-params/book-params/BookParams.tsx";
import ComicsParams from "@pages/admin-page/additional-params/comics-params/ComicsParams.tsx";
import MangaParams from "@pages/admin-page/additional-params/manga-params/MangaParams.tsx";
import AudiobookParams from "@pages/admin-page/additional-params/audiobook-params/AudiobookParams.tsx";
import PodcastParams from "@pages/admin-page/additional-params/podcast-params/PodcastParams.tsx";
import AdminLinks from "@pages/admin-page/helper/AdminLinks.tsx";

const AdminPage = () => {
    const [ageRating] = useAgeRating()
    const [productTypes] = useProductTypes()
    const [genres, setGenres] = useGenres()

    const [formState, setFormState] = useState({
        title: '',
        description: '',
        year_of_issue: '',
        age_rating_id: 0,
        product_type_id: 0,
        authors: [],
        genres: [],
        cover_photo: null,
    })

    const [selectedAgeRating, setSelectedAgeRating] = useState({
        value: 0,
        text: 'Выберите ...'
    })
    const [selectedProductType, setSelectedProductType] = useState({
        value: 0,
        text: 'Выберите ...'
    })

    const [notify, setNotify] = useState(false)
    const [authors, setAuthors] = useAuthors()

    const onSubmit = async () => {

        const data = {
            ...formState,
            age_rating_id: selectedAgeRating.value,
            product_type_id: selectedProductType.value,
            genres: genres.filter(item => item.selected).map(item => item.ID),
            authors: authors.filter(item => item.selected).map(item => item.ID),
        }

        const formData = new FormData()
        for (const key in data) {
            formData.append(key, data[key])
        }

        await MakeAuthRequest({
            action: "/product",
            method: "POST",
            body: formData,
        })

        setNotify(true)

        setTimeout(() => {
            setNotify(false)
        }, 3000)

    }

    const [extParams, setExtParams] = useState<any>(null)

    useEffect(() => {
        switch (selectedProductType.value) {
            case 1:
                setExtParams(<BookParams formState={formState} setFormState={setFormState}/>)
                break
            case 2:
                setExtParams(<ComicsParams/>)
                break
            case 3:
                setExtParams(<MangaParams/>)
                break
            case 4:
                setExtParams(<AudiobookParams formState={formState} setFormState={setFormState}/>)
                break
            case 5:
                setExtParams(<PodcastParams/>)
                break
            default:
                setExtParams('доп параметры не выбраны')
                break
        }
    }, [formState, selectedProductType]);

    return (
        <>
            <MainLayout>
                <Wrapper>
                    <AdminLinks/>
                    <Heading
                        number={2}
                        className={" text-[24px] font-mono my-[40px]"}
                        text={'Cоздание продукта'}
                    />
                    <div className="flex flex-wrap">
                        <ImageInput
                            className={"w-[326px] h-[424px] bg-gray rounded-[10px] border-gray overflow-hidden relative mr-[20px] mb-[20px] shrink-0 "}
                            setValue={(file) => {
                                setFormState({
                                    ...formState,
                                    cover_photo: file,
                                })
                            }}
                        />
                        <div>
                            <Form
                                onSubmit={onSubmit}
                                action={'/product'}
                                method={'POST'}
                            >
                                <div className="flex flex-wrap ">
                                    <div>
                                        <div className="mt-[-32px]">
                                            <ActiveTextInput
                                                placeholder={'Название'}
                                                value={formState.title}
                                                onChange={(e) => setFormState({
                                                    ...formState,
                                                    title: e.target.value,
                                                })}
                                            />
                                        </div>
                                        <ActiveNumberInput
                                            placeholder={'Год выпуска'}
                                            value={formState.year_of_issue}
                                            onChange={(e) => setFormState({
                                                ...formState,
                                                year_of_issue: e.target.value
                                            })}
                                        />
                                        <ActiveTextarea
                                            placeholder={'Описание'}
                                            value={formState.description}
                                            onChange={(e) => setFormState({
                                                ...formState,
                                                description: e.target.value
                                            })}
                                        />
                                    </div>
                                    <div className="flex flex-wrap">
                                        <div className="w-[328px] xl:ml-[30px]">
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

                                        <div className="w-[328px] xl:ml-[30px]">
                                            <Heading
                                                number={2}
                                                className={" text-[24px] font-mono"}
                                                text={'Авторы'}
                                            />

                                            <ActiveDataSelect
                                                items={authors}
                                                setItems={setAuthors}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="xl:ml-[20px] w-[328px]">
                                    <Heading
                                        number={3}
                                        className={"font-mono mb-[10px] "}
                                        text={'Возрастной рейтинг'}
                                    />
                                    <ActiveSelect
                                        selected={selectedAgeRating}
                                        setSelected={setSelectedAgeRating}
                                    >
                                        {ageRating.map((item) => (
                                            <Option value={item.ID} key={item.ID}>{item.Name}</Option>
                                        ))}
                                    </ActiveSelect>

                                    <Heading
                                        number={3}
                                        className={"font-mono my-[10px] "}
                                        text={'Тип продукта'}
                                    />
                                    <ActiveSelect
                                        selected={selectedProductType}
                                        setSelected={setSelectedProductType}
                                    >
                                        {productTypes.map((item) => (
                                            <Option value={item.ID} key={item.ID}>{item.Name}</Option>
                                        ))}
                                    </ActiveSelect>
                                </div>

                                <div>
                                    <Heading
                                        number={2}
                                        className={" text-[24px] font-mono my-[40px]"}
                                        text={'Доп параметры'}
                                    />
                                    {extParams}
                                </div>
                                <FormButton>Создать</FormButton>
                            </Form>
                        </div>
                    </div>
                    {notify && (<SuccessNotify title={'Успешно'} description={'Продукт создан'}/>)}
                </Wrapper>
            </MainLayout>
        </>
    )
}

export default AdminPage;