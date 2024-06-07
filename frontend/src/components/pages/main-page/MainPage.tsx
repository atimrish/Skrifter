import MainLayout from "@components/layouts/MainLayout.tsx";
import Image from "@components/ui/image/Image.tsx";
import Wrapper from "@components/helpers/wrapper/Wrapper.tsx";
import Heading from "@components/ui/heading/Heading.tsx";
import Product from "@components/common/product/Product.tsx";
import HorizontalSwipe from "@components/ui/horizontal-slide/HorizontalSwipe.tsx";
import useProducts from "../../../hooks/useProducts.ts";
import {useNavigate} from "react-router-dom";
import Rating from "@components/icons/rating/Rating.tsx";
import Logo from "@components/icons/logo/Logo.tsx";

export default function MainPage() {

    const [products] = useProducts()

    const popularProducts = products.sort((a ,b) => {
        return a.ratings.length > b.ratings.length ? -1 : 1
    })

    const mostRatingProducts = products.sort((a, b) => {
        const f = a.ratings.reduce((acc, cur) => acc + cur.value, 0) / a.ratings.length
        const s = b.ratings.reduce((acc, cur) => acc + cur.value, 0) / a.ratings.length

        return f > s ? -1 : 1
    }).slice(0,2)

    const navigate = useNavigate();

    return (
        <>
            <MainLayout>
                <section>
                    <div
                        className="w-[100%] h-[588px] relative"
                    >
                        <div className="absolute top-0 left-0 w-[100%] h-[100%] -z-10">
                            <Image src={'./src/assets/images/76087be57431639675763d26656c70a0.svg'}/>
                        </div>
                        <Wrapper>
                            <div className="w-[100%] h-[100%] flex items-center justify-between pt-[80px]">
                                <div>
                                    <div className="font-mono text-[56px] mb-[20px]">Лучшие новинки<br/>года</div>
                                    <div
                                        className="w-[170px] h-[50px] bg-black text-white font-mono leading-[50px] text-center"
                                    >Подробнее</div>
                                </div>
                                <div className="flex items-center">

                                    <div className="w-[202px] bg-light-gray h-[263px] rounded-[10px] overflow-hidden shadow-2xl mx-[10px]">
                                        <Image src={'./src/assets/images/aaa.webp'}/>
                                    </div>

                                    <div className="w-[245px] bg-light-gray h-[319px] rounded-[10px] overflow-hidden shadow-2xl mx-[10px]">
                                        <Image src={'./src/assets/images/first.jpg'}/>
                                    </div>

                                    <div className="w-[202px] bg-light-gray h-[263px] rounded-[10px] overflow-hidden shadow-2xl mx-[10px]">
                                        <Image src={'./src/assets/images/sec.jpg'}/>
                                    </div>

                                </div>
                            </div>
                        </Wrapper>
                    </div>
                </section>
                <section className="my-[40px]">
                    <Wrapper>
                        <div className={"flex justify-between items-center my-[40px]"}>
                            <Heading number={2} className={'font-mono text-[30px]'} text={'Популярное'}/>
                            <div>{'Смотреть все'} &nbsp; {'>>'}</div>
                        </div>
                        <HorizontalSwipe>
                            {
                                popularProducts.map(i => {
                                    const rating = i.ratings.reduce((acc, cur) => acc + cur.value, 0) / i.ratings.length
                                    return (
                                        <div
                                            className="mr-[20px]" key={i.ID}
                                            onClick={() => navigate(`/product/${i.ID}`)}
                                        >
                                            <Product
                                                cover_photo={'/storage/product/cover_photos/' + i.cover_photo}
                                                title={i.title}
                                                authors={i.authors.map(j => `${j.surname} ${j.name} ${j.patronymic}`)}
                                                rating={isNaN(rating) ? 0 : rating}
                                            />
                                        </div>
                                    )
                                    }
                                )
                            }
                        </HorizontalSwipe>
                    </Wrapper>
                </section>

                <section className="bg-[#EBD1AE] py-[50px]">
                    <Wrapper>
                        <div className="flex justify-between items-center">
                        <Heading number={2} className={'text-[36px] font-mono font-bold'} text={'Вам понравится'}/>
                            <div>Больше &nbsp; {'>>'}</div>
                        </div>
                        <div className="bg-white my-[20px] p-[40px] font-mono flex justify-between">
                            {mostRatingProducts.map(i => {

                               const rating = i.ratings.reduce((acc, cur) => acc + cur.value, 0) / i.ratings.length

                               return (
                                   <div
                                       className="flex"
                                       onClick={() => navigate(`/product/${i.ID}`)}
                                   >
                                       <div className="w-[200px] h-[327px] bg-light-gray mr-[20px]">
                                           <Image src={'/storage/product/cover_photos/' + i.cover_photo}/>
                                       </div>
                                       <div>
                                           <div className="text-[20px]">{i.title}</div>
                                           <div className="flex items-center">
                                               <div className="w-[50px] h-[50px] mr-[10px]">
                                                   <Rating/>
                                               </div>
                                               <span className="text-[24px]">
                                                   {isNaN(rating) ? 0 : rating}
                                               </span>
                                           </div>
                                           <div>{i.authors.map(j => `${j.surname} ${j.name} ${j.patronymic}`).join(', ')}</div>
                                       </div>
                                   </div>
                               )
                            })}
                        </div>
                    </Wrapper>
                </section>

                <footer>
                    <div className="bg-light-gray">
                        <Wrapper>
                            <div className="flex justify-between items-center">
                                <div>
                                    <Logo/>
                                </div>
                                <div>2024</div>
                            </div>
                        </Wrapper>
                    </div>
                </footer>
            </MainLayout>
        </>
    )
}