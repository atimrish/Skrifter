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
import MainProduct from "@pages/main-page/helper/MainProduct.tsx";

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
                            <div className="w-[100%] h-[100%] flex items-center justify-between pt-[80px] flex-wrap">
                                <div>
                                    <div className="font-mono md:text-[56px] mb-[20px] text-[32px]">Лучшие новинки <br
                                        className="hidden md:block"
                                    />года</div>
                                    <div
                                        className="md:w-[170px] md:h-[50px]
                                        bg-black text-white font-mono
                                        md:leading-[50px] text-center
                                        w-[120px] h-[30px]
                                        leading-[30px]
                                        "
                                    >Подробнее</div>
                                </div>
                                <div className="flex items-center justify-between md:justify-normal mt-[80px] md:mt-[0]">
                                    <div
                                        className="xl:w-[202px] bg-light-gray xl:h-[263px] rounded-[10px]
                                        lg:w-[120px] lg:h-[156px] overflow-hidden shadow-2xl md:mx-[10px]
                                        md:w-[120px] md:h-[156px]
                                        w-[100px] h-[120px]
                                        shrink-0
                                        mx-0
                                        "
                                    >
                                        <Image src={'./src/assets/images/aaa.webp'}/>
                                    </div>

                                    <div
                                        className="xl:w-[245px] bg-light-gray xl:h-[319px] rounded-[10px]
                                        lg:w-[171px] lg:h-[223px] overflow-hidden shadow-2xl mx-[10px]
                                        md:w-[120px] md:h-[156px]
                                        w-[100px] h-[120px]
                                        shrink-0
                                        ">
                                        <Image src={'./src/assets/images/first.jpg'}/>
                                    </div>

                                    <div
                                        className="xl:w-[202px] bg-light-gray xl:h-[263px] rounded-[10px]
                                         lg:w-[120px] lg:h-[156px] overflow-hidden shadow-2xl md:mx-[10px]
                                         md:w-[120px] md:h-[156px]
                                         w-[100px] h-[120px]
                                        shrink-0
                                        mx-0
                                         "
                                    >
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
                            <Heading number={2} className={'font-mono md:text-[30px] text-[20px]'} text={'Популярное'}/>
                            <div className="font-mono">{'Смотреть все'}&nbsp;{'>>'}</div>
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
                        <Heading number={2} className={'md:text-[36px] text-[20px] font-mono font-bold'} text={'Вам понравится'}/>
                            <div className="font-mono">Больше&nbsp;{'>>'}</div>
                        </div>
                        <div className="bg-white my-[20px] md:p-[40px] p-[10px] font-mono flex justify-between flex-wrap">
                            {mostRatingProducts.map(i => {

                               const rating = i.ratings.reduce((acc, cur) => acc + cur.value, 0) / i.ratings.length

                               return (
                                   <div
                                       className="flex my-[10px]"
                                       onClick={() => navigate(`/product/${i.ID}`)}
                                   >
                                       <div className="w-[200px] h-[327px] bg-light-gray mr-[20px]">
                                           <Image src={'/storage/product/cover_photos/' + i.cover_photo}/>
                                       </div>
                                       <div>
                                           <div className="md:text-[20px] text-[16px]">{i.title}</div>
                                           <div className="flex items-center">
                                               <div className="w-[50px] h-[50px] mr-[10px]">
                                                   <Rating/>
                                               </div>
                                               <span className="text-[24px]">
                                                   {isNaN(rating) ? 0 : rating}
                                               </span>
                                           </div>
                                           <div className="font-mono text-[14px]">{i.authors.map(j => `${j.surname} ${j.name} ${j.patronymic}`).join(', ')}</div>
                                       </div>
                                   </div>
                               )
                            })}
                        </div>
                    </Wrapper>
                </section>

                <section>
                    <Wrapper>
                        <Heading
                            number={2}
                            className={' font-mono md:text-[30px] text-[20px] text-center my-[40px] '}
                            text={'Особые книги'}
                        />
                        <div className="grid grid-cols-4">
                            {products.map(i => (
                                <div
                                    onClick={() => navigate(`/product/${i.ID}`)}
                                >
                                    <MainProduct
                                        title={i.title}
                                        author={i.authors.map(j => `${j.surname} ${j.name} ${j.patronymic}`).join(', ')}
                                        photo={`/storage/product/cover_photos/${i.cover_photo}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </Wrapper>
                </section>

                <footer>
                    <div className="bg-light-gray">
                        <Wrapper>
                            <div className="flex justify-between items-center my-[-10px] py-[10px]">
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