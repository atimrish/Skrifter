import MainLayout from "@components/layouts/MainLayout.tsx";
import Image from "@components/ui/image/Image.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import UiButton from "@components/ui/button/UiButton.tsx";
import Favorite from "@components/icons/favorite/Favorite.tsx";
import Download from "@components/icons/download/Download.tsx";
import Rating from "@components/icons/rating/Rating.tsx";
import Heading from "@components/ui/heading/Heading.tsx";
import RatingBlock from "@components/common/rating-block/RatingBlock.tsx";
import CommentList from "@components/common/comment-list/CommentList.tsx";
import DiscussionList from "@components/common/discussion-list/DiscussionList.tsx";
import {useParams} from "react-router";
import useProduct from "../../../hooks/useProduct.ts";

const ProductPage = () => {

    const {id} = useParams();

    const [product] = useProduct(+id)

    if (!product) {
        return 404;
    }

    return (
        <>
            <MainLayout>
                <div className="w-[232px] h-[312px] mx-auto bg-gray rounded-[10px] overflow-hidden my-[30px]">
                    <Image src={'/storage/product/cover_photos/' + product.cover_photo}/>
                </div>

                <Wrapper>
                    <div className="font-mono text-center text-[24px]">{product.title}</div>

                    <div className="font-mono text-center text-[14px] text-gray my-[10px]">{product.year_of_issue} г.</div>

                    <div
                        className="font-mono text-center text-[16px] text-dark-gray my-[10px]"
                    >
                        {product.authors.map(i =>  <span>{`${i.surname} ${i.name} ${i.patronymic}`}</span>)}
                    </div>

                    <div className="my-[20px]">
                        <UiButton>Читать</UiButton>
                    </div>

                    <div className="my-[20px]">
                        <div className="flex justify-between items-center">
                            <UiButton className={" w-[47%] "}>Главы</UiButton>
                            <UiButton className={" w-[47%] "}>Инфо</UiButton>
                        </div>
                    </div>

                    <div className="my-[20px]">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col items-center w-[26%]">
                                <UiButton
                                    className={" w-[54px] h-[54px] rounded-full relative "}
                                >
                                    <div className="absolute w-[26px] h-[26px] top-[14px] left-[14px] ">
                                        <Favorite/>
                                    </div>
                                </UiButton>
                                <div className="text-[14px] font-mono text-center my-[10px]">Избранное</div>
                            </div>
                            <div className="flex flex-col items-center w-[26%]">
                                <UiButton
                                    className={" w-[54px] h-[54px] rounded-full relative "}
                                >
                                    <div className="absolute w-[28px] h-[28px] top-[13px] left-[13px] ">
                                        <Download/>
                                    </div>
                                </UiButton>
                                <div className="text-[14px] font-mono text-center my-[10px]">Загрузить</div>
                            </div>

                            <div className="flex flex-col items-center w-[26%]">
                                <UiButton
                                    className={" w-[54px] h-[54px] rounded-full relative "}
                                >
                                    <div className="absolute w-[28px] h-[28px] top-[13px] left-[13px] ">
                                        <Rating/>
                                    </div>
                                </UiButton>
                                <div className="text-[14px] font-mono text-center my-[10px]">Оценить</div>
                            </div>
                        </div>
                    </div>

                </Wrapper>
                <Wrapper>
                    <Heading
                        number={2}
                        className={"text-center font-mono text-[24px] my-[30px] "}
                        text={"Описание"}
                    />
                    <div className="font-main text-[16px]">{product.description}</div>
                    <Heading
                        number={2}
                        className={"text-center font-mono text-[24px] my-[30px] "}
                        text={"Рейтинг"}
                    />
                    <RatingBlock
                        value={9.48}
                        count={1233}
                    />
                    <Heading
                        number={2}
                        className={"text-center font-mono text-[24px] my-[30px] "}
                        text={"Комментарии"}
                    />
                    <CommentList
                        productId={+id}
                        maxCount={3}
                    />
                    <Heading
                        number={2}
                        className={"text-center font-mono text-[24px] my-[30px] "}
                        text={"Обсуждения"}
                    />
                    <DiscussionList
                        productId={+id}
                        maxCount={3}
                    />

                </Wrapper>

            </MainLayout>
        </>
    )
}

export default ProductPage;