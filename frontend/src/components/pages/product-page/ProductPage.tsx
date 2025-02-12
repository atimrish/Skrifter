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
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import RatingModal from "@components/common/rating-modal/RatingModal.tsx";
import InfoModal from "@components/common/info-modal/InfoModal.tsx";
import FavoriteModal from "@components/common/favorite-modal/FavoriteModal.tsx";

const ProductPage = () => {

    const navigate = useNavigate();
    const {id} = useParams();

    const [product] = useProduct(+id)
    const [ratingModal, setRatingModal] = useState<boolean>(false)
    const [favoriteModal, setFavoriteModal] = useState<boolean>(false)
    const [infoModal, setInfoModal] = useState<boolean>(false)

    if (!product) {
        return 404;
    }

    const rating = {
        count: product.ratings.length,
        value: product.ratings.reduce((acc, cur) => acc + cur.value, 0) / product.ratings.length,
    }

    const download = () => {
        window.open('/storage/' + product.ext.source, "_blank");
    }

    const readable = [1,2,3].includes(product.product_type_id)

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
                        className="font-mono text-center text-[16px] text-dark-gray my-[10px] text-ellipsis overflow-x-hidden"
                    >
                        {product.authors.map(i => (
                            <span
                                onClick={() => navigate(`/author/${i.ID}`)}
                                className="cursor-pointer"
                            >
                                {i.surname} {i.name} {i.patronymic}
                            </span>
                            )
                        )}
                    </div>

                    <div className="my-[20px]">
                        {
                            readable ?
                                (
                                    <UiButton
                                        onClick={() => {
                                            navigate(`/product/${id}/read`)
                                        }}
                                        className={" bg-light-gray  hover:bg-black hover:text-white transition-all duration-300 "}
                                    >Читать</UiButton>
                                ) :
                                (
                                    <UiButton
                                        onClick={() => {
                                            navigate(`/product/${id}/read`)
                                        }}
                                        className={" bg-light-gray  hover:bg-black hover:text-white transition-all duration-300 "}
                                    >Слушать</UiButton>
                                )
                        }
                    </div>

                    <div className="my-[20px]">
                        <div className="flex justify-between items-center ">
                            {
                                readable && (
                                    <div
                                        style={{
                                            width: readable ? "47%" : "100%"
                                        }}
                                    >
                                        <UiButton className={
                                            " w-[100%] bg-light-gray  hover:bg-black hover:text-white transition-all duration-300 "
                                        }>Главы</UiButton>
                                    </div>
                                )
                            }
                            <div
                                style={{
                                    width: readable ? "47%" : "100%",
                                }}
                            >
                                <UiButton
                                    className={" w-[100%] bg-light-gray hover:bg-black hover:text-white transition-all duration-300 "}
                                    onClick={() => setInfoModal(true)}
                                >Инфо</UiButton>
                            </div>
                        </div>
                    </div>

                    <div className="my-[20px]">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col items-center w-[26%]">
                                <UiButton
                                    className={" w-[54px] h-[54px] rounded-full relative bg-light-gray "}
                                    onClick={() => setFavoriteModal(true)}
                                >
                                    <div className="absolute w-[26px] h-[26px] top-[14px] left-[14px] ">
                                        <Favorite/>
                                    </div>
                                </UiButton>
                                <div className="text-[14px] font-mono text-center my-[10px]">Избранное</div>
                            </div>
                            <div
                                className="flex flex-col items-center w-[26%]"
                                onClick={download}
                            >
                                <UiButton
                                    className={" w-[54px] h-[54px] rounded-full relative bg-light-gray "}
                                >
                                    <div className="absolute w-[28px] h-[28px] top-[13px] left-[13px] ">
                                        <Download/>
                                    </div>
                                </UiButton>
                                <div className="text-[14px] font-mono text-center my-[10px]">Загрузить</div>
                            </div>

                            <div className="flex flex-col items-center w-[26%]">
                                <UiButton
                                    className={" w-[54px] h-[54px] rounded-full relative bg-light-gray "}
                                    onClick={() => setRatingModal(true)}
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
                        value={isNaN(rating.value) ? 0 : rating.value}
                        count={rating.count}
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

                <RatingModal
                    setIsOpen={setRatingModal}
                    isOpen={ratingModal}
                    product_id={product.ID}
                />

                <FavoriteModal
                    setIsOpen={setFavoriteModal}
                    isOpen={favoriteModal}
                    product_id={product.ID}
                />

                <InfoModal
                    setIsOpen={setInfoModal}
                    isOpen={infoModal}
                    product={product}
                />

            </MainLayout>
        </>
    )
}

export default ProductPage;